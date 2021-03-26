import React from "react"
import Navigation from "../navigation"
import 'prismjs/themes/prism-okaidia.css';
import Footer from "../Footer";
import Title from "../Title";

const Layout = ({ children }) => {
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <Title />
        <Navigation />
      </header>
      {children}
      <Footer />
    </div>
  )
}

export default Layout;
