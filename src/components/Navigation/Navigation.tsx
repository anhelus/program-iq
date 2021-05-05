import {Link} from "gatsby"
import React from "react"
import ThemeChanger from "../ThemeChanger"

const Navigation = () => {

	return (
		<nav className="navigation"> 
			<Link to="/blog">Blog</Link>
			<Link to="/teaching">Didattica</Link>
			{/* <Link to="/contact">Contattami</Link> */}
			<ThemeChanger />
		</nav>  
	)
}

export default Navigation;
