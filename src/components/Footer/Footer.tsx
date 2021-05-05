import React from 'react';

const Footer = () => {

    return (
        <footer className="site-footer">
            <p>
                &copy; {new Date().getFullYear()} Angelo Cardellicchio &bull; Creato con <span role="img" aria-label="love">❤️</span> con <a href="https://www.gatsbyjs.com/">Gatsby</a> e <a href="https://github.com/W3Layouts/gatsby-starter-delog">Delog</a>.
            </p>
        </footer>
    )
}

export default Footer;
