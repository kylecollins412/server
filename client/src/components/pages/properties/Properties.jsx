import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

import { HSecondary, SSecondary } from '../../util/typography/Typography';
import get from '../../../api/get';
import Loader from '../../util/loader/Loader';

import HotelIcon from '@mui/icons-material/Hotel';
import ShowerIcon from '@mui/icons-material/Shower';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import MapIcon from '@mui/icons-material/Map';

import '../home/properties/properties.scss';

const Properties = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const searchQuery =
		// this will check if search query is present only than convert it to lower case
		searchParams.get('s') && searchParams.get('s').toLowerCase();

	const [response, setResponse] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		get('/properties/all').then(data => {
			// search functionality
			if (searchQuery) {
				const fileteredData = data.data.filter(
					property =>
						property.title.toLowerCase().includes(searchQuery) ||
						property.description
							.toLowerCase()
							.includes(searchQuery) ||
						property.address.toLowerCase().includes(searchQuery) ||
						property.type.toLowerCase().includes(searchQuery) ||
						property.catagory.toLowerCase().includes(searchQuery) ||
						property.status.toLowerCase().includes(searchQuery) ||
						property.price.includes(searchQuery) ||
						property.specialPrice.includes(searchQuery) ||
						property.size.includes(searchQuery)
				);
				// redirect to 404 page if no data found
				if (fileteredData.length === 0) return navigate('/404');
				setResponse(fileteredData);
			} else {
				setResponse(data.data);
			}
			setLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	return (
		<>
			{loading ? (
				<Loader fullScreen />
			) : (
				<section className="properties-section">
					<div className="properties-section__properties">
						{response.map(property => (
							<Link
								to={`/properties/${property._id}`}
								key={property._id}
							>
								<div className="properties-section__property">
									{/* Image */}
									<div className="properties-section__property-image">
										<img
											src={property.images[0]?.url}
											alt="property"
										/>
									</div>

									{/* Mains */}
									<HSecondary
										title={property.title}
										className="properties-section__property-title"
									/>

									<h4 className="properties-section__property-price">
										₹ {property.price}
									</h4>

									<SSecondary
										title={property.description}
										className="properties-section__property-description"
									/>

									{/* IconsBar */}
									<div className="properties-section__property-iconbar">
										<div className="properties-section__property-iconbar-icon">
											<HotelIcon />
											<h4>{property.bedroom}</h4>
										</div>
										<div className="properties-section__property-iconbar-icon">
											<ShowerIcon />
											<h4>{property.bathroom}</h4>
										</div>
										<div className="properties-section__property-iconbar-icon">
											<CarRepairIcon />
											<h4>{property.parking}</h4>
										</div>
										<div className="properties-section__property-iconbar-icon">
											<MapIcon />
											<h4>
												{property.size} {property.unit}
											</h4>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>
			)}
		</>
	);
};

export default Properties;
