import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import * as path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      define: {
        ...(process.env.NODE_ENV === "development" && {
          "process.env": process.env,
        }),
      },
      resolve: {
        alias: {
          src: path.resolve("./src"),
        },
      },
    },
  },
};

export default config;
