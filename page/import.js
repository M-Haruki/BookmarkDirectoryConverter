const el_inputZip = document.getElementById("input-zip");
const el_inputDirectory = document.getElementById("input-directory");

function init() {
    document.getElementById("btn-import").addEventListener("click", () => importBookmarks());
    // ファイルかディレクトリの選択が変更されたときに、もう一方の入力をクリアする
    // これにより、両方の入力が同時に選択されることを防ぐ
    el_inputZip.addEventListener("change", (event) => {
        el_inputDirectory.value = "";
    });
    el_inputDirectory.addEventListener("change", (event) => {
        el_inputZip.value = "";
    });
}

async function importBookmarks() {
    let bookmarks = [];
    // bookmarks = [{
    //     path: "others/examples",
    //     name: "exampleSite",
    //     url: "https://example.com",
    // }];

    const input_zipfile = el_inputZip.files[0];
    const input_directory = el_inputDirectory.files[0];

    if (input_zipfile) {
        // zip file
        const zip = new JSZip();
        const files = await zip.loadAsync(input_zipfile);
        const promises = [];
        files.forEach((relativePath, file) => {
            if (!file.dir) {
                promises.push(
                    file.async("uint8array").then((uint8arr) => {
                        // テキストとしてデコード（UTF-8指定）
                        const decoder = new TextDecoder("utf-8");
                        const content = decoder.decode(uint8arr);
                        bookmarks.push(extractionBookmark(relativePath, content));
                    })
                );
            }
        });
        await Promise.all(promises);
    } else if (input_directory) {
        // directory
        const files = el_inputDirectory.files;
        const promises = [];
        for (const file of files) {
            promises.push(
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = function (event) {
                        const content = event.target.result;
                        const rawPaths = file.webkitRelativePath.split("/");
                        rawPaths.shift(); // ディレクトリ方式だと、一階層目のディレクトリ名が含まれるため、削除する
                        bookmarks.push(extractionBookmark(rawPaths.join("/"), content));
                        resolve();
                    };
                    reader.readAsText(file, "utf-8");
                })
            );
        }
        await Promise.all(promises);
    } else {
        alert(i18n("importErrorAlert"));
        return;
    }

    // 確認ダイアログ
    if (!confirm(i18n("importConfirm", { length: String(bookmarks.length) }))) {
        return;
    }

    // ブックマークのツリー構造を作成し、ブックマークを追加する
    let bookmarkTree = [];
    for (let i = 0; i < bookmarks.length; i++) {
        const bookmark = bookmarks[i];
        const paths = bookmark.path.split("/");

        let currentLevel = bookmarkTree;
        let parentId = bookmarkTree.id || null; // ブックマークのルートIDを取得、なければ"root"を使用

        for (let index = 0; index < paths.length; index++) {
            const path = paths[index];
            let existingFolder = currentLevel.find((item) => item.type === "folder" && item.title === path);
            if (!existingFolder) {
                const created = await browser.bookmarks.create({
                    title: path,
                    parentId: parentId,
                });
                existingFolder = { title: path, type: "folder", children: [], id: created.id };
                currentLevel.push(existingFolder);
            }
            currentLevel = existingFolder.children;
            parentId = existingFolder.id;

            // 最後の要素であれば、ブックマークを追加
            if (index === paths.length - 1) {
                await browser.bookmarks.create({
                    title: bookmark.name,
                    parentId: parentId,
                    url: bookmark.url,
                });
                currentLevel.push({ title: bookmark.name, type: "bookmark", url: bookmark.url });
            }
        }
    }

    // 完了メッセージ
    alert(i18n("importSuccessAlert", { length: String(bookmarks.length) }));
}

function extractionBookmark(rawPath, content) {
    const paths = rawPath.split("/");
    const name = paths.pop().replace(/\.txt$|\.url$/, ""); // popは配列の最後の要素を削除して、削除した値を返す
    const path = paths.join("/");
    const url = content.match(/URL=(.*)/)?.[1] || content.split("\n")[1]; // .urlファイルの場合はURL=の後ろの部分を取得、.txtファイルの場合は2行目を取得
    return {
        path: path,
        name: name,
        url: url,
    };
}

init();
