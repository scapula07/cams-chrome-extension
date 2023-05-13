import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

const root=resolve(__dirname,'src')
const pagesDir = resolve(root, "pages");
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        cams: resolve(root,'cams.html'),
        dashboard: resolve(root,'dashboard.html'),
        register: resolve(root,'regNoti.html'),
        history: resolve(root,'history.html'),
        notifications: resolve(root,'notifications.html'),
        onboard: resolve(root,'onboard.html'),
        content: resolve(pagesDir, "Contents", "index.js"),
        background: resolve(pagesDir, "Background", "index.js"),

      },
    },
  }
})


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path, { resolve } from "path";
// // import makeManifest from "./utils/plugins/make-manifest";
// // import customDynamicImport from "./utils/plugins/custom-dynamic-import";
// // import addHmr from "./utils/plugins/add-hmr";
// // import manifest from "./manifest";

// const root = resolve(__dirname, "src");
// const pagesDir = resolve(root, "pages");
// const assetsDir = resolve(root, "assets");
// const outDir = resolve(__dirname, "dist");
// const publicDir = resolve(__dirname, "public");

// const isDev = process.env.__DEV__ === "true";
// const isProduction = !isDev;

// // ENABLE HMR IN BACKGROUND SCRIPT
// const enableHmrInBackgroundScript = true;

// export default defineConfig({
//   resolve: {
//     alias: {
//       "@src": root,
//       "@assets": assetsDir,
//       "@pages": pagesDir,
//     },
//   },
//   plugins: [
//     react(),
//     // makeManifest(manifest, {
//       isDev,
//     regenerateCacheInvalidationKey(),
//     // }),
//     // customDynamicImport(),
//     // addHmr({ background: enableHmrInBackgroundScript, view: true }),
//   ],
//   publicDir,
//   build: {
//     // outDir,
//     /** Can slowDown build speed. */
//     // sourcemap: isDev,
//     // minify: isProduction,
//     // reportCompressedSize: isProduction,
//     rollupOptions: {
//       input: {
//          main: resolve(root, 'index.html'),
//         cams: resolve(root,'cams.html'),
//         dashboard: resolve(root,'dashboard.html'),
//         history: resolve(root,'history.html'),
//         notifications: resolve(root,'notifications.html'),
//         onboard: resolve(root,'onboard.html'),
//         content: resolve(pagesDir, "Contents", "index.js"),
//         background: resolve(pagesDir, "Background", "index.js"),
//       },
//       watch: {
//         include: ["src/**", "vite.config.js"],
//         exclude: ["node_modules/**"],
//       },
//       output: {
//         entryFileNames: "src/pages/[name]/index.js",
//         chunkFileNames: isDev
//           ? "assets/js/[name].js"
//           : "assets/js/[name].[hash].js",
//         assetFileNames: (assetInfo) => {
//           const { dir, name: _name } = path.parse(assetInfo.name);
//           const assetFolder = dir.split("/").at(-1);
//           const name = assetFolder + firstUpperCase(_name);
//           if (name === "contentStyle") {
//             return `assets/css/contentStyle${cacheInvalidationKey}.chunk.css`;
//           }
//           return `assets/[ext]/${name}.chunk.[ext]`;
//         },
//       },
//     },
//   },
// });

// function firstUpperCase(str) {
//   const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
//   return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
// }

// let cacheInvalidationKey = generateKey();
// function regenerateCacheInvalidationKey() {
//   cacheInvalidationKey = generateKey();
//   return cacheInvalidationKey;
// }

// function generateKey() {
//   return `${(Date.now() / 100).toFixed()}`;
// }