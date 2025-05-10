import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types'
import fs from 'fs'
import path from 'path'

const rootDir = './src' // あなたの対象ディレクトリ
const keys = new Set<string>()

function extractKeysFromParameterObject(node: t.ObjectExpression) {
  for (const prop of node.properties) {
    if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
      keys.add(prop.key.name)
    }
  }
}

function parseCode(code: string) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  })

  traverse(ast, {
    VariableDeclarator(path) {
      const { id, init } = path.node

      if (
        t.isIdentifier(id) &&
        id.name === 'parameter' &&
        t.isObjectExpression(init)
      ) {
        extractKeysFromParameterObject(init)
      }
    },
    AssignmentExpression(path) {
      const { left, right } = path.node

      if (
        t.isIdentifier(left) &&
        left.name === 'parameter' &&
        t.isObjectExpression(right)
      ) {
        extractKeysFromParameterObject(right)
      }
    },
  })
}

function walkDir(dir: string) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      walkDir(fullPath)
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      const code = fs.readFileSync(fullPath, 'utf-8')
      parseCode(code)
    }
  }
}

walkDir(rootDir)
console.log('parameter keys:', Array.from(keys))
