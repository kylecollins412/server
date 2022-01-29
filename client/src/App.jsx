import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Nav from './components/layout/nav/Nav';
import Footer from './components/layout/footer/Footer';
import Home from './components/routes/Home';
import Properties from './components/routes/Properties';
import Users from './components/routes/admin/Users';
import Property from './components/routes/Property';
import Contacts from './components/routes/admin/Contacts';
import { default as PropertyAdmin } from './components/routes/admin/Property';
import './app.scss';

const App = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/admin/users" element={<Users />} />
					<Route path="/admin/property" element={<PropertyAdmin />} />
					<Route path="/admin/contacts" element={<Contacts />} />
					<Route path="*" element={<UserRoutes />} />
				</Routes>
			</Router>
		</>
	);
};

// created a diffreent router to hide navbar in admin routes
const UserRoutes = () => {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/properties" element={<Properties />} />
				<Route path="/properties/:id" element={<Property />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
