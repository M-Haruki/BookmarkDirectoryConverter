function init() {
    document.getElementById("btn-export-url").addEventListener("click", () => exportBookmarks("url"));
    document.getElementById("btn-export-txt").addEventListener("click", () => exportBookmarks("txt"));
}

async function exportBookmarks(filetype) {
    const bookmarks = await browser.bookmarks.getTree();
    const zip = new JSZip();
    const count = createFileData(filetype, zip, bookmarks);

    // 確認ダイアログ
    if (!confirm(i18n("exportConfirm", { count: String(count), filetype: filetype }))) {
        return;
    }

    zip.generateAsync({ type: "blob" }).then((content) => downloadFile(content, "bookmarks.zip", "application/zip"));
}

function createFileData(filetype, zip, array) {
    let bookmarkCount = 0;
    array.forEach((item) => {
        // name
        let name = item.title.replace(/[\\/:*?"<>|]/g, "_");
        if (name.length > 124) {
            // ファイル名が長すぎると、zip解凍に失敗することがあるため、124文字(128-拡張子4文字)に制限する
            name = name.substring(0, 124);
        }
        if (name === "") {
            name = "Untitled";
        }
        //
        if (item.type === "folder") {
            let folder = zip.folder(name);
            bookmarkCount += createFileData(filetype, folder, item.children);
        } else if (item.type === "bookmark") {
            let fileName, fileContent;
            if (filetype === "txt") {
                fileName = name + ".txt";
                fileContent = `${item.title}\n${item.url}\n`;
            } else if (filetype === "url") {
                // Create a .url file for Windows
                // Format: [InternetShortcut]\nURL=<URL>
                fileName = name + ".url";
                fileContent = `[InternetShortcut]\nURL=${item.url}\n`;
            }
            zip.file(fileName, fileContent);
            bookmarkCount++;
        }
    });
    return bookmarkCount;
}

function downloadFile(content, filename, type) {
    let blob = new Blob([content], { type: type });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

init();
