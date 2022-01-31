import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BPrimary, BSecondary } from '../../../components/util/button/Button';
import get from '../../../api/get';
import './property.scss';
import { HPrimary } from '../../util/typography/Typography';
import Loader from '../../util/loader/Loader';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StraightenIcon from '@mui/icons-material/Straighten';

const Property = () => {
	const { id } = useParams();

	const [response, setResponse] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		get(`/properties/single/${id}`).then(data => {
			setResponse(data.data);
			setLoading(false);
		});
	}, [id]);

	return (
		<section className="property-section">
			{loading ? (
				<Loader fullScreen fullWidth />
			) : (
				<>
					<div className="image-grid">
						<div className="image-grid__btns">
							<BSecondary title={response.catagory} />
							<BSecondary title={response.status} />
						</div>

						<video
							controls
							autoPlay
							muted
							loop
							className="image-grid__image image-grid__image--1"
						>
							<source
								src={response.videos[0]?.url}
								type="video/mp4"
							/>
							there is no video :(
						</video>

						<img
							src={response.images[0]?.url}
							alt="property"
							className="image-grid__image image-grid__image--2"
						/>

						<img
							src={response.images[1]?.url}
							alt="property"
							className="image-grid__image image-grid__image--3"
						/>
					</div>

					<div>
						<div className="heading-section">
							<div className="heading-section_sub">
								<HPrimary title={response.title} />

								<h2 className="heading-section_addr">
									{response.address}
								</h2>
							</div>

							<Link
								to="/properties"
								className="heading-section_link"
							>
								<BPrimary
									title="Request a Call"
									type="submit"
								/>
							</Link>
						</div>
						<h1 className="pricing-section_heading">
							Pricing and Size
						</h1>
						<div className="pricing-section">
							<div className="pricing-section_item space">
								<div className="sell-icon">
									<LocalOfferIcon />
								</div>
								<h3 className="price">{response.price}</h3>
								<h3 className="special-price">
									{response.specialPrice}
								</h3>
							</div>
							<div className="pricing-section_item">
								<div className="sell-icon">
									<StraightenIcon />
								</div>
								<h3>
									{response.size} {response.unit}
								</h3>
							</div>
						</div>
						<h1 className="facilities-section_heading">
							Facilities
						</h1>
						<div className="facilities-section">
							<div className="facilities-section_item">
								<h3>BedRooms</h3> <h3>{response.bedroom}</h3>
							</div>
							<div className="facilities-section_item">
								<h3>Bathroom</h3> <h3>{response.bathroom}</h3>
							</div>
							<div className="facilities-section_item">
								<h3>Kitchen</h3> <h3>{response.kitchen}</h3>
							</div>
							<div className="facilities-section_item">
								<h3>Parking</h3> <h3>{response.parking}</h3>
							</div>
						</div>
						<div className="description-section">
							<h1>About</h1>
							<p>{response.description}</p>
						</div>

						{response?.documents.map((doc, i) => (
							<a href={doc.url} className="link" key={doc.key}>
								Download pdf {i + 1}
							</a>
						))}
					</div>
				</>
			)}
		</section>
	);
};

export default Property;
