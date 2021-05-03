import Helmet from 'react-helmet';
import HeroHeader from '../components/HeroHeader'
import Layout from "../components/Layout"
import PostLink from "../components/PostLink"
import React from "react"
import { graphql } from 'gatsby'

const FinancePage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
	.filter(edge => edge.node.frontmatter.category === 'finance')
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <HeroHeader/>
      <h2>Finance &darr;</h2>
      <div className="grids">
        {Posts}
      </div>
    </Layout>
  )
}

export default FinancePage
export const pageQuery = graphql`
  query FinancePageQuery {
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
          }
        }
      }
    }
  }
`
