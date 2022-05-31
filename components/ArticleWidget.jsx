import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { graphCMSImageLoader } from '../util'
import { getRecentArticles, getSimilarArticles } from '../services'

const ArticleWidget = ({ categories, slug }) => {
  const [relatedArticles, setRelatedArticles] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarArticles(categories, slug).then((result) => {
        setRelatedArticles(result)
      })
    } else {
      getRecentArticles().then((result) => {
        setRelatedArticles(result)
      })
    }
  }, [slug])

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Articles' : 'Recent Articles'}
      </h3>
      {relatedArticles.map((article, index) => (
        <div key={index} className="flex, mb-4 w-full items-center">
          <div className="w-16 flex-none">
            <Image
              loader={graphCMSImageLoader}
              alt={article.title}
              height="60px"
              width="60px"
              unoptimized
              className="rounded-full align-middle"
              src={article.featured_image.url}
            />
          </div>
          <div className="ml-4 flex-grow ">
            <p className="font-xs text-gray-500">
              {moment(article.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link
              href={`/article/${article.slug}`}
              key={index}
              className="text-md"
            >
              {article.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArticleWidget
