# nuxt-auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Auth module for nuxt, to integrate Laravel 

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `nuxt-auth` dependency to your project

```bash
yarn add nuxt-auth # or npm install nuxt-auth
```

2. Add `nuxt-auth` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'nuxt-auth',

    // With options
    ['nuxt-auth', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Boudy de Geer <boudydegeer@mosaiqo.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-auth/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-auth

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-auth.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-auth

[github-actions-ci-src]: https://github.com/wartisans/nuxt-auth/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/wartisans/nuxt-auth/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/wartisans/nuxt-auth.svg
[codecov-href]: https://codecov.io/gh/wartisans/nuxt-auth

[license-src]: https://img.shields.io/npm/l/nuxt-auth.svg
[license-href]: https://npmjs.com/package/nuxt-auth
