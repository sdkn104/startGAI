# startGAI

```
npm init -y
npm i puppeteer-core node-clipboardy
npm install webpack webpack-cli
```

create webpack.config.js
```
const path = require('path');

module.exports = {
  entry: './startgai.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
};
```

add to package.json
```
"scripts": {
  "build": "webpack"
}
```