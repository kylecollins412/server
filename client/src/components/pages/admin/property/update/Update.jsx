import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { BPrimary, BUpload } from '../../../../util/button/Button';
import { ASuccess, AError } from '../../../../util/alert/Alert';
import Loader from '../../../../util/loader/Loader';

import { patchFile } from '../../../../../api/patch';
import get from '../../../../../api/get';

//WARNING: Sass is coming from form.scss file in ../form folder

const Update = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [specialPrice, setSpecialPrice] = useState('');
	const [type, setType] = useState('');
	const [catagory, setCatagory] = useState('');
	const [status, setStatus] = useState('');
	const [size, setSize] = useState('');
	const [unit, setUnit] = useState('');
	const [bedroom, setBedroom] = useState(0);
	const [bathroom, setBathroom] = useState(0);
	const [openParking, setOpenParking] = useState(0);
	const [closeParking, setCloseParking] = useState(0);
	const [livingRoom, setLivingRoom] = useState(0);
	const [dinningRoom, setDinningRoom] = useState(0);
	const [store, setStore] = useState(0);
	const [poojaRoom, setPoojaRoom] = useState(0);
	const [balcony, setBalcony] = useState(0);
	const [floor, setFloor] = useState('');
	const [direction, setDirection] = useState('');
	const [kitchen, setKitchen] = useState(0);
	const [address, setAddress] = useState('');
	const [featured, setFeatured] = useState(false);
	const [images, setImages] = useState([]);
	const [videos, setVideos] = useState('');
	const [documents, setDocuments] = useState('');
	const [otherFeatures, setOtherFeatures] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingPage, setloadingPage] = useState(true);
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		get(`/properties/single/${id}`)
			.then(res => {
				const data = res.data;

				setTitle(data.title);
				setDescription(data.description);
				setPrice(data.price);
				setSpecialPrice(data.specialPrice);
				setType(data.type);
				setCatagory(data.catagory);
				setStatus(data.status);
				setSize(data.size);
				setUnit(data.unit);
				setBedroom(data.bedroom);
				setBathroom(data.bathroom);
				setOpenParking(data.openParking);
				setCloseParking(data.closeParking);
				setLivingRoom(data.livingRoom);
				setDinningRoom(data.dinningRoom);
				setStore(data.store);
				setPoojaRoom(data.poojaRoom);
				setBalcony(data.balcony);
				setFloor(data.floor);
				setDirection(data.direction);
				setKitchen(data.kitchen);
				setAddress(data.address);
				setFeatured(data.featured);
				setOtherFeatures(data.otherFeatures);
				setloadingPage(false);
			})
			.catch(err => {
				navigate('/404');
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const body = new FormData();

	// submit handler
	const submitHandler = e => {
		e.preventDefault();
		setLoading(true);

		// append data to body to send
		body.append('title', title);
		body.append('description', description);
		body.append('price', price);
		body.append('specialPrice', specialPrice);
		body.append('type', type);
		body.append('catagory', catagory);
		body.append('status', status);
		body.append('size', size);
		body.append('unit', unit);
		body.append('bedroom', bedroom);
		body.append('bathroom', bathroom);
		body.append('openParking', openParking);
		body.append('closeParking', closeParking);
		body.append('livingRoom', livingRoom);
		body.append('dinningRoom', dinningRoom);
		body.append('store', store);
		body.append('poojaRoom', poojaRoom);
		body.append('balcony', balcony);
		body.append('floor', floor);
		body.append('direction', direction);
		body.append('kitchen', kitchen);
		body.append('address', address);
		body.append('featured', featured);

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

		// post to server
		patchFile(`/properties/update/${id}`, body).then(data => {
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

	return (
		<section>
			{loadingPage ? (
				<Loader fullScreen />
			) : (
				<form onSubmit={submitHandler} className="admin-property-form">
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

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Title"
						value={title}
						fullWidth
						required
						onChange={e => setTitle(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Description"
						value={description}
						fullWidth
						required
						multiline
						onChange={e => setDescription(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Address"
						value={address}
						required
						fullWidth
						onChange={e => setAddress(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Other Features"
						helperText="Separate with enter"
						value={otherFeatures.join('\n')}
						fullWidth
						multiline
						required
						onChange={e =>
							setOtherFeatures(e.target.value.split('\n'))
						}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Price"
						type="number"
						value={price}
						required
						onChange={e => setPrice(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Special Price"
						type="number"
						value={specialPrice}
						required
						onChange={e => setSpecialPrice(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Size"
						type="number"
						value={size}
						required
						onChange={e => setSize(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Bedrooms"
						type="number"
						value={bedroom}
						onChange={e => setBedroom(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Bathroom"
						type="number"
						value={bathroom}
						onChange={e => setBathroom(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Kitchen"
						type="number"
						value={kitchen}
						onChange={e => setKitchen(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Open Parking"
						type="number"
						value={openParking}
						onChange={e => setOpenParking(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Close Parking"
						type="number"
						value={closeParking}
						onChange={e => setCloseParking(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Living Room"
						type="number"
						value={livingRoom}
						onChange={e => setLivingRoom(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Dinning Room"
						type="number"
						value={dinningRoom}
						onChange={e => setDinningRoom(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Store Room"
						type="number"
						value={store}
						onChange={e => setStore(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Pooja Room"
						type="number"
						value={poojaRoom}
						onChange={e => setPoojaRoom(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Balcony"
						type="number"
						value={balcony}
						onChange={e => setBalcony(e.target.value)}
					/>

					<TextField
						className="admin-property-form__input"
						varient="outlined"
						label="Floor"
						value={floor}
						onChange={e => setFloor(e.target.value)}
					/>

					<br />

					<FormControl className="admin-property-form__select">
						<InputLabel>Type</InputLabel>
						<Select
							label="Type"
							value={type}
							onChange={e => setType(e.target.value)}
							required
						>
							<MenuItem value="Rental">Rental</MenuItem>
							<MenuItem value="Sale">Sale</MenuItem>
						</Select>
					</FormControl>

					<FormControl className="admin-property-form__select">
						<InputLabel>Catagory</InputLabel>
						<Select
							label="Catagory"
							value={catagory}
							onChange={e => setCatagory(e.target.value)}
							required
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
							label="Status"
							value={status}
							onChange={e => setStatus(e.target.value)}
						>
							<MenuItem value="Unfurnished">Unfurnished</MenuItem>
							<MenuItem value="Semifurnished">
								Semifurnished
							</MenuItem>
							<MenuItem value="Furnished">Furnished</MenuItem>
						</Select>
					</FormControl>

					<FormControl className="admin-property-form__select">
						<InputLabel>Unit</InputLabel>
						<Select
							label="Unit"
							value={unit}
							onChange={e => setUnit(e.target.value)}
						>
							{/* WARNING: Add more units here */}
							<MenuItem value={'sq'}>sq</MenuItem>
							<MenuItem value={'marla'}>marla</MenuItem>
						</Select>
					</FormControl>

					<FormControl className="admin-property-form__select">
						<InputLabel>Featured</InputLabel>
						<Select
							label="Featured"
							value={featured}
							onChange={e => setFeatured(e.target.value)}
						>
							<MenuItem value={true}>True</MenuItem>
							<MenuItem value={false}>False</MenuItem>
						</Select>
					</FormControl>

					<FormControl className="admin-property-form__select">
						<InputLabel>Direction</InputLabel>
						<Select
							label="Direction"
							value={direction}
							onChange={e => setDirection(e.target.value)}
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

					<br />

					<BUpload
						title="Image"
						className="admin-property-form__upload-btn"
						onChange={e => setImages(e.target.files)}
						accept="image/*"
					/>

					<BUpload
						title="Videos"
						className="admin-property-form__upload-btn"
						onChange={e => setVideos(e.target.files)}
						accept="video/*"
					/>

					<BUpload
						title="Documents"
						className="admin-property-form__upload-btn"
						onChange={e => setDocuments(e.target.files)}
						accept="application/pdf"
					/>

					<br />

					<BPrimary
						title="Submit"
						className="admin-property-form__submit-btn"
						type="submit"
						loading={loading}
					/>
				</form>
			)}
		</section>
	);
};

export default Update;
