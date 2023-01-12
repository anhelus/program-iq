import { Link } from 'gatsby';
import React from 'react';

interface ICourseCard {
	url: string;
	imgUrl: string;
	imgCredits: string;
	title: string;
	location: string;
	datetime: string;
}

const CourseCard: React.FC<ICourseCard> = ({url, imgUrl, title, description}) => {
	return (
		<article className="card">
			<Link to={url}>
				<img src={imgUrl} />
			</Link>
			<header>
				<h1 className="post-title">
					{title}
				</h1>
				<p>
					{description}
				</p>
			</header>
		</article>
	)
}

export default CourseCard;
