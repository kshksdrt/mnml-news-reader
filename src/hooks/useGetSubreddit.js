import { useReducer } from 'react'
import axios from 'axios';

const initialState = {
  stories: [],
  loading: true,
  error: false,
  errorMessage: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'making-request':
      return {
        ...state,
        stories: [],
        loading: true,
        error: false,
        errorMessage: ''
      }

    case 'stories-received':
      return {
        ...state,
        stories: action.payload.stories,
        loading: false,
        error: false,
        errorMessage: ''
      }

    case 'error':
      return {
        ...state,
        stories: [],
        loading: false,
        error: true,
        errorMessage: action.payload.error
      }

    case 'requesting-next-page':
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
      }

    case 'next-page-received':
      return {
        ...state,
        loading: false,
        stories: [...state.stories, ...action.payload.stories],
        error: false,
        errorMessage: ''
      }

    default:
      return state
  }
}

const BASE_URL = 'https://www.reddit.com/r'

export default function useGetSubbreddit() {
  const [state, dispatch] = useReducer(reducer, initialState)

  function api ({type, payload}) {
    switch (type) {
      case 'initial-load':
        onInitialLoad(dispatch, payload)
        break;
        
      case 'load-more':
        onLoadMore(dispatch, payload)
        break;
        
      default:
        return;
    }
  }

  return [state, api]
}

function onInitialLoad (dispatch, payload) {
  dispatch({type: 'making-request'})
  axios({
    method: 'get',
    url: `${BASE_URL}/${payload.subreddit}/hot/.json`,
    params: {
      limit: 15,
    }
  })
  .then(res => {
    let storiesRaw, stories
    if (res.data && res.data.data && res.data.data.children) storiesRaw = res.data.data.children
    if (storiesRaw) stories = storiesCompressor(storiesRaw)
    if (stories) dispatch({type: 'stories-received', payload: {stories}})
    if (!stories) dispatch({type: 'error', payload: {error: 'Cannot load posts'}})
  })
  .catch(error => {
    console.log(error)
    dispatch({type: 'error', payload: {error: 'Cannot load posts'}})
  })
}

function onLoadMore (dispatch, payload) {
  const y = window.scrollY
  dispatch({type: 'requesting-next-page'})
  axios({
    method: 'get',
    url: `${BASE_URL}/${payload.subreddit}/hot/.json`,
    params: {
      limit: 15,
      after: payload.after
    }
  })
  .then(res => {
    let storiesRaw, stories
    if (res.data && res.data.data && res.data.data.children) storiesRaw = res.data.data.children
    if (storiesRaw) stories = storiesCompressor(storiesRaw)
    if (stories) dispatch({type: 'next-page-received', payload: {stories}})
    if (!stories) dispatch({type: 'error', payload: {error: 'Cannot load posts'}})
  })
  .catch(error => {
    console.log(error)
    dispatch({type: 'error', payload: {error: 'Cannot load posts'}})
  })
  .finally(_ => window.scrollTo(0, y))
}

function storiesCompressor (stories) {
  return stories.map(each => {
    const { title, score, domain, url, permalink, created, name } = each.data
    const time = getReadableTime(Date.now() - (created * 1000))
    return { title, score, domain, url, permalink, time, name }
  })
}

function getReadableTime (ms) {
  const seconds = ( ms / 1000 ).toFixed(1)
  const minutes = ( ms / ( 1000 * 60 ) ).toFixed(1)
  const hours = ( ms / ( 1000 * 60 * 60 ) ).toFixed(1)
  const days = ( ms / ( 1000 * 60 * 60 * 24 ) ).toFixed(1)
  
  if (seconds < 60) return `${Math.floor(seconds)} seconds ago`
  if (minutes < 60) return `${Math.floor(minutes)} minutes ago`
  if (hours < 60) return `${Math.floor(hours)} hours ago`
  if (days < 60) return `${Math.floor(days)} days ago`
}
