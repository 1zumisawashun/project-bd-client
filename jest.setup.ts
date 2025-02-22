// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom'

/**
 * import { RuleTester } from '@typescript-eslint/rule-tester' でエラーが発生するため設置する
 * @see https://qiita.com/Sicut_study/items/23f3c8f9f789b38260ca
 */
if (!global.structuredClone) {
  global.structuredClone = function structuredClone(objectToClone: any) {
    if (objectToClone === undefined) return undefined
    return JSON.parse(JSON.stringify(objectToClone))
  }
}

if (!global.setImmediate) {
  global.setImmediate = function setImmediate(
    callback: (...args: any[]) => void,
    ...args: any[]
  ) {
    return setTimeout(callback, 0, ...args)
  }
}

if (!global.clearImmediate) {
  global.clearImmediate = function clearImmediate(id: any) {
    clearTimeout(id)
  }
}
