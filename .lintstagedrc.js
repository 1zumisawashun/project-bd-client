// const path = require('path')

// const formatRelativePaths = (absolutePaths) => {
//   const cwd = process.cwd()

//   const relativePaths = absolutePaths
//     .map((file) => path.relative(cwd, file))
//     .join(' --file ')

//   return relativePaths
// }

// /**
//  * lint-staged + eslintの場合は次の記事を参考にする
//  * @see https://nextjs.org/docs/pages/building-your-application/configuring/eslint#lint-staged
//  * 普通にnpm run lint:js:fixのrcを実行するのは問題ない
//  */
// module.exports = {
//   'app/**/*.{ts,tsx}': (absolutePaths) => {
//     return [
//       "bash -c 'npm run compile'",
//       'npm run format:fix',
//       `next lint --fix --file ${formatRelativePaths(absolutePaths)}`,
//       'git add',
//     ]
//   },
// }

const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
