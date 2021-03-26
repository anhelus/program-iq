import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { init } from 'ityped'

const HeroHeader = () => {

  React.useEffect(() => {
    const title = document.querySelector('#title');
    init(title, {
      strings: ['Benvenuto su Program IQ - Sito in costruzione'],
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
    {/* <div id="title"></div> */}
    {/* <div 
      className="primary-content" 
      dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.home.description}}
    /> */}
    {/* <Link to='/contact' className="button -primary">Get in touch &rarr;</Link> */}
  </div>

  )
  }

export default HeroHeader;
