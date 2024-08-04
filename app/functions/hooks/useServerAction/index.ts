import { useTransition } from 'react'

/** @see https://medium.com/@mguleryuz3/next-js-14-app-router-server-actions-with-react-usetransition-a-new-era-for-fullstack-2798e58bb793 */
export function useServerAction() {
  const [isPending, startTransition] = useTransition()

  async function serverAction<T>(action: () => Promise<T>) {
    let promise: Promise<T> | undefined

    startTransition(() => {
      promise = action()
    })

    const awaited = await promise!

    return awaited
  }

  return { isPending, serverAction }
}
