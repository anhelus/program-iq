import { graphql, useStaticQuery } from "gatsby";

import Card from "../components/ui/Card";
import Helmet from 'react-helmet';
import Layout from "../components/Layout";
import React from "react"

const courses = [
	{
		url: "https://informatica.angelocardellicchio.it",
		imgUrl: "/assets/computer-vision.jpg",
		title: "Informatica - Dipartimento di Matematica - UniBa",
		info: "A.A. 2020/2021"
	}
]

const About = () => {

  const data = useStaticQuery(
    graphql`
      query TeachingQuery {
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
        <title>Didattica — {data.site.siteMetadata.title}</title>
      </Helmet>
      <div style={{textAlign: "center", padding:"5vh 0", lineHeight: "1.5", fontSize: 18}}>
        <h1>
          Didattica
        </h1>
		<div className="grids">
			{
				courses.map(course => {
					return <Card 
						url={course.url}
						imgUrl={course.imgUrl}
						title={course.title}
						info={course.info}
					/>
				})
			}
		</div>
      </div>
    </Layout>
  )
}

export default About;