import React from 'react'
import { useRouter } from 'next/router'

import { getCategories, getCategoryArticle } from '../../services'
import { ArticleCard, Categories, Loader } from '../../components'

const CategoryArticle = ({ articles }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <>
      <div className="container mx-auto mb-8 px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            {articles.map((post, index) => (
              <ArticleCard key={index} article={article.node} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative top-8 lg:sticky">
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CategoryArticle

export async function getStaticProps({ params }) {
  const articles = await getCategoryArticle(params.slug)

  return {
    props: { articles },
  }
}

export async function getStaticPaths() {
  const categories = await getCategories()
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}
