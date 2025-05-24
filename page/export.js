function init() {
    document.getElementById("btn-export-url").addEventListener("click", () => exportData("url"));
    document.getElementById("btn-export-txt").addEventListener("click", () => exportData("txt"));
}

async function exportData(filetype) {
    const bookmarks = await browser.bookmarks.getTree();
    const zip = new JSZip();
    createFileData(filetype, zip, bookmarks);
    zip.generateAsync({ type: "blob" }).then((content) => downloadFile(content, "bookmarks.zip", "application/zip"));
}

function createFileData(filetype, zip, array) {
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
            createFileData(filetype, folder, item.children);
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
        }
    });
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
    console.log(`File ${filename} downloaded successfully.`);
}

init();
