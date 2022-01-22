# Canvas Pixel

Documentation: TODO

# Setting Up and Building the Library

## Project Setup

1. `npm init -y`
2. Add "node_modules" and "build" to `.gitignore`
3. `npm install --save-dev typescript`
4. `mkdir src`
5. Add an `index.ts` to `src/` and add an export to it, e.g.
```
// src/index.ts
export default function testFunction(): string {
  alert('test succeeded');
  return 'yay!';
}
```

## Building a Node Package

1. To fix some path resolution issues with `tsc` (the TypeScript compiler), we need to install a couple of helper libraries first:
```
npm i -save-dev tsconfig-paths
npm i -save-d ttypescript @zerollup/ts-transform-paths
```
2. Next, create the `tsconfig.json` file:
```
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "declaration": true,
    "outDir": "./build",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@src/*": ["src/*"]
    },
    "plugins": [
      {
        "transform": "@zerollup/ts-transform-paths"
      }
    ]
  },
  "include": ["src"],
  "exclude": ["node_modules", "**/__tests__/*"]
}
```
3. Edit `package.json` and add build scripts to "scripts":
```
  ...
  "scripts": {
    ...,
    "build": "ttsc -P ./tsconfig.json",
  },
  ...
```
4. `npm run build`

This generates a `build` directory. You can use it locally with `npm install /path/to/build` or publish it to `npm`.

## Exporting for Web Browser

This requires using webpack, since `tsc` can't compile into a single file.

1. First, install webpack:
```
npm install -g webpack
npm install -g webpack-cli
```
2. Next, create the `webpack.config.js` file:
```
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build_web'),
    filename: 'canvas-pixel.js',
    library: 'canvasPixel',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: 'development',
};
```
3. You can either compile using the `webpack` command directly, or with an `npm run` command by adding a script to `package.json`:
```
  ...
  "scripts": {
    ...,
    "build-web": "webpack",
  },
  ...
```
4. Import into HTML using a script tag, `<script src="build_web/canvas-pixel.js"></script>`.
5. Use `live-server` (`npm install live-server -g`) to test `index.html`
6. There's a global object called `canvasPixel` that has access to the functions in JavaScript on the web page.