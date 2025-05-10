import * as t from '@babel/types'
import fs from 'fs'
import path from 'path'
import { parse } from './utilities/parse'
import { traverse } from './utilities/traverse'

const rootDir = './app'
const keys: string[] = []

const extractKeysFromParameterObject = (node: t.ObjectExpression) => {
  for (const p of node.properties) {
    if (t.isObjectProperty(p) && t.isIdentifier(p.key)) {
      keys.push(p.key.name)
    }
  }
}

const parseCode = (code: string) => {
  const ast = parse(code)

  traverse(ast, {
    VariableDeclarator(path) {
      const { id, init } = path.node

      // const parameters = { ... }
      if (
        t.isIdentifier(id) &&
        id.name === 'parameters' &&
        t.isObjectExpression(init)
      ) {
        extractKeysFromParameterObject(init)
      }

      // const Story = { parameters: { ... } }
      if (t.isObjectExpression(init)) {
        for (const p of init.properties) {
          if (
            t.isObjectProperty(p) &&
            t.isIdentifier(p.key) &&
            p.key.name === 'parameters'
          ) {
            // parameters: { layout: 'fullscreen' }
            if (t.isObjectExpression(p.value)) {
              extractKeysFromParameterObject(p.value)
            }
            // parameters: getLayout()
            if (t.isCallExpression(p.value) && t.isIdentifier(p.value.callee)) {
              keys.push(p.value.callee.name)
            }
            // parameters: layouts,
            if (t.isIdentifier(p.value)) {
              keys.push(p.value.name)
            }
          }
        }
      }
    },
  })
}

// MEMO: workDirは再利用できそう、parseCodeは解析するコードによって変わるので都度カスタマイズが必要
const walkDir = (dir: string) => {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      walkDir(fullPath)
    } else if (entry.endsWith('.stories.tsx')) {
      const code = fs.readFileSync(fullPath, 'utf-8')
      parseCode(code)
    }
  }
}

walkDir(rootDir)

console.log('parameter keys:', Array.from(new Set(keys)))
console.log('parameter keys length:', keys.length)
