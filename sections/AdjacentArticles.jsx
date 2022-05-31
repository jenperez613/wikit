import React, { useState, useEffect } from 'react'

import { AdjacentArticleCard } from '../components'
import { getAdjacentArticles } from '../services'

const AdjacentArticles = ({ createdAt, slug }) => {
  const [adjacentArticle, setAdjacentArticle] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    getAdjacentArticles(createdAt, slug).then((result) => {
      setAdjacentArticle(result)
      setDataLoaded(true)
    })
  }, [slug])

  return (
    <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-8">
      {dataLoaded && (
        <>
          {adjacentArticle.previous && (
            <div
              className={`${
                adjacentArticle.next
                  ? 'col-span-1 lg:col-span-4'
                  : 'col-span-1 lg:col-span-8'
              } adjacent-article relative h-72 rounded-lg`}
            >
              <AdjacentArticleCard
                article={adjacentArticle.previous}
                position="LEFT"
              />
            </div>
          )}
          {adjacentArticle.next && (
            <div
              className={`${
                adjacentArticle.previous
                  ? 'col-span-1 lg:col-span-4'
                  : 'col-span-1 lg:col-span-8'
              } adjacent-article relative h-72 rounded-lg`}
            >
              <AdjacentArticleCard
                article={adjacentArticle.next}
                position="RIGHT"
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdjacentArticles
