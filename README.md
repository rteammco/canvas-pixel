## Notes - Package

1. `npm init -y`
2. Add "node_modules" and "build" to `.gitignore`
3. `npm install --save-dev typescript`
4. Create a `tsconfig.json` file:
```
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
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
    "build": "tsc --build",
    "clean": "tsc --build --clean"
  },
  ...
```
8. `npm run build`
9. Import in a script, `import testFunction from './build/index.js';` or use in HTML script tag, `<script type="module" src="build/index.js"></script>`