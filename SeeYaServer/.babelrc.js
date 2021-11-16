const path = require('path');
const jsConfig = require('./jsconfig.json');

module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    [
      "module-resolver",
      {
        "root": [path.resolve(jsConfig.compilerOptions.baseUrl)]
      }
    ]
  ]
}