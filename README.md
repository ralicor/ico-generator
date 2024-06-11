# ICO Generator

## プロジェクト概要

ICO Generatorは、ユーザーがアップロードした画像を様々なサイズのアイコンに変換し、favicon.icoファイルを生成するツールです。

## 使用方法

1. **依存関係のインストール**:

```sh
npm install
```

2. **開発サーバーの起動**:

```
npm run dev
```

## その他コマンド

lintチェック

```
npm run lint
```

コードの整形

```
npm run format
```

### デプロイ

GitHub Actionsを使用して自動的にデプロイされます。main ブランチにプッシュされると、自動的にビルドおよびエクスポートが行われ、GitHub Pagesにデプロイされます。

## 制作時メモ

###　このサイトを参考にしている
ico 作成
https://www.aconvert.com/jp/icon/svg-to-ico/
https://favicon-generator.mintsu-dev.com/

誰のものか分からないwebアプリでファイルアップロードを避けるため制作。
サクッと作るため、jsxで対応

- 暇あれば追加予定
  - フォームに入れた値のサイズで、icoファイルを作れる機能
  - チェックボックスの値を検知してクエリパラメータを動的に生成する機能

ベクター画像化もできたら同じ構成で別アプリで作るのはあり

https://ja.vectormagic.com/

https://vectorizer.com/ja/#google_vignette

https://www.vectorizer.io/

https://convertio.co/ja/

### デプロイ環境選定について

- vercel
  - Next.jsで使い捨てなら楽さがダントツのためvercelでデプロイしたいが、GitHubのorganizationを利用していると無料枠でデプロイできないため却下
- firebase/S3
  - 実務でも慣れていて学習にならないため今回は却下
- GitHub Pages
  - 使ったことがないため試しに採用してみる
    - 公開リポジトリでないとGitHub Pagesの無料枠でデプロイできないため、公開リポジトリとする。
    - https://pages.github.com/

### 環境変数について

github actions用の環境変数は以下だったが、現在利用なし
https://github.com/ralicor/ico-generator/settings/secrets/actions

### フォルダとファイルの説明

- `.eslintrc.json`: ESLintの設定ファイルです。コードの品質を保つためのルールが記載されています。

- `.github/`: GitHub関連の設定ファイルを格納するフォルダです。

  - `workflows/`: GitHub Actionsのワークフローファイルを格納するフォルダです。
    - `deploy.yml`: GitHub Pagesへのデプロイ用ワークフローが定義されています。

- `.gitignore`: Gitがバージョン管理から無視するファイルやフォルダを指定するためのファイルです。

- `.next/`: Next.jsのビルド成果物を格納するディレクトリです。通常、リポジトリに含めません。

- `.vscode/`: Visual Studio Codeの設定ファイルを格納するフォルダです。

  - `extensions.json`: プロジェクトで推奨されるVS Codeの拡張機能が記載されています。
  - `settings.json`: プロジェクト固有のVS Code設定が記載されています。

- `README.md`: プロジェクトの概要や構成、使用方法について記載したファイルです。

- `docs/`: プロジェクトのドキュメントやデザインファイルを格納するフォルダです。

  - `design/`: デザイン関連のファイルを格納するサブフォルダです。
    - `ico-gen-favicon.psd`: favicon.icoのデザイン元となるPhotoshopファイルです。

- `next-env.d.ts`: Next.jsの型定義ファイルです。TypeScriptの環境設定に使用されます。

- `next.config.mjs`: Next.jsの設定ファイルです。ビルドやデプロイに関する設定を行います。

- `package-lock.json`: プロジェクトの依存関係を固定するためのファイルです。npmによって自動生成されます。

- `package.json`: プロジェクトの依存関係やスクリプト、メタ情報を管理するファイルです。

- `public/`: 静的ファイルを格納するフォルダです。Next.jsはこのフォルダ内のファイルをそのまま公開します。

- `src/`: アプリケーションのソースコードを格納するフォルダです。

  - `app/`: アプリケーションのメイン部分を格納するフォルダです。
    - `(components)/`: コンポーネントを格納するサブフォルダです。
      - `(IconGenerator)/`: アイコン生成コンポーネントのフォルダです。
        - `component.jsx`: アイコン生成コンポーネントの実装ファイルです。
        - `component.module.scss`: アイコン生成コンポーネントのスタイルシートです。
    - `favicon.ico`: アプリケーションのファビコンファイルです。
    - `globals.scss`: グローバルなスタイルシートです。
    - `layout.tsx`: アプリケーションのレイアウトコンポーネントです。
    - `page.module.scss`: ページごとのスタイルシートです。
    - `page.tsx`: メインページの実装ファイルです。

- `tsconfig.json`: TypeScriptの設定ファイルです。
