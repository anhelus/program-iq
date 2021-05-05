import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { init } from 'ityped'

const HeroHeader = () => {

  React.useEffect(() => {
    const title = document.querySelector('#title');
    init(title, {
      strings: ['Benvenuto! Io sono Angelo.'],
      loop: false,
      placeholder: false,
      disableBackTyping: true,
    })
  }, [])


  const data = useStaticQuery(
    graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            home {
              title
              description
            }
          }
        }
      }
    `
  )
  return (
	<div className="hero-header">
    	<div id="title" className="headline" />
 	</div>
  )
  }

export default HeroHeader;
