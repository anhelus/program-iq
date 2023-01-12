import CTimeline from "../components/timeline/CTimeline";
import Footer from "../components/Footer";
import Helmet from 'react-helmet';
import HeroHeader from '../components/HeroHeader'
import Layout from "../components/Layout"
import PostLink from "../components/PostLink"
import React from "react"
import SkillBadge from "../components/badges/SkillBadge";
import { graphql } from 'gatsby'

const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges },
  },
}) => {

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .filter(edge => edge.node.frontmatter.published)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      {/* <HeroHeader/> */}
	  <div style={{textAlign: "center", padding:"5vh 0", lineHeight: "1.5", fontSize: 18}}>
        <h1>Il mio percorso</h1>
        <CTimeline />
      </div>

    </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query indexPageQuery {
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
            published
          }
        }
      }
    }
  }
`
