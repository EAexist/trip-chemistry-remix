import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { vercelPreset } from '@vercel/remix/vite';
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [remix({ 
    presets: [vercelPreset()], 
    // TODO: when mui has esm support, remove this (default is esm)
    // check it https://github.com/mui/material-ui/issues/30671
    // serverModuleFormat: 'cjs' 
  }), tsconfigPaths()],
});
