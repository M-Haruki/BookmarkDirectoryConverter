function addEventListeners() {
    document.getElementById("btn-export").addEventListener("click", exportData);
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

function createFileData(zip, array) {
    array.forEach((item) => {
        // name
        let name = item.title.replace(/[\\/:*?"<>|]/g, "_");
        if (name.length > 255) {
            name = name.substring(0, 255);
        }
        if (name === "") {
            name = "Untitled";
        }
        //
        if (item.type === "folder") {
            let folder = zip.folder(name);
            createFileData(folder, item.children);
        } else if (item.type === "bookmark") {
            let fileName = name + ".url";
            let fileContent = `[InternetShortcut]\nURL=${item.url}\n`;
            zip.file(fileName, fileContent);
        }
    });
}

async function exportData() {
    const bookmarks = await browser.bookmarks.getTree();
    const zip = new JSZip();
    createFileData(zip, bookmarks);
    zip.generateAsync({ type: "blob" }).then((content) => downloadFile(content, "bookmarks.zip", "application/zip"));
}

addEventListeners();
