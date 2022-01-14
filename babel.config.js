module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false, // 模块使用 es modules ，不使用 commonJS 规范
      },
    ],
    '@babel/preset-react',
  ],
  babelrcRoots: [
    // Keep the root as a root
    '.',
    // Also consider monorepo packages 'root' and load their .babelrc.json files.
    './packages/*',
  ],
  plugins: [
    ['./packages/form_config/src', { ssr: false }],
    ['babel-plugin-styled-components'],
  ],
  // overrides: [{
  //   test: './packages/rc/*',
  //   presets: [
  //     [
  //       '@babel/preset-env',
  //       {
  //         'modules': false // 模块使用 es modules ，不使用 commonJS 规范
  //       }
  //     ],
  //     '@babel/preset-react'
  //   ],
  // }],
};
