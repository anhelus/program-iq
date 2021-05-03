import {Link} from "gatsby"
import React from "react"
import ThemeChanger from "../ThemeChanger"

const Navigation = () => {

	const [isShown, setIsShown] = React.useState(false);

	return (
		<nav className="navigation"> 
			<Link to="/about">Chi sono</Link>
			<Link to="/contact">Contattami</Link>
			<button
				onClick={() => setIsShown(!isShown)}
			>
				Post
			</button>
			{
				isShown && (
				<div style={{flexDirection: 'column'}}>
					<Link to="/ml">Machine Learning</Link>
					<Link to="/finance">Finanza</Link>
				</div>
			)}
			<ThemeChanger />
		</nav>  
	)
}

export default Navigation;
