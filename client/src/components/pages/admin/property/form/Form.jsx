/* eslint-disable array-callback-return */
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BPrimary, BUpload } from '../../../../util/button/Button';
import { ASuccess, AError } from '../../../../util/alert/Alert';
import { CheckBox } from '../../../../util/input/Input';
import DeleteIcon from '@mui/icons-material/Delete';

import './form.scss';
import { postFile } from '../../../../../api/post';
import { Helmet } from 'react-helmet-async';

const Form = () => {
	/* --------------------------------- ANCHOR States --------------------------------- */
	const [property, setProperty] = useState({
		title: '',
		description: '',
		price: '',
		specialPrice: '',
		type: '',
		security: '',
		maintenance: '',
		category: '',
		status: '',
		size: '',
		unit: '',
		bedroom: 0,
		bathroom: 0,
		openParking: 0,
		closeParking: 0,
		livingRoom: 0,
		dinningRoom: 0,
		store: 0,
		poojaRoom: 0,
		balcony: 0,
		floor: '',
		direction: '',
		kitchen: 0,
		lobby: 0,
		address: '',
		location: '',
		locality: '',
		featured: false,
		owner: '',
		ownerContact: '',
		commission: 0,
		age: 0,
		possession: '',
		purchaseType: '',
		constructionStatus: '',
	});
	const [otherFeatures, setOtherFeatures] = useState([]);
	const [furnishingDetails, setFurnishingDetails] = useState({});
	const [facilities, setFacilities] = useState([]);
	const [images, setImages] = useState([]);
	const [videos, setVideos] = useState([]);
	const [documents, setDocuments] = useState([]);

	const [loading, setLoading] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const body = new FormData();

	/* -------------------------- ANCHOR submit handler ------------------------- */
	const submitHandler = e => {
		e.preventDefault();
		setLoading(true);

		// append data to body to send
		for (const key in property) {
			body.append(key, property[key]);
		}

		// append image to body in array
		for (let img in images) {
			body.append('images', images[img]);
		}

		// append video to body
		for (let video in videos) {
			body.append('videos', videos[video]);
		}

		// append documents to body
		for (let doc in documents) {
			body.append('documents', documents[doc]);
		}

		// append other Features to body
		for (let feature in otherFeatures) {
			body.append('otherFeatures', otherFeatures[feature]);
		}

		// append Facilities to body
		for (let facility in facilities) {
			body.append('facilities', facilities[facility]);
		}

		// append furnishing details to body

		body.append(
			'furnishingDetails',
			JSON.stringify(furnishingDetails ? furnishingDetails : {})
		);

		// post to server
		postFile('/properties/add', body).then(data => {
			setLoading(false);

			if (data.success) {
				setOpenSuccess(true);
				setSuccessMessage(data.message);
			} else {
				setOpenError(true);
				setErrorMessage(data.message);
			}
		});
	};

	/* --------------------------------- ANCHOR Checkbox handler --------------------------------- */
	/**
	 * Checkbox handler
	 * @param {boolean} checked If checkbox is checked: `true` or unchecked: `false`
	 * @param {string} title The title of the facility
	 * @param {string} icon Icon which will be used for facility should be same as icon name in file system
	 * @return {Function} Function used by onChange event of checkbox
	 */
	const checkboxHandler = (checked, title, icon) => {
		if (checked && !facilities.includes({ title, icon })) {
			setFacilities(prevState => [
				...prevState,
				JSON.stringify({
					title,
					icon,
				}),
			]);
		} else {
			setFacilities(prevState =>
				prevState.filter(item => JSON.parse(item).title !== title)
			);
		}
	};

	return (
		<section>
			<Helmet>
				<meta name="robots" content="noindex" />
			</Helmet>

			<form onSubmit={submitHandler} className="admin-property-form">
				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Title"
					fullWidth
					required
					onChange={e =>
						setProperty({ ...property, title: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Description"
					fullWidth
					required
					multiline
					onChange={e =>
						setProperty({
							...property,
							description: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Address"
					required
					fullWidth
					onChange={e =>
						setProperty({ ...property, address: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Locality"
					required
					fullWidth
					onChange={e =>
						setProperty({ ...property, locality: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Location"
					helperText="Paste google maps url here"
					fullWidth
					onChange={e =>
						setProperty({ ...property, location: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Owner"
					required
					fullWidth
					onChange={e =>
						setProperty({ ...property, owner: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Owner Contact"
					required
					fullWidth
					onChange={e =>
						setProperty({
							...property,
							ownerContact: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Website Commission"
					required
					fullWidth
					onChange={e =>
						setProperty({ ...property, commission: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Other Features"
					helperText="Separate with enter"
					fullWidth
					multiline
					onChange={e => setOtherFeatures(e.target.value.split('\n'))}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Price"
					type="number"
					required
					onChange={e =>
						setProperty({ ...property, price: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Special Price"
					type="number"
					onChange={e =>
						setProperty({
							...property,
							specialPrice: e.target.value,
						})
					}
				/>

				<FormControl className="admin-property-form__select">
					<InputLabel>Type</InputLabel>
					<Select
						required
						label="Type"
						value={property.type}
						onChange={e =>
							setProperty({ ...property, type: e.target.value })
						}
					>
						<MenuItem value="Rental">Rental</MenuItem>
						<MenuItem value="Sale">Sale</MenuItem>
						<MenuItem value="PG">PG</MenuItem>
					</Select>
				</FormControl>

				{(property.type === 'Rental' || property.type === 'PG') && (
					<>
						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Security"
							onChange={e =>
								setProperty({
									...property,
									security: e.target.value,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Maintenance"
							onChange={e =>
								setProperty({
									...property,
									maintenance: e.target.value,
								})
							}
						/>
					</>
				)}

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Size"
					type="number"
					required
					onChange={e =>
						setProperty({ ...property, size: e.target.value })
					}
				/>

				<FormControl className="admin-property-form__select">
					<InputLabel>Unit</InputLabel>
					<Select
						required
						label="Unit"
						value={property.unit}
						onChange={e =>
							setProperty({ ...property, unit: e.target.value })
						}
					>
						<MenuItem value={'Sq. Ft.'}>Sq. Ft</MenuItem>
						<MenuItem value={'Acre'}>Acre</MenuItem>
						<MenuItem value={'Gaj'}>Gaj</MenuItem>
						<MenuItem value={'Marla'}>Marla</MenuItem>
						<MenuItem value={'Bigha'}>Bigha</MenuItem>
						<MenuItem value={'Bigha-Pucca'}>Bigha-Pucca</MenuItem>
						<MenuItem value={'Bigha-Kachha'}>Bigha-Kachha</MenuItem>
						<MenuItem value={'Bigha-Kachha'}>Bigha-Kachha</MenuItem>
						<MenuItem value={'Biswa'}>Biswa</MenuItem>
						<MenuItem value={'Biswa'}>Biswa</MenuItem>
						<MenuItem value={'Biswa-Pucca'}>Biswa-Pucca</MenuItem>
						<MenuItem value={'Kanal'}>Kanal</MenuItem>
						<MenuItem value={'Killa'}>Killa</MenuItem>
						<MenuItem value={'Kattha'}>Kattha</MenuItem>
						<MenuItem value={'Ghumaon'}>Ghumaon</MenuItem>
					</Select>
				</FormControl>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Floor"
					onChange={e =>
						setProperty({ ...property, floor: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Bedrooms"
					type="number"
					onChange={e =>
						setProperty({ ...property, bedroom: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Bathroom"
					type="number"
					onChange={e =>
						setProperty({ ...property, bathroom: e.target.value })
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Kitchen"
					type="number"
					onChange={e =>
						setProperty({ ...property, kitchen: e.target.value })
					}
				/>

				{(property.type === 'Rental' || property.type === 'Sale') && (
					<>
						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Living Room"
							type="number"
							onChange={e =>
								setProperty({
									...property,
									livingRoom: e.target.value,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Lobby"
							type="number"
							onChange={e =>
								setProperty({
									...property,
									lobby: e.target.value,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Dinning Room"
							type="number"
							onChange={e =>
								setProperty({
									...property,
									dinningRoom: e.target.value,
								})
							}
						/>
						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Store Room"
							type="number"
							onChange={e =>
								setProperty({
									...property,
									store: e.target.value,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Pooja Room"
							type="number"
							onChange={e =>
								setProperty({
									...property,
									poojaRoom: e.target.value,
								})
							}
						/>
						
					</>
				)}
				{(property.type === 'Sale') && (
					<>
						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Property Age"
							onChange={e =>
								setProperty({
									...property,
									age: e.target.value,
								})
							}
						/>
					</>
				)}

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Open Parking"
					type="number"
					onChange={e =>
						setProperty({
							...property,
							openParking: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Covered Parking"
					type="number"
					onChange={e =>
						setProperty({
							...property,
							closeParking: e.target.value,
						})
					}
				/>

				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Balcony"
					type="number"
					onChange={e =>
						setProperty({ ...property, balcony: e.target.value })
					}
				/>
				{/* backend still required */}
			
				<TextField
					className="admin-property-form__input"
					variant="outlined"
					label="Possession"
					onChange={e =>
						setProperty({ ...property, possession: e.target.value })
					}
				/>

				<br />

				{/* -------------------------------- ANCHOR Drop Down -------------------------------  */}

				<FormControl className="admin-property-form__select">
					<InputLabel>category</InputLabel>
					<Select
						required
						label="category"
						value={property.category}
						onChange={e =>
							setProperty({
								...property,
								category: e.target.value,
							})
						}
					>
						<MenuItem value="Residential Apartment">
							Residential Apartment
						</MenuItem>

						<MenuItem value="Independent House/Villa">
							Independent House/Villa
						</MenuItem>

						<MenuItem value="Plot">Plot</MenuItem>

						<MenuItem value="Commercial Office">
							Commercial Office
						</MenuItem>

						<MenuItem value="Commercial Office">
							Commercial Plot
						</MenuItem>

						<MenuItem value="Serviced Apartments">
							Serviced Apartments
						</MenuItem>

						<MenuItem value="1 RK/ Studio Apartment">
							1 RK/ Studio Apartment
						</MenuItem>

						<MenuItem value="Independent/Builder Floor">
							Independent/Builder Floor
						</MenuItem>

						<MenuItem value="Other">Other</MenuItem>
					</Select>
				</FormControl>

				<FormControl className="admin-property-form__select">
					<InputLabel>Status</InputLabel>
					<Select
						required
						label="Status"
						value={property.status}
						onChange={e =>
							setProperty({ ...property, status: e.target.value })
						}
					>
						<MenuItem value="Unfurnished">Unfurnished</MenuItem>
						<MenuItem value="Semifurnished">Semifurnished</MenuItem>
						<MenuItem value="Furnished">Furnished</MenuItem>
					</Select>
				</FormControl>

				<FormControl className="admin-property-form__select">
					<InputLabel>Featured</InputLabel>
					<Select
						required
						label="Featured"
						value={property.featured}
						onChange={e =>
							setProperty({
								...property,
								featured: e.target.value,
							})
						}
					>
						<MenuItem value={true}>True</MenuItem>
						<MenuItem value={false}>False</MenuItem>
					</Select>
				</FormControl>

				<FormControl className="admin-property-form__select">
					<InputLabel>Direction</InputLabel>
					<Select
						required
						label="Direction"
						value={property.direction}
						onChange={e =>
							setProperty({
								...property,
								direction: e.target.value,
							})
						}
					>
						<MenuItem value="North">North</MenuItem>
						<MenuItem value="South">South</MenuItem>
						<MenuItem value="East">East</MenuItem>
						<MenuItem value="West">West</MenuItem>
						<MenuItem value="North-East">North-East</MenuItem>
						<MenuItem value="North-West">North-West</MenuItem>
						<MenuItem value="South-East">South-East</MenuItem>
						<MenuItem value="South-West">South-West</MenuItem>
					</Select>
				</FormControl>
				<FormControl className="admin-property-form__select">
					<InputLabel>Purchase Type</InputLabel>
					<Select
						required
						label="Purchase Type"
						value={property.purchaseType}
						onChange={e =>
							setProperty({
								...property,
								purchaseType: e.target.value,
							})
						}
					>
						<MenuItem value="New Booking">New Booking</MenuItem>
						<MenuItem value="Resale">Resale</MenuItem>
					</Select>
				</FormControl>
				<FormControl className="admin-property-form__select">
					<InputLabel>Construction Status</InputLabel>
					<Select
						required
						label="Construction Status"
						value={property.constructionStatus}
						onChange={e =>
							setProperty({
								...property,
								constructionStatus: e.target.value,
							})
						}
					>
						<MenuItem value="Under Construction">
							Under Construction
						</MenuItem>
						<MenuItem value="Ready to Move">Ready to Move</MenuItem>
					</Select>
				</FormControl>

				<br />

				{/*  --------------------------- ANCHOR Furnishing Details --------------------------- */}
				{(property.status === 'Furnished' ||
					property.status === 'Semifurnished') && (
					<>
						<h1>
							Add Furnishing Details (Add amount of things eg:-
							fans = 5)
						</h1>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="AC"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									ac: e.target.value ? e.target.value : 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="stove"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									stove: e.target.value ? e.target.value : 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Modular Kitchen"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									modularKitchen: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Fans"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									fans: e.target.value ? e.target.value : 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Fridge"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									fridge: e.target.value ? e.target.value : 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Light"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									light: e.target.value ? e.target.value : 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Bed"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									beds: e.target.value ? e.target.value : 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="microwave"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									microwave: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="dinning table"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									dinningTable: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="TV"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									tv: e.target.value ? e.target.value : 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Dressing Table"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									dressingTable: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="TV Wall Panel"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									tvWallPanel: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="wardrobe"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									wardrobe: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="washing machine"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									washingMachine: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Geyser"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									geyser: e.target.value ? e.target.value : 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Curtains"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									curtains: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Sofa"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									sofa: e.target.value ? e.target.value : 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="water purifier"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									waterPurifier: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>

						<TextField
							className="admin-property-form__input"
							variant="outlined"
							label="Exhaust"
							type="number"
							onChange={e =>
								setFurnishingDetails({
									...furnishingDetails,
									exhaust: e.target.value
										? e.target.value
										: 0,
								})
							}
						/>
					</>
				)}

				{/* /* ------------------------------- ANCHOR Facilities -------------------------------  */}
				<h1>Choose Facilities From The Following </h1>
				<div className="admin-property-form__facilities">
					<CheckBox
						label="Fire/Security Alarm"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Fire/Security Alarm',
								'alarm.png'
							)
						}
					/>

					<CheckBox
						label="Power Backup"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Power Backup',
								'power-backup.png'
							)
						}
					/>

					<CheckBox
						label="Intercome"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Intercome',
								'intercome.png'
							)
						}
					/>

					<CheckBox
						label="Lift"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Lift',
								'lift.png'
							)
						}
					/>

					<CheckBox
						label="Maintenance Staff"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Maintenance Staff',
								'maintenance.png'
							)
						}
					/>

					<CheckBox
						label="Park"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Park',
								'park.png'
							)
						}
					/>

					<CheckBox
						label="Swimming Pool"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Swimming Pool',
								'swimming-pool.png'
							)
						}
					/>

					<CheckBox
						label="Gym"
						onChange={e =>
							checkboxHandler(e.target.checked, 'Gym', 'gym.png')
						}
					/>

					<CheckBox
						label="Market"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Market',
								'market.png'
							)
						}
					/>

					<CheckBox
						label="Water Storage"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Water Storage',
								'water-tank.png'
							)
						}
					/>

					<CheckBox
						label="Piped Gas"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Piped Gas',
								'piped-gas.png'
							)
						}
					/>

					<CheckBox
						label="Visitor Parking"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Visitor Parking',
								'parking.png'
							)
						}
					/>

					<CheckBox
						label="Water supply 24/7"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Water supply 24/7',
								'water.png'
							)
						}
					/>

					<CheckBox
						label="Security Guard"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Security Guard',
								'security-guard.png'
							)
						}
					/>

					<CheckBox
						label="CCTV"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'CCTV',
								'cctv.png'
							)
						}
					/>

					<CheckBox
						label="Gated Society"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Gated Society',
								'gate.png'
							)
						}
					/>

					<CheckBox
						label="Street Light"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Street Light',
								'street-light.png'
							)
						}
					/>

					<CheckBox
						label="CCTV"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'CCTV',
								'cctv.png'
							)
						}
					/>

					<CheckBox
						label="Gated Society"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Gated Society',
								'gate.png'
							)
						}
					/>

					<CheckBox
						label="Street Light"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Street Light',
								'street-light.png'
							)
						}
					/>

					<CheckBox
						label="WiFi"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'WiFi',
								'wifi.png'
							)
						}
					/>
					<CheckBox
						label="Club House"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Club House',
								'club-house.png'
							)
						}
					/>

					<CheckBox
						label="STP"
						onChange={e =>
							checkboxHandler(e.target.checked, 'STP', 'STP.png')
						}
					/>

					<CheckBox
						label="Ceiling Light"
						onChange={e =>
							checkboxHandler(
								e.target.checked,
								'Ceiling Light',
								'ceiling-light.png'
							)
						}
					/>
				</div>

				{/*   ----------------------------- ANCHOR Upload Buttons ----------------------------- */}
				<h1>Choose your files</h1>
				<BUpload
					title="Image"
					className="admin-property-form__upload-btn"
					onChange={e => setImages([...images, ...e.target.files])}
					accept="image/*"
				/>

				{images.map((img, i) => {
					if (img instanceof File) {
						const objectURL = URL.createObjectURL(img);
						return (
							<div
								className="admin-property-form__preview-container"
								key={i}
							>
								<img
									className="admin-property-form__preview"
									src={objectURL}
									alt="can't preview"
								/>
								{/* Delete Image from preview */}

								<BPrimary
									title={<DeleteIcon />}
									onClick={() =>
										setImages(
											images.filter(
												(_, index) => index !== i
											)
										)
									}
								/>
							</div>
						);
					}
				})}

				<br />

				<BUpload
					title="Videos"
					className="admin-property-form__upload-btn"
					onChange={e => setVideos([...videos, ...e.target.files])}
					accept="video/*"
				/>

				{/* Video Preview */}

				{videos.map((vid, i) => {
					if (vid instanceof File) {
						const objectURL = URL.createObjectURL(vid);
						return (
							<div
								className="admin-property-form__preview-container"
								key={i}
							>
								<video
									controls
									autoPlay
									muted
									loop
									className="admin-property-form__preview"
								>
									<source src={objectURL} type="video/mp4" />
								</video>

								{/* Delete Video from preview */}
								<BPrimary
									title={<DeleteIcon />}
									onClick={() =>
										setVideos(
											videos.filter(
												(_, index) => index !== i
											)
										)
									}
								/>
							</div>
						);
					}
				})}

				<br />

				<BUpload
					title="Documents"
					className="admin-property-form__upload-btn"
					onChange={e =>
						setDocuments([...documents, ...e.target.files])
					}
					accept="application/pdf"
				/>

				{/* Pdf Preview */}

				{documents.map((doc, i) => {
					if (doc instanceof File) {
						const objectURL = URL.createObjectURL(doc);
						return (
							<div
								className="admin-property-form__preview-container"
								key={i}
							>
								<iframe
									src={objectURL}
									title={objectURL}
									height="200"
									width="300"
								></iframe>

								{/* Delete PDF from preview */}
								<BPrimary
									title={<DeleteIcon />}
									onClick={() =>
										setDocuments(
											documents.filter(
												(_, index) => index !== i
											)
										)
									}
								/>
							</div>
						);
					}
				})}

				<br />

				<ASuccess
					title={successMessage}
					open={openSuccess}
					setOpen={setOpenSuccess}
				/>

				<AError
					title={errorMessage}
					open={openError}
					setOpen={setOpenError}
				/>

				<BPrimary
					title="Submit"
					className="admin-property-form__submit-btn"
					type="submit"
					loading={loading}
				/>
			</form>
		</section>
	);
};

export default Form;
