import { Typography } from "@material-ui/core";
import { graphql, useStaticQuery } from "gatsby";
import React from "react"
import Helmet from 'react-helmet';
import SkillBadge from "../components/badges/SkillBadge";
import Layout from "../components/Layout";
import CTimeline from "../components/timeline/CTimeline";

const About = () => {

  const data = useStaticQuery(
    graphql`
      query AboutQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <Layout>
      <Helmet>
        <title>Chi sono — {data.site.siteMetadata.title}</title>
      </Helmet>
      <div style={{textAlign: "center", padding:"5vh 0", lineHeight: "1.5", fontSize: 18}}>
        <h1>
          Chi sono
        </h1>
        <div style={{textAlign: "justify"}}>
          <p>
            Il mio nome è Angelo, e mi 
          </p>
      </div>
        <h1>Il mio percorso, in breve...</h1>
        <CTimeline />
        <h1>Skill</h1>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <SkillBadge title="Python" skill={65} />
          <SkillBadge title="React" skill={74} />
        </div>
      </div>
    </Layout>
  )
}

export default About;