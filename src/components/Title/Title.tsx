import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';

const Title = () => {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                    title
                    }
                }
            }
        `
    )

    return (
        <div className='site-title'>
            <Link to='/'>{data.site.siteMetadata.title}</Link>
        </div>
    )
}

export default Title;
