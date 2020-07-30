import React, { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'

const LS_THEME_KEY = 'newsPanda.sources'

export default function Sources() {
  const [lsSubreddits, saveSubredditsToLs] = useLocalStorage(LS_THEME_KEY, ['technology', 'news'])

  const [subreddits, setSubreddits] = useState(lsSubreddits)

  return (
    <div>
      You can manage sources here.
    </div>
  )
}
