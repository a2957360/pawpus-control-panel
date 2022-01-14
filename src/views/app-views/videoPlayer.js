import React, { useEffect } from 'react';

export default function Media(father) {

	return (
		<>
			<video width="100%" height="100%" controls>
				<source src={father.src} t ype="video/mp4" />
				<source src={father.src} t ype="video/mov" />
				<source src={father.src} t ype="video/m4v" />
			</video>
		</>
	)
}