# Yu Studio

個人開発スタジオ「Yu Studio」のアプリ作品集。フレームワーク・ビルド不要の HTML / CSS / JavaScript サイトです。

- 本体: https://yu-studio-site.hy218355.workers.dev
- 配信: Cloudflare Workers の static assets（`wrangler.toml` の `[assets] directory = "."`）
- 掲載作品: StudyQuest、雨宿り
- `hy218355-bit.github.io` は別リポジトリで、StudyQuest サポートと `app-ads.txt` を管理しています。

## ローカルプレビュー

リポジトリのルートで実行します。

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

http://127.0.0.1:8765/ を開いてください。依存インストール・ビルドは不要です。

## 構成

```text
index.html              アプリ一覧・スタジオ紹介
studyquest.html         StudyQuest の紹介
amayadori.html          雨宿りの紹介
studyquest/index.html   従来 URL からの転送
amayadori/index.html    従来 URL からの転送
assets/site.css        3 ページ共通スタイル（ライト配色固定）
assets/site.js         モバイルナビゲーション・画面拡大
assets/*.png           既存アプリアイコン・実画面
app-ads.txt             AdMob 用（ルート配置を維持）
admin.html             既存の管理用ページ
wrangler.toml          既存 Worker の配信設定
```

既存の App Store ID、問い合わせ先、従来 URL、`app-ads.txt` は維持します。未公開アプリや未確認の実績を追加しないでください。

## 動作の確認

```sh
node --check assets/site.js
```

- デスクトップ / スマホ / 中間幅で横スクロールや欠けがないこと。
- 作品の詳細、アプリ一覧へのリンク、ブラウザの戻る操作。
- モバイルメニューの反復開閉、リンク選択時の閉鎖、Escape。
- 各作品のスクリーンショット拡大、前後切替、Escape、フォーカスの復帰。
- Tab / Shift+Tab / Enter による操作と本文へのスキップ。
- OS の reduced motion で入場・ホバーアニメーションとスムーズスクロールを停止。
- OS のダークモードでもライト配色を維持。
- JavaScript 無効時もナビゲーションと作品の紹介を閲覧可能。

Google Fonts を読み込めない場合は、OS の明朝体・ゴシック体にフォールバックします。サーバー API や解析サービスは追加していません。

## 公開

既存の Cloudflare Git 連携を使います。本番反映は明示的に承認された後に行ってください。`main` への push / merge が自動配信を起動する可能性があります。

`app-ads.txt` は全アプリ共通の AdMob 設定です。内容を勝手に書き換えず、公開後に `/app-ads.txt` がそのまま取得できることを確認してください。ビルド工程はなく、作業用画像・テスト依存は配信ルートに含めないでください。
