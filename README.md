# Server [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Set of common functionality accross nft servers.
You can install it using npm by running:

```bash
npm install --save nft-server
```

### Scripts

**build**

Build the lib for use

**lint**

Lint js files with `tslint`

**docs**

Builds an static page with the JSDoc documentation

**test**

Run tests using mocha and chai

### Release

We use [semantic-release](https://github.com/semantic-release/semantic-release) to automate the release process of this package. Every time we merge to `master`, the CI will run `semantic-release` and it will publish a new version of the package. It will determine the next version of the package and it will generate release notes from the commit messages. That's why we enforce the following format for commit messages:

```
type: message
```

or

```
type(scope): messages
```

for example

```
feature(Map): added zoom levels
```

We use [husky](https://github.com/typicode/husky) and [validate-commit-msg](https://www.npmjs.com/package/validate-commit-msg) to enforce this format on every commit.

### Continuous Deployment

If you have nft-server as a dependency and you're deploying to a Linux system, you might run into an error like this one: [commit 2dd8319 on CircleCI](https://circleci.com/gh/nft/nft-server/186?utm_campaign=vcs-integration-link&utm_medium=referral&utm_source=github-build-link).

The error comes from the installation of [`node-hid`](https://github.com/node-hid/node-hid), you need to have `libusb` available for it to work, and it's not present in all Linux systems.

You can see an example of a fix in this repos [`config.yml`](https://github.com/nft/nft-server/blob/master/.circleci/config.yml) file.

[`node-hid`](https://github.com/node-hid/node-hid) is a dependency of [`ledgerco`](https://github.com/LedgerHQ/ledgerjs), which in turn is a dependency of [`ledger-wallet-provider`](https://github.com/Neufund/ledger-wallet-provider), used by this lib.

Last commit b2890410ee3708ab5818e18cb974471dfff12977

## Error build

```
node_modules/@types/express/ts4.0/index.d.ts:43:29 - error TS2694: Namespace 'serveStatic' has no exported member 'RequestHandlerConstructor'.

43 var static: serveStatic.RequestHandlerConstructor<Response>;

Found 1 error.
```

npm update @types/express-serve-static-core --depth 2
npm update @types/serve-static --depth 2

https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49595
