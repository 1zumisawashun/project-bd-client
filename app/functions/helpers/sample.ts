/* eslint-disable react-hooks/rules-of-hooks */

const useMutation = ({ refetchQueries }: { refetchQueries: unknown }) => {
  console.log(refetchQueries)
  return [null]
}

const id1 = 'id1'
const id2 = 'id2'

/**
 * ==============================
 * 通常のパターン
 * ==============================
 */
export const [mutation1] = useMutation({
  refetchQueries: [
    {
      query: null,
      variables: { id1 }, // satisfiesを強制したい
    },
    {
      query: null,
      variables: { id2 }, // satisfiesを強制したい
    },
  ],
})

/**
 * ==============================
 * refetchQueriesの配列を変数に切り出しているパターン
 * ==============================
 */
const refetchQueries = [
  {
    query: null,
    variables: { id1 }, // satisfiesを強制したい
  },
  {
    query: null,
    variables: { id2 }, // satisfiesを強制したい
  },
]
export const [mutation2] = useMutation({
  refetchQueries,
})

/**
 * ==============================
 * refetchQueriesのオブジェクトを変数に切り出しているパターン
 * ==============================
 */
const refetchQuery = {
  query: null,
  variables: { id1 }, // satisfiesを強制したい
}
const refetchQuery2 = {
  query: null,
  variables: { id2 }, // satisfiesを強制したい
}
export const [mutation3] = useMutation({
  refetchQueries: [refetchQuery, refetchQuery2],
})

/**
 * ==============================
 * refetchQueriesのオブジェクトを変数に切り出しているパターン
 * ==============================
 */
const variables = { id1 } // satisfiesを強制したい
const variables2 = { id2 } // satisfiesを強制したい

const refetchQuery3 = {
  query: null,
  variables,
}
const refetchQuery4 = {
  query: null,
  variables: variables2, // satisfiesを強制したい
}
export const [mutation4] = useMutation({
  refetchQueries: [refetchQuery3, refetchQuery4],
})
