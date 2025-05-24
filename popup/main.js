function addEventListeners() {
    document.getElementById("btn-export").addEventListener("click", exportData);
}

function exportData() {
    // Function to export data
    console.log("Exporting data...");

    browser.bookmarks.getTree().then((bookmarks) => {
        console.log(JSON.stringify(bookmarks, null, 2));
    });
    var zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    let sub = zip.folder("sub");
    sub.file("Subfile.txt", "This is a subfile\n");
    sub.file("Subfile2.txt", "This is another subfile\n");
    zip.generateAsync({ type: "blob" }).then((content) => downloadFile(content, "bookmarks.zip", "application/zip"));
}

function downloadFile(content, filename, type) {
    var blob = new Blob([content], { type: type });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

addEventListeners();
