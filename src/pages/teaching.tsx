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
		title: "Corso di Informatica",
		location: "Dipartimento di Matematica",
    datetime: "A.A. 2020/2021"
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
              return <CourseCard 
                url={course.url}
                imgUrl={course.imgUrl}
                imgCredits={course.imgCredits}
                title={course.title}
                location={course.location}
                datetime={course.datetime}
              />
            })
          }
        </div>
      </div>
    </Layout>
  )
}

export default About;