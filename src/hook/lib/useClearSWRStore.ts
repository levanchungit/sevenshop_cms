import * as React from 'react'
import { useSWRConfig } from 'swr'

export default function useClearSWRStore() {
  const { cache, mutate } = useSWRConfig()

  return React.useCallback(() => {
    const isTypeMap = cache instanceof Map
    if (!isTypeMap) throw new Error('matchMutate requires the cache provider to be a Map instance')
    const keys = Array.from(cache.keys())
    const mutations = keys.map(key => mutate(key, undefined))

    return Promise.all(mutations)
  }, [cache, mutate])
}
