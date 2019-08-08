# @cypress/instrument-cra
> Little module for CRA applications to instrument code without ejecting react-scripts

## Install and use

```
yarn add @cypress/instrument-cra
```

Then change your `npm start` script to require this module before starting the dev server

```json
{
  "scripts": {
    "start": "react-scripts -r @cypress/instrument-cra start",
  }
}
```

This module assumes standard [Create-React-App v3](https://github.com/facebook/create-react-app) JavaScript application with source files in the "src" folder.

When the app starts with `yarn start`, you should see the coverage information under `window.__coverage__` information.

The instrumentation is done using [Istanbul.js](https://istanbul.js.org/) via [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) and is compatible with [@cypress/code-coverage](https://github.com/cypress-io/code-coverage) plugin.

## Exclude files

If you want to exclude files from coverage, for example `src/serviceWorker.js`, add an object named `nyc` to `package.json` following the [nyc CLI configuration](https://github.com/istanbuljs/nyc#configuring-nyc).

```json
{
  "nyc": {
    "exclude": "src/serviceWorker.js"
  }
}
```

## Debugging

Run with environment variable `DEBUG=instrument-cra` to see the verbose logs

## License

MIT License, see [LICENSE](LICENSE)
