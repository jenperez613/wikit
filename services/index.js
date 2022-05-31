import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getArticles = async () => {
  const query = gql`
    query MyQuery {
      articlesConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featured_image {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.articlesConnection.edges
}

export const getArticleDetails = async (slug) => {
  const query = gql`
    query GetArticleDetails($slug: String!) {
      article(where: { slug: $slug }) {
        title
        excerpt
        featured_image {
          url
        }
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          html
        }
        categories {
          name
          slug
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.article
}

export const getSimilarArticles = async (categories, slug) => {
  const query = gql`
    query GetArticleDetails($slug: String!, $categories: [String!]) {
      articles(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featured_image {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug, categories })

  return result.articles
}

export const getAdjacentArticles = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentArticles($createdAt: DateTime!, $slug: String!) {
      next: articles(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featured_image {
          url
        }
        createdAt
        slug
      }
      previous: articles(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featured_image {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug, createdAt })

  return { next: result.next[0], previous: result.previous[0] }
}

export const getCategoryArticle = async (slug) => {
  const query = gql`
    query GetCategoryArticle($slug: String!) {
      articlesConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featured_image {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.articlesConnection.edges
}

export const getFeaturedArticles = async () => {
  const query = gql`
        query GetCategoryArticle() {
            articles(where: {featuredArticle: true}) {
                author {
                    name
                    photo {
                        url
                    }
                }
                featured_image {
                    url
                }
                title
                slug
                createdAt
            }
        }
    `

  const result = await request(graphqlAPI, query)

  return result.articles
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.categories
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json()
}

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { article: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.comments
}

export const getRecentArticles = async () => {
  const query = gql`
        query GetArticleDetails() {
            articles(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featured_image {
                    url
                }
                createdAt
                slug
            }
        }
    `
  const result = await request(graphqlAPI, query)

  return result.articles
}
