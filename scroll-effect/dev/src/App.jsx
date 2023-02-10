import React, { useRef, useState }                   from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';

import ny1   from './assets/ny-1.jpg';
import ny2   from './assets/ny-2.jpg';
import ny3   from './assets/ny-3.jpg';
import ny4   from './assets/ny-4.jpg';
import nyBg1 from './assets/ny-bg-1.jpg';
import nyBg2 from './assets/ny-bg-2.jpg';
import nyBg3 from './assets/ny-bg-3.jpg';
import nyBg4 from './assets/ny-bg-4.jpg';

const data = [
	{ id: 1, img: ny1, bgImg: nyBg1, linkLabel: '01' },
	{ id: 2, img: ny2, bgImg: nyBg2, linkLabel: '02' },
	{ id: 3, img: ny3, bgImg: nyBg3, linkLabel: '03' },
	{ id: 4, img: ny4, bgImg: nyBg4, linkLabel: '04' },
];

const Block = ({ item, active }) => {
	const imgRef = useRef(null);
	const { scrollYProgress } = useScroll();
	const y = useTransform(
		scrollYProgress,
		[0, 1],
		[0, -imgRef?.current?.offsetHeight + imgRef?.current?.offsetWidth],
	);

	return (
		<div
			key={item.id}
			id={`block${item.id}`}
			className={`block ${active === item.id ? 'active' : ''}`}
		>
			<div className="content">
				<motion.img ref={imgRef} style={{ y }} src={item.img} alt={item.linkLabel} />
			</div>
		</div>
	);
};

const App = () => {
	const containerRef = useRef(null);
	const [active, setActive] = useState(data[0].id);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, 'change', (value) => {
		const center = value + window.innerHeight / 2;

		data.forEach((item) => {
			const block = document.getElementById(`block${item.id}`);
			const itemTop = block.offsetTop;
			const itemBottom = itemTop + block.offsetHeight;

			if (itemTop <= center && itemBottom > center) {
				setActive(item.id);
			}
		});
	});

	const handleClickOnAnchor = e => {
		e.preventDefault();
		const href = e.target.getAttribute('href');
		document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<>
			<h1>The NY.</h1>
			{data.map(item => (
				<div
					className={`background ${active === item.id ? 'active' : ''}`}
					style={{ backgroundImage: `url(${item.bgImg})` }}
				/>
			))}
			<div className="sidebar">
				<ul>
					{data.map(item => (
						<li className={active === item.id ? 'active' : ''}>
							<a onClick={handleClickOnAnchor} href={`#block${item.id}`}>
								{item.linkLabel}
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className="container" ref={containerRef}>
				{data.map(item => (
					<Block item={item} active={active} />
				))}
			</div>
		</>
	);
};

export default App;
