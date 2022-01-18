# Canvas Pixel

Documentation: TODO

## Notes (TODO: clean up)

### Exporting for Node Package

1. `npm init -y`
2. Add "node_modules" and "build" to `.gitignore`
3. `npm install --save-dev typescript`
4. Create a `tsconfig.json` file:
```
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./build",
    "strict": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "**/__tests__/*"]
}
```
5. `mkdir src`
6. Add an `index.ts` to `src/` and add an export to it, e.g.
```
// src/index.ts
export default function testFunction(): string {
  alert('test succeeded');
  return 'yay!';
}
```
7. Edit `package.json` and add build scripts to "scripts":
```
  ...
  "scripts": {
    ...,
    "build": "tsc --build"
  },
  ...
```
8. `npm run build`

### Exporting for Web Browser

This requires using webpack, since `tsc` can't compile into a single file.

1. `npm install -g webpack`
2. `npm install -g webpack-cli`
3. Create the `webpack.config.js` file.
4. Import into HTML using a script tag, `<script src="build_web/canvas-pixel.js"></script>`.
5. Use `live-server` (`npm install live-server -g`) to test `index.html`
6. There's a global object called `canvasPixel` that has access to the functions in JavaScript on the web page.