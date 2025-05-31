# Bookmark Directory Converter

## English

### Overview

This is a Firefox browser extension that allows you to convert between bookmarks and a directory structure.
You can export your browser bookmarks as a directory structure while preserving their hierarchy.
Likewise, you can import an edited directory structure back into the browser, restoring it as bookmarks with the original hierarchy intact.
Manage your bookmarks efficiently, just like organizing files.

### Features

#### Export Bookmarks

You can export all browser bookmarks as a ZIP file.
The folder structure of the bookmarks is reproduced as a directory structure, and each bookmark is saved as either a `.url` or `.txt` file (user-selectable).
Bookmark names are generally preserved, but if they contain characters that are not allowed in file names or are too long, they will be automatically converted.

#### Import Directory Structure

You can import a directory structure either from a ZIP file or directly as-is.
Each bookmark must be saved as a `.url` or `.txt` file.
To avoid processing errors, it's recommended to edit the exported structure before importing it.
Imported bookmarks will be added to the "Other Bookmarks" folder.

## 日本語

### 概要

ブックマークとディレクトリ構成を相互に変換できる、Firefox用のブラウザ拡張機能です。
ブラウザのブックマークを、構造を保ったままディレクトリ構成に変換してエクスポートできます。
また、エクスポート後に編集したディレクトリ構成を、構造を保ったままブラウザのブックマークとしてインポートできます。
ファイルを整理するように、ブックマークを効率的に管理しましょう。

### 機能

#### ブックマークのエクスポート

ブラウザのすべてのブックマークを、zipファイルにまとめてエクスポートできます。
ブックマークのフォルダ構成はそのままディレクトリ構成として再現され、各ブックマークは`.url`ファイルまたは`.txt`ファイル(選択可能)として保存されます。
ブックマーク名は基本的に保持されますが、ファイル名に使用できない文字が含まれている場合や長すぎる場合は、自動的に変換されます。

#### ディレクトリ構成のインポート

ディレクトリ構成を、zipファイルから、またはそのままインポートできます。
各ブックマークは、`.url`ファイルまたは`.txt`ファイルとして保存されている必要があります。
処理エラーを防ぐため、基本的にはエクスポートされたものを編集してからインポートしてください。
インポートされたブックマークは、"他のブックマーク"フォルダに追加されます。
