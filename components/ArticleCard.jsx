import React from 'react'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'

import { graphCMSImageLoader } from '../util'

const ArticleCard = ({ article }) => (
  <div className="mb-8 rounded-lg bg-white p-0 pb-12 shadow-lg lg:p-8">
    {/*<div className="relative mb-6 overflow-hidden pb-80 shadow-md">
      <Image
          unoptimized
          loader={graphCMSImageLoader}
        src={article.featured_image.url}
        alt={article.title}
          layout="fill"
        className="absolute h-80 w-full rounded-t-lg object-cover object-top shadow-lg lg:rounded-lg"
      />
    </div>*/}
    <div className="relative mb-6 overflow-hidden pb-80 shadow-md">
      <img
        src={article.featured_image.url}
        alt=""
        className="absolute h-80 w-full rounded-t-lg object-cover object-top shadow-lg lg:rounded-lg"
      />
    </div>

    <h1 className="mb-8 cursor-pointer text-center text-3xl font-semibold transition duration-700 hover:text-pink-600">
      <Link href={`/article/${article.slug}`}>{article.title}</Link>
    </h1>
    <div className="mb-8 block w-full items-center justify-center text-center lg:flex">
      <div className="mb-4 mr-8 flex w-full items-center justify-center lg:mb-0 lg:w-auto">
        <Image
          unoptimized
          loader={graphCMSImageLoader}
          alt={article.author.name}
          height="30 px"
          width="30 px"
          className="rounded-full align-middle"
          src={article.author.photo.url}
        />
        <p className="ml-2 inline align-middle text-lg font-medium text-gray-700">
          {article.author.name}
        </p>
      </div>
      <div className="font-medium text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 inline h-6 w-6 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="align-middle">
          {moment(article.createdAt).format('MMM DD, YYYY')}
        </span>
      </div>
    </div>
    <p className="mb-8 px-4 text-center text-lg font-normal text-gray-700 lg:px-20">
      {article.excerpt}
    </p>
    <div className="text-center">
      <Link href={`/article/${article.slug}`}>
        <span className="inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1">
          Continue reading
        </span>
      </Link>
    </div>
  </div>
)

export default ArticleCard
