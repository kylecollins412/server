import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import Nav from './components/layout/nav/Nav';
import Home from './components/routes/Home';
import Users from './components/routes/admin/Users';

import './app.scss';

const App = () => {
	return (
		<>
			<CssBaseline />
			<Router>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/admin/users" element={<Users />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;