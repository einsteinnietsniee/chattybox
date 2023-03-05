import { useEffect, useReducer } from 'react'
import { onSnapshot, queryEqual, Query, DocumentData } from 'firebase/firestore'
import { useMemoCompare } from '../useMemoCompare'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'idle':
      return { status: 'idle', data: undefined, error: undefined }
    case 'loading':
      return { status: 'loading', data: undefined, error: undefined }
    case 'success':
      return { status: 'success', data: action.payload, error: undefined }
    case 'error':
      return { status: 'error', data: undefined, error: action.payload }
    default:
      throw new Error('invalid action')
  }
}

function useFirestoreQuery<T>(query: Query<T>) {
  const initialState = {
    status: query ? 'loading' : 'idle',
    data: undefined,
    error: undefined,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const queryCached = useMemoCompare(query, (prevQuery) => {
    return prevQuery && query && queryEqual(query, prevQuery)
  })

  useEffect(() => {
    if (!queryCached) {
      dispatch({ type: 'idle' })
      return
    }
    dispatch({ type: 'loading' })

    return onSnapshot(
      queryCached,
      (response) => {
        // Get data for collection or doc
        const data = response.docs ? getCollectionData(response) : getDocData(response)
        dispatch({ type: 'success', payload: data })
      },
      (error) => {
        dispatch({ type: 'error', payload: error })
      },
    )
  }, [queryCached]) // Only run effect if queryCached changes
  return state
}

function getDocData(doc: DocumentData) {
  return doc.exists === true ? { id: doc.id, ...doc.data() } : null
}

function getCollectionData(collection: any) {
  return collection.docs.map(getDocData)
}
