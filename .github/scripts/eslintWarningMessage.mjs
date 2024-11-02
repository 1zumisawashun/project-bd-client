const input = `
/home/runner/work/project-bd-client/project-bd-client/app/components/elements/Editor/index.stories.tsx
Warning:   23:3  warning  Unexpected console statement  no-console

/home/runner/work/project-bd-client/project-bd-client/app/features/sign-in/SignIn.tsx
Warning:   56:58  warning  Unexpected console statement  no-console

/home/runner/work/project-bd-client/project-bd-client/app/features/sign-up/SignUp.tsx
Warning:   60:58  warning  Unexpected console statement  no-console

/home/runner/work/project-bd-client/project-bd-client/app/functions/helpers/utils.ts
Warning:   11:5  warning  Unexpected console statement  no-console
Warning:   15:5  warning  Unexpected console statement  no-console
Warning:   23:5  warning  Unexpected console statement  no-console
`

const result = []
const lines = input.trim().split('\n')

let currentPath = null

lines.forEach((line) => {
  if (line.match(/\.tsx?$/)) {
    currentPath = line.trim()
  }

  if (currentPath && line.includes('Warning:')) {
    const [message] = line.match(/(\d+:\d+)\s+warning\s+(.*)/) || []
    if (message) {
      result.push({ path: currentPath, message })
    }
  }
})

const grouped = result.reduce((acc, { path, message }) => {
  if (!acc[path]) {
    acc[path] = []
  }
  acc[path].push(message)
  return acc
}, [])

console.log(grouped)

[
  {
    type: 'section',
    text: {
      type: 'plain_text',
      text: 'This is a plain text section block.',
    },
  }
]
