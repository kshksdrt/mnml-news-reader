import path from "path";
import { defineConfig } from "vite";

import svgr from "vite-plugin-svgr";
import reactRefresh from "@vitejs/plugin-react-refresh";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [reactRefresh(), envCompatible(), svgr()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
