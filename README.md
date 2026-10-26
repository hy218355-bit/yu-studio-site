# Yu Studio

個人開発スタジオ「Yu Studio」のアプリ作品集。フレームワーク・ビルド不要の HTML / CSS / JavaScript サイトです。

- 本体: https://yu-studio-site.hy218355.workers.dev
- 配信: Cloudflare Workers の static assets（`wrangler.toml` の `[assets] directory = "."`）
- 掲載作品: StudyQuest、雨宿り、Focus Mate（開発中の紹介）
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
focus-mate.html        Focus Mate の紹介（開発中）
studyquest/index.html   従来 URL からの転送
amayadori/index.html    従来 URL からの転送
assets/site.css        スタジオ・各 LP の共通スタイル（ライト配色固定）
assets/site.js         画面拡大・前後切替
assets/focus-mate.css  Focus Mate LP・ホームの紹介枠用スタイル
assets/focus-mate.js   LP の相棒イラスト切り替え
assets/focus-mate/     アプリ内の実キャラ素材から軽量化した WebP
assets/*.png           既存アプリアイコン・実画面
app-ads.txt             AdMob 用（ルート配置を維持）
admin.html             既存の管理用ページ
wrangler.toml          既存 Worker の配信設定
```

既存の App Store ID、問い合わせ先、従来 URL、`app-ads.txt` は維持します。Focus Mate はユーザー依頼により開発中として紹介し、配信・価格・実績は未確認のまま掲載しないでください。

## Focus Mate LP 更新 2026年10月26日

`focus-mate.html` は5人の相棒と、集中・会話・記憶の体験を紹介する新デザイン。専用の `assets/focus-mate-v2.css` と `assets/focus-mate-v2.js` を使用する。既存ホームが参照する旧 `focus-mate.css` と共通CSSは保持する。

現在の開発版に合わせ、美月・ひなた・凛・悠真・空を紹介。人物名と性格は現行 `CompanionCatalog.cs`、`CHARACTER_ROSTER_v1.0.md`、各canonに照合し、未採用の職業や経歴は追加しない。AI会話の実機検証、記憶の確認・訂正・削除、タイマー／カウントアップ、無料集中ポイントを記載。AIの全人物品質・一般公開・公開料金の完成は主張しない。

`assets/focus-mate/v2/` は既存の採用原画とアプリのQA画面から作成したWebP。原画の比率を保持して縮小・変換し、アプリのソースや画像は変更しない。画面は検証用データを含む開発画面と明記。会話例はLP内の例として明記し、実際のAI返信ログとは区別する。

5人の紹介切り替え、今日／翌日／1週間後の会話例、FAQを操作できる。先行案内はFormspreeフォーム `https://formspree.io/f/mwllllnz` へPOSTし、メールアドレスと固定の目的・流入元を保存する。送信前に用途とFormspreeへの保存を案内する。JavaScript有効時はLP内で受付結果を表示し、無効時は通常のHTMLフォームとして送信できる。送信中は二重送信を防ぎ、失敗時は入力を保持して再試行とGmailでの問い合わせを案内する。問い合わせは `hy218355@gmail.com` 宛のGmail作成画面を開く。LPの閲覧回数・表示速度はCloudflare Web Analyticsで計測する。登録メールアドレスはアクセス計測へ送信しない。利用者への自動返信メールは追加していない。

LP: http://127.0.0.1:8765/focus-mate.html

ローカルプレビューを更新したもので、本番公開は別の作業。

## 動作の確認

```sh
node --check assets/site.js
node --check assets/focus-mate.js
node --check assets/focus-mate-v2.js
```

- デスクトップ / スマホ / 中間幅で横スクロールや欠けがないこと。
- 作品の詳細、アプリ一覧へのリンク、ブラウザの戻る操作。
- 常時表示ナビゲーション、気分から選ぶリンク、同じリンクの繰り返し操作。
- 各作品のスクリーンショット拡大、前後切替、Escape、フォーカスの復帰。
- Tab / Shift+Tab / Enter による操作と本文へのスキップ。
- OS の reduced motion で入場・ホバーアニメーションとスムーズスクロールを停止。
- OS のダークモードでもライト配色を維持。
- JavaScript 無効時もナビゲーション・作品紹介・スクリーンショットへの直接リンクを利用可能。

Google Fonts を読み込めない場合は、OS の明朝体・ゴシック体にフォールバックします。サーバー API や解析サービスは追加していません。

## 公開

既存の Cloudflare Git 連携を使います。本番反映は明示的に承認された後に行ってください。`main` への push / merge が自動配信を起動する可能性があります。

`app-ads.txt` は全アプリ共通の AdMob 設定です。内容を勝手に書き換えず、公開後に `/app-ads.txt` がそのまま取得できることを確認してください。ビルド工程はなく、作業用画像・テスト依存は配信ルートに含めないでください。

ひなたのLP紹介画像は、元のSUNNYパーカーの座り原画を組み込みimagegenで背景抽出し、机と座り姿を保持した透過素材へ更新。背景はほかのキャラと同じ淡いベージュ。アプリ本体・原画は変更しない。昼の室内背景への差し替えと立ち姿の案は取り下げた。

LPの主訴求を「会話も、努力も、覚えてくれる相棒」へ更新。記憶のセクションをヒーロー直後へ移し、会話で伝えた好み・目標と集中した時間を区別して紹介。今日／翌日／1週間後の例で両方の記憶を示す。例示と記憶の設定による違いを明記し、すべての会話を無条件・永久に保存するとは表現しない。

着せ替えとアクセサリーの専用紹介を追加。衣装試着と髪飾りショップの開発画面を使い、画像は別タブで拡大可能。本文・会話例はおおむね15〜17px、注釈は12〜13px、操作部は14〜16pxへ拡大し、小画面での折返しも調整する。

2026年10月26日、デザイン比較でユーザーがA案（かわいさ強め）を選択。focus-mate-a.cssを専用テーマとして追加し、コーラル・ラベンダー、丸い写真枠、吹き出しのヒーローを採用。記憶、集中、5人の紹介、着せ替え、FAQ、先行体験も同じ配色・形状へ統一。キャラ選択・会話例・Gmailの宛先とリンク・読みやすくした文字サイズは保持する。ローカルプレビューへの反映で、本番公開は行っていない。

### Focus Mate LP — item collage
- Shortened repeated introduction, memory, and wardrobe copy while keeping the memory demo and Gmail contact.
- Uses seven actual accessories from the app’s SharedArt.asset: mint ribbon, lavender ribbon, round glasses, daisy clip, rose quartz earring, coffee brooch, and book brooch. Each image is extracted using its registered texture and UV rectangle (including BoutiqueHair_v001 for mint ribbon and daisy), then proportionally resized and losslessly encoded with transparency. The temporary SVG illustrations were removed; no artwork was redrawn.
- Checked 320px, 390px, 795px, and desktop layouts; character and story switching remain available.

### Focus Mate LP — UI and motion polish
- Added a translucent sticky header, active section navigation, reading progress, softer card depth, and hover/press feedback.
- App accessory textures drift gently while visible; sections reveal once during scrolling. Portrait and conversation selections animate without autoplay or external services.
- The header pause button stops motion. The OS reduced-motion preference is respected and content remains readable without JavaScript. Offscreen sections and background tabs pause decorative animation.
- Verified character/story switching, pause/resume, and 320/390/795/1440px layouts locally.

### Focus Mate LP — Formspree waitlist
- Created the verified Formspree form “Focus Mate 先行体験” (mwllllnz), with notifications sent to hy218355@gmail.com. Existing Formshield and CAPTCHA settings were preserved.
- Added a single email field, purpose/storage notice, an unobtrusive honeypot, pending/success/error states, retry and Gmail support. Success is shown only after an accepted server response. No subscription data is kept in browser storage.
- One live QA registration (focus-mate-test@example.com) was accepted, appeared in Submissions, and generated the Gmail notification. This is test data, not genuine demand.
- Empty/invalid input was rejected in-browser; mocked error/timeout/duplicate cases passed. Layout checked at 320px and 390px, with desktop verification before handoff.
- Connected in the local preview; no production deployment or paid plan changes were made.

### Focus Mate measurement — 2026-10-26

- Cloudflare Web Analytics site: `af11afae1e734838b328fac1b83241e5`, host `yu-studio-site.hy218355.workers.dev`.
- Views: https://dash.cloudflare.com/6ed7521b2ee4fd808399b72c523d1fd2/web-analytics/overview/page-views?siteTag~in=af11afae1e734838b328fac1b83241e5&excludeBots=Yes
- Registrations: https://formspree.io/forms/mwllllnz/submissions
- The beacon is added only on the production Focus Mate LP, respects Do Not Track / Global Privacy Control, and is disabled on localhost, other hosts, `?qa=1`, and `?analytics=off`. SPA measurement is disabled so anchor clicks, story tabs, and mate selection do not add page views. No email address, form value, persistent visitor ID, or registration data is passed to the beacon.
- QA URL: `https://yu-studio-site.hy218355.workers.dev/focus-mate?qa=1`. Use this for future checks. QA/local submissions have `measurement_mode=qa`; normal accepted registrations have `measurement_mode=live`. This label is sent only to Formspree. Native HTML form submissions without JavaScript default to live.
- Compare identical date ranges in JST. The denominator is **LP Page views**, not unique people. Cloudflare Visits is a different metric (entry from a different hostname or direct link). Repeated views are included; browser privacy settings, blockers, or disabled JavaScript may leave some views unmeasured. The resulting registration-per-view rate is a reference, not a person-level funnel.
- The numerator is accepted Inbox registrations, excluding spam, `measurement_mode=qa`, and test records, deduplicated by trimmed, lowercase email. Do not merge provider-specific dot/plus aliases automatically. Exclude the two older QA emails `focus-mate-test@example.com` and `focus-mate-production-test@example.com`, which were created before the QA label existed. Known QA emails are labeled automatically if reused.
- With the current Formspree Free plan, inspect the Inbox when aggregating a small pilot. CSV/JSON export and the Submissions API require an eligible paid plan; no upgrade was made. Do not treat raw Inbox row count as deduplicated registration count.
- Formula: unique valid registrations / LP page views * 100. Use the same cohort start and end; when views are zero report the rate as unavailable. Do not count the previously created QA records as demand.
