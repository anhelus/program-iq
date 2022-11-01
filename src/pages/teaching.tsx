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
<<<<<<< Updated upstream
		title: "Computer Science (Italian)",
=======
		title: "Algoritmi e Linguaggi di Programmazione",
		location: "Università degli Studi di Foggia - DEMET",
    datetime: "A.A. 2022/2023"
	},
	{
		url: "https://python.angelocardellicchio.it",
		imgUrl: "/assets/python.png",
    imgCredits: "https://unsplash.com/photos/cYyqhdbJ9TI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
		title: "Python per il Calcolo Scientifico",
		location: "Università degli Studi di Bari - Dipartimento di Matematica",
    datetime: "A.A. 2021/2022"
>>>>>>> Stashed changes
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
                // location={course.location}
                // datetime={course.datetime}
              />
            })
          }
        </div>
      </div>
    </Layout>
  )
}

export default About;