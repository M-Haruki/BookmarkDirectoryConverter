const resources = {
    en: {
        title: "Bookmark Directory Converter",
        description:
            "A browser extension that converts bookmarks into a directory structure and a directory structure into bookmarks.",
        export: "Export",
        exportDescription:
            "You can export all browser bookmarks as a ZIP file. Bookmark names are generally preserved, but if they contain characters that are not allowed in file names or are too long, they will be automatically converted.",
        export_url: "Export(.url)",
        export_txt: "Export(.txt)",
        import: "Import",
        importDescription:
            'You can import a directory structure either from a ZIP file or directly as-is. Imported bookmarks will be added to the "Other Bookmarks" folder. Empty directories in the structure will be ignored.',
        fromZipFile: "From ZIP file",
        fromDirectory: "From directory",
        register: "Register",
        exportConfirm: "Are you sure you want to export {count} bookmarks as {filetype} files?",
        importErrorAlert: "Please select a zip file or a directory.",
        importConfirm: "Import {length} bookmarks?",
        importSuccessAlert: "Imported {length} bookmarks successfully!",
    },
    ja: {
        title: "Bookmark Directory Converter",
        description:
            "ブックマークをディレクトリ構成に、ディレクトリ構成をブックマークに変換する、ブラウザ拡張機能です。",
        export: "エクスポート",
        exportDescription:
            "ブラウザのすべてのブックマークを、zipファイルにまとめてエクスポートできます。ブックマーク名は基本的に保持されますが、ファイル名に使用できない文字が含まれている場合や長すぎる場合は、自動的に変換されます。",
        export_url: "エクスポート(.url)",
        export_txt: "エクスポート(.txt)",
        import: "インポート",
        importDescription:
            'ディレクトリ構成を、zipファイルから、またはそのままインポートできます。インポートされたブックマークは、"他のブックマーク"フォルダに追加されます。なお、空のディレクトリは無視されます。',
        fromZipFile: "ZIPファイルから",
        fromDirectory: "ディレクトリから",
        register: "登録",
        exportConfirm: "{count}個のブックマークを{filetype}ファイルとしてエクスポートしますか?",
        importErrorAlert: "zipファイルまたはディレクトリを選択してください。",
        importConfirm: "{length}個のブックマークをインポートしますか?",
        importSuccessAlert: "{length}個のブックマークを正常にインポートしました!",
    },
};

function init() {
    const lang = window.navigator.language || "en";
    const resource = resources[lang] || resources.en;

    for (const key in resource) {
        if (resource.hasOwnProperty(key)) {
            const elements = document.querySelectorAll(`[i18n="${key}"]`);
            elements.forEach((element) => {
                element.textContent = resource[key];
            });
        }
    }

    document.title = resource.title;
}

function i18n(key, values = {}) {
    const lang = window.navigator.language || "en";
    const resource = resources[lang] || resources.en;
    if (!resource[key]) {
        console.warn(`i18n: Key "${key}" not found for language "${lang}". Using default.`);
        return key; // Return the key itself if not found
    }

    let text = resource[key];

    for (const placeholder in values) {
        if (values.hasOwnProperty(placeholder)) {
            const regex = new RegExp(`\\{${placeholder}\\}`, "g");
            text = text.replace(regex, values[placeholder]);
            console.log(`i18n: Replaced ${placeholder} with ${values[placeholder]} in key "${key}"`);
        }
    }

    console.log(values);

    return text;
}

init();
