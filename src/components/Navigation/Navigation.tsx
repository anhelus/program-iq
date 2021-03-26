import React from "react"
import {Link} from "gatsby"
import ThemeChanger from "../ThemeChanger"

const Navigation = () => (
  <nav className="navigation"> 
    <Link to="/about">Chi sono</Link>
    <Link to="/contact">Contattami</Link>
    <ThemeChanger />
  </nav>  
)

export default Navigation;
