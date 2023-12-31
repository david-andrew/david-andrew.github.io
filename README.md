This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> NOTE: for now, dev outputs a ton of errors on page reloads due to cross-origin isolation. Not sure exactly how to fix them, but not too important since build works just fine.

> NOTE: because of cross-origin isolation, all domains that will be used must be whitelisted in [enable-cross-origin-isolation.js](public/enable-cross-origin-isolation.js#L2).

## Deployment

On pushing to the `master` branch, the site will be automatically deployed to [GitHub Pages](https://pages.github.com/).

Local deployment and test hosting can be done with:

```bash
bun run build
cd out
bunx http-server
```
