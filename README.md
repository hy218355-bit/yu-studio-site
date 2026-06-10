# Yu Studio Site

個人開発スタジオ「Yu Studio」の公式サイト。Cloudflare Pages でホスティング。
`app-ads.txt` をルートに置いて AdMob に検出させるための土台でもある。

## 構成

```
yu-studio-site/
├── index.html          # Yu Studio トップ（全アプリ一覧）
├── app-ads.txt         # ★ルート必須。全アプリ共通
└── studyquest/
    └── index.html      # StudyQuest の LP
```

将来 アプリ追加時は `<appname>/index.html` を足し、`index.html` のカード一覧に追加する。

## デプロイ手順（PCで作業する自分へ）

### 1. ドメイン取得（Cloudflare）
- Cloudflare Registrar で `yustudio.com` などを取得（取れなければ別候補）。
- `.com` 年$10前後・更新料同額固定・Whois代行無料。

### 2. GitHub にすでに push 済み
- このリポジトリ自体。ローカル → `git push` 済み。

### 3. Cloudflare Pages にデプロイ
- Cloudflare Pages で「Connect to Git」→ このリポを指定。
- Framework preset = None、出力ディレクトリ = `/`、ビルドコマンドなし。
- デプロイ後、Custom domains に独自ドメインを紐付け。
- `https://<独自ドメイン>/app-ads.txt` がルートで開けることを確認（必須）。

### 4. app-ads.txt の正式値を取得して差し替え
- AdMob → app-ads.txt → 「設定方法」で表示される1行（`google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`）を `app-ads.txt` に書き換えて push。

### 5. App Store Connect 側
- StudyQuest → マーケティングURL を `https://<独自ドメイン>/studyquest/` に設定。
- ※ AdMob はマーケティングURL/サポートURLのドメインをクロールして app-ads.txt を判定。

### 6. 待つ
- Googleクローラの検出に数日〜1週間。AdMob 管理画面の円グラフが「承認済み」（緑）に変われば完了。

## 注意

- `app-ads.txt` は **必ずルート** (`/app-ads.txt`)。サブパスは検出されない。
- `*.pages.dev` のサブドメインだと稀に検出されないので、独自ドメイン必須。
- 反映に時間がかかるので焦らない。

## 完了の定義

- [ ] 独自ドメイン取得済み
- [ ] Cloudflare Pages デプロイ・独自ドメイン紐付け済み
- [ ] `https://<独自ドメイン>/app-ads.txt` ルートで開ける
- [ ] AdMob 指定の正式な1行が入っている
- [ ] App Store Connect の StudyQuest マーケティングURL 設定済み
- [ ] AdMob で app-ads.txt が「承認済み」を確認

---

詳細経緯: `~/Downloads/HANDOFF_app-ads-txt.md`
