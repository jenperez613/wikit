import { FeaturedArticles } from '../sections'
import { ArticleCard, Categories, ArticleWidget } from '../components'
import { getArticles } from '../services'

export default function Home({ articles }) {
  return (
    <div className="container mx-auto mb-8 px-10">
      <FeaturedArticles />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <ArticleWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const articles = (await getArticles()) || []
  return {
    props: { articles },
  }
}
