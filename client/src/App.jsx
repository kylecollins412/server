import { useState, useEffect, lazy, Suspense } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import TempUsers from './components/pages/admin/tempUsers/TempUsers';
import Contacts from './components/pages/admin/contacts/Contacts';
import AddProperty from './components/pages/admin/property/form/Form';
import UpdateProperty from './components/pages/admin/property/update/Update';
import UserUpdateProperty from './components/pages/updateProperty/UpdateProperty';
import Listing from './components/pages/listing/Listing';
import NotFound from './components/pages/notFound/NotFound';
import Admin from './components/pages/admin/Admin';
import Listings from './components/pages/admin/listings/Listings';
import AdminListing from './components/pages/admin/listing/Listing';
import Signup from './components/pages/signup/Signup';
import Login from './components/pages/login/Login';
import Account from './components/pages/account/Account';
import get from './api/get';
import Form from './components/pages/home/form/Form';
import Users from './components/pages/admin/users/Users';
import User from './components/pages/admin/user/User';
import PendingListings from './components/pages/pendingListings/PendingListings';
import UpdatePendingListing from './components/pages/updatePendingListings/UpdatePendingListing';

import './app.scss';
import Loader from './components/util/loader/Loader';
const Nav = lazy(() => import('./components/layout/nav/Nav'));
const Footer = lazy(() => import('./components/layout/footer/Footer'));

const Properties = lazy(() =>
	import('./components/pages/properties/Properties')
);
const AllImages = lazy(() => import('./components/pages/allimages/Images'));
const Hero = lazy(() => import('./components/pages/home/hero/Hero'));
const PropertiesSection = lazy(() =>
	import('./components/pages/home/properties/Properties')
);
const Category = lazy(() =>
	import('./components/pages/home/category/Category')
);
const ListingSection = lazy(() =>
	import('./components/pages/home/listing/Listing')
);

const Property = lazy(() => import('./components/pages/property/Property'));

const App = () => {
	const [submit, setSubmit] = useState(false);

	return (
		<HelmetProvider>
			<Suspense fallback={<Loader fullScreen />}>
				<CssBaseline />
				<Router>
					<Routes>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}`}
							element={
								<Admin submit={submit} setSubmit={setSubmit} />
							}
						/>

						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/temp-users`}
							element={<TempUsers />}
						/>

						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/property/add`}
							element={<AddProperty />}
						/>

						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/property/update/:id`}
							element={<UpdateProperty />}
						/>

						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/contacts`}
							element={<Contacts />}
						/>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/listings`}
							element={<Listings />}
						/>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/listings/:id`}
							element={<AdminListing />}
						/>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/users`}
							element={<Users />}
						/>
						<Route
							path={`${process.env.REACT_APP_ADMIN_ROUTE}/users/:id`}
							element={<User />}
						/>
						<Route path="*" element={<UserRoutes />} />
					</Routes>
				</Router>
			</Suspense>
		</HelmetProvider>
	);
};

// created a different router to hide navbar in admin routes
const UserRoutes = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [authFormSubmit, setAuthFormSubmit] = useState(false);

	useEffect(() => {
		get('/auth/is-logged-in').then(res => {
			setIsLoggedIn(res.success);
			setAuthFormSubmit(false);
		});
	}, [authFormSubmit]);

	return (
		<>
			<Nav isLoggedIn={isLoggedIn} />
			<Routes>
				<Route
					path="/"
					element={
						<main>
							<Helmet>
								<title>Shri Property</title>
								<link rel="canonical" href="/" />
								<meta
									name="description"
									content="Shri Property is committed to delivering a high level of
						expertise, customer service, and attention to detail to
						sales of real estate, and rental
						properties."
								/>
							</Helmet>
							<Hero />
							<PropertiesSection />
							<Category />
							<ListingSection />
							<Form />
						</main>
					}
				/>
				<Route path="/properties" element={<Properties />} />
				<Route path="/properties/:id" element={<Property />} />
				<Route
					path="/listing"
					element={<Listing isLoggedIn={isLoggedIn} />}
				/>
				<Route path="/allimages/:id" element={<AllImages />} />

				<Route
					path="/signup"
					element={<Signup setAuthFormSubmit={setAuthFormSubmit} />}
				/>

				<Route
					path="/login"
					element={<Login setAuthFormSubmit={setAuthFormSubmit} />}
				/>

				<Route
					path="/account"
					element={<Account setAuthFormSubmit={setAuthFormSubmit} />}
				/>
				<Route
					path="/account/pending-listings"
					element={<PendingListings />}
				/>
				<Route
					path="/property/update/:id"
					element={<UserUpdateProperty />}
				/>
				<Route
					path="/account/pending-listings/:id"
					element={<UpdatePendingListing />}
				/>
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate replace to="/404" />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
