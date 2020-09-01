import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import copy from 'rollup-plugin-copy'

const production = !process.env.ROLLUP_WATCH
const version = (() => {
  try {
    return (
      'v-' +
      String(
        require('child_process').execSync('git rev-parse --short HEAD')
      ).trim()
    )
  } catch (e) {
    return 'r-' + String(Math.random()).slice(2, 12)
  }
})()

function serve() {
  let server

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      )

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    },
  }
}

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: production
      ? `dist/build/bundle-${version}.js`
      : 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write(production ? `bundle-${version}.css` : 'bundle.css')
      },
      preprocess: sveltePreprocess(),
    }),
    // For importing scss from js
    postcss(),
    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({ sourceMap: !production }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    // Set commit hash to filenames
    // see https://github.com/sveltejs/template/issues/39
    production &&
      copy({
        targets: [
          {
            src: 'public/index.html',
            dest: 'dist',
            transform: (contents) =>
              contents
                .toString()
                .replace(/build\/bundle/g, `build/bundle-${version}`),
          },
          {
            src: 'public/assets',
            dest: 'dist',
          },
          {
            src: 'public/favicon.ico',
            dest: 'dist',
          },
        ],
      }),
  ],
  watch: {
    clearScreen: false,
  },
}
