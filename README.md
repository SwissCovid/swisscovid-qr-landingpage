# swisscovid-qr-landingpage

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://github.com/SwissCovid/swisscovid-qr-landingpage/blob/master/LICENSE)

## Build

This project requires Hugo 0.78.2 which can be installed from [here](https://gohugo.io/getting-started/installing). **Careful** the extended version is needed for SCSS preprocessing.

Additional dependencies need to be installed using the [yarn package manager](https://yarnpkg.com/) with `yarn install`.

### Build Site

The javascript can be compiled using `yarn build:TARGET:js` where target is one of `{prod, abn, dev}`. This site can then be built with the command `hugo`.

### Start Server

Simlarly a dev server can be started using `yarn watch:js` and `hugo server`.

## License

This project is licensed under the terms of the MPL 2 license. See the [LICENSE](LICENSE) file.
