# example: react-scripts v3

> This example instruments the React application that is using react-scripts v3 to run

## use

First, install the dependencies in the root folder of this repository

Second, install dependencies here

```shell
npm install
```

Start the application

```shell
npm start
```

The application should be instrumented, which you can check in the browser at `localhost:3000` by looking at the object `window.__coverage__`.

![Code coverage](images/code-coverage.png)

Run Cypress tests

```shell
npm test
```

The output should be saved in reports in the `coverage` folder.

```shell
open coverage/lcov-report/index.html
```

![Code coverage report](images/report.png)
