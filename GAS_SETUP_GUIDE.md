# Google Apps Script (GAS) セットアップガイド

回答データをGoogleスプレッドシートに自動保存するための設定手順です。

## 1. スプレッドシートの準備
1. [Googleスプレッドシート](https://sheets.new/)を新規作成します。
2. 1行目（ヘッダー）に以下の項目を入力しておくと分かりやすくなります（必須ではありませんが推奨）。
   - `timestamp`, `activity`, `totalScore`, `SLIM-01`, `SLIM-05`, ... (各項目のID)

## 2. GASエディタを開く
1. ツールバーの **「拡張機能」** > **「Apps Script」** をクリックします。

## 3. コードを貼り付ける
エディタにある初期コードを全て消去し、以下のコードを貼り付けて保存（Ctrl+S / Cmd+S）します。

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // シートのヘッダーを取得
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // ヘッダーに合わせてデータを配列にする
    const newRow = headers.map(header => {
      return data[header] !== undefined ? data[header] : "";
    });
    
    // データのみが送られてきてヘッダーがない場合や、新しい項目がある場合のフォールバック
    if (sheet.getLastRow() === 0) {
      const keys = Object.keys(data);
      sheet.appendRow(keys);
      sheet.appendRow(keys.map(k => data[k]));
    } else {
      sheet.appendRow(newRow);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 4. デプロイする
1. 右上の **「デプロイ」** > **「新しいデプロイ」** をクリックします。
2. 種類の選択（歯車アイコン）で **「ウェブアプリ」** を選択します。
3. 設定を以下のように変更します：
   - **説明**: `SLIM-J Data Collection` など
   - **次のユーザーとして実行**: `自分`
   - **アクセスできるユーザー**: `全員`（重要：ログイン不要でデータを送るため）
4. **「デプロイ」** をクリックします。
5. （初回のみ）「アクセスの承認」を求められるので、自分のアカウントを選択し、許可します。
6. 発行された **「ウェブアプリのURL」** をコピーします。

## 5. アプリへの反映
1. コピーしたURLを、`.env` ファイル（またはRenderの環境変数）に `VITE_GAS_URL` として設定します。
   ```
   VITE_GAS_URL=https://script.google.com/macros/s/XXXXX/exec
   ```
2. Renderでデプロイしている場合は、Renderの管理画面の **「Environment」** 設定でこの環境変数を追加して保存してください。
