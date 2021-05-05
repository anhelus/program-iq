import { Link } from 'gatsby';
import React from 'react';

interface ICard {
	url: string;
	imgUrl: string;
	title: string;
	info: string;
}

const Card: React.FC<ICard> = ({url, imgUrl, title, info}) => {
	return (
		<article className="card">
			<Link to={url}>
				<img src={imgUrl} />
			</Link>
			<header>
				<h2 className="post-title">
					{title}
				</h2>
				<div className="post-meta">
					{info}
				</div>
			</header>
		</article>
	)
}

export default Card;
