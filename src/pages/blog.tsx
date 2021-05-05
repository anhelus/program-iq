import Helmet from 'react-helmet';
import Layout from "../components/Layout"
import PostLink from "../components/PostLink"
import React from "react"
import { graphql } from 'gatsby'

const Blog = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .filter(edge => edge.node.frontmatter.published)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <h2>Blog &darr;</h2>
      <div className="grids">
        {Posts}
      </div>
    </Layout>
  )
}

export default Blog
export const pageQuery = graphql`
  query BlogQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
      			category
            published
          }
        }
      }
    }
  }
`
