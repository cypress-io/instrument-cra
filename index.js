const debug = require('debug')('instrument-cra')
const path = require('path')
const findYarnWorkspaceRoot = require('find-yarn-workspace-root')

const workspaceRoot = findYarnWorkspaceRoot() || process.cwd()
const packagePath = path.resolve(workspaceRoot, 'package.json')

let cypressWebpackConfigPath
try {
  const package = require(packagePath)
  if (package.cypressWebpackConfigPath) {
    cypressWebpackConfigPath = package.cypressWebpackConfigPath
  }
} catch {
  debug('failed to read package.json at path: %s', packagePath)
}

debug('finding webpack config %o', {
  workspaceRoot, cypressWebpackConfigPath
})
const webpackConfigPath =
  cypressWebpackConfigPath
    ? path.resolve(
        workspaceRoot,
        path.normalize(cypressWebpackConfigPath)
      )
    : path.resolve(
        workspaceRoot,
        'node_modules',
        'react-scripts',
        'config',
        'webpack.config.js'
      )

debug('path to react-scripts own webpack.config.js: %s', webpackConfigPath)

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const webpackFactory = require(webpackConfigPath)

function fakeConfig (envName) {
  if (envName !== 'development') {
    throw new Error(
      'Can overwrite cra webpack config only for development environment'
    )
  }

  debug('calling real CRA webpack factory with env "%s"', envName)

  const config = webpackFactory(envName)
  // TODO make the search more flexible
  // TODO pass resolved plugin, not just NPM module name
  config.module.rules[2].oneOf[1].options.plugins.push('babel-plugin-istanbul')
  return config
}

// by sticking the proxied function into the require cache
// we ensure that when react-scripts start script loads it, we will get the
// returned webpack config, and will have a chance to add out plugin there
require.cache[webpackConfigPath].exports = fakeConfig
