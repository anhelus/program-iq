import { graphql, useStaticQuery } from "gatsby";

import CourseCard from "../components/ui/CourseCard";
import Helmet from 'react-helmet';
import Layout from "../components/Layout";
import React from "react"

const courses = [
	{
		url: "https://informatica.angelocardellicchio.it",
		imgUrl: "/assets/informatica.jpg",
    imgCredits: "https://unsplash.com/photos/cYyqhdbJ9TI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
		title: "Algoritmi e Linguaggi di Programmazione Python/C",
    description: "Corso tenuto per il CdLM in Innovazione Digitale e Comunicazione dell'Università degli Studi di Foggia."
	},
	{
		url: "https://python.angelocardellicchio.it",
		imgUrl: "/assets/python.png",
    imgCredits: "https://unsplash.com/photos/cYyqhdbJ9TI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
		title: "Python per il Calcolo Scientifico",
    description: "Corso di competenze trasversali tenuto per il CdL in Matematica dell'Università degli Studi di Bari."
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
        <title>Teaching — {data.site.siteMetadata.title}</title>
      </Helmet>
      <div style={{textAlign: "center", padding:"5vh 0", lineHeight: "1.5", fontSize: 18}}>
        <h1>
          Teaching
        </h1>
        <div className="grids">
          {
            courses.map(course => {
              return <CourseCard 
                url={course.url}
                imgUrl={course.imgUrl}
                imgCredits={course.imgCredits}
                title={course.title}
                description={course.description}
              />
            })
          }
        </div>
      </div>
    </Layout>
  )
}

export default About;