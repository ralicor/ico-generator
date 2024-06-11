This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

##　このサイトを参考にしている
ico 作成
https://www.aconvert.com/jp/icon/svg-to-ico/
https://favicon-generator.mintsu-dev.com/

## 制作時メモ

誰のものか分からないwebアプリでファイルアップロードを避けるため制作。
サクッと作るため、jsxで対応
使い捨てのため、単機能とする。
必要ならフォームに入れた値のサイズで、icoファイルを作れる機能追加

ベクター画像化もできたら同じ構成で別アプリで作るのはあり

https://ja.vectormagic.com/

https://vectorizer.com/ja/#google_vignette

https://www.vectorizer.io/

https://convertio.co/ja/

### デプロイ環境について

GitHub Pagesを利用する
https://pages.github.com/

楽にデプロイしたいため、vercelでデプロイしたいが、GitHubの組織を利用していると無料枠でデプロイできないため。

GitHub Actionsを用いてmainにPUSHした際の/out/配下を静的webアプリとしてデプロイする

公開リポジトリでないとGitHub Pagesの無料枠でデプロイできないため、公開リポジトリとする。

npm run lint
npm run format
npm run build
後にCOMMIT,PUSH

(GitHub Actions内でbuildするが、上記コマンドが通ることは事前に確認する)

### 環境変数について

github actions用の環境変数は以下だったが、現在利用なし
https://github.com/ralicor/ico-generator/settings/secrets/actions
