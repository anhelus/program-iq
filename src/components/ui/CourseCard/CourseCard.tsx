import { Link } from 'gatsby';
import React from 'react';
import PhotoIcon from '@material-ui/icons/Photo';

interface ICourseCard {
	url: string;
	imgUrl: string;
	imgCredits: string;
	title: string;
	location: string;
	datetime: string;
}

const CourseCard: React.FC<ICourseCard> = ({url, imgUrl, title, location, datetime}) => {
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
					{`${location} - ${datetime}`}
					<br />
					Immagine di <a href="https://unsplash.com/@radowanrehan?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Radowan Nakif Rehan</a> - <a href="https://unsplash.com/s/photos/computer-science?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
				</div>
			</header>
		</article>
	)
}

export default CourseCard;
