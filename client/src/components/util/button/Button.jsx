import React from 'react';
import propTypes from 'prop-types';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';

import './button.scss';

/**
 * button primary component
 * @param {string} title text to show on button
 * @param {string} className additional classNames to add to button
 * @param {string} type type of button eg-submit
 * @param {string} loading if true button will show loading indicator
 * @param {object} style type of style eg-padding: '0'
 * @returns {JSX.Element} button primary component
 */
export const BPrimary = ({ title, className, type, loading, style }) => {
	return (
		<Button
			style={style}
			className={`${className} btn-primary`}
			type={type}
			variant="contained"
		>
			{loading ? <CircularProgress /> : title}
		</Button>
	);
};

BPrimary.propTypes = {
	title: propTypes.string.isRequired,
	className: propTypes.string,
	type: propTypes.string,
	loading: propTypes.bool,
	style: propTypes.object,
};

/**
 * button secondary component
 * @param {string} title text to show on button
 * @param {string} className additional classNames to add to button
 * @param {string} type type of button eg-submit
 * @returns {JSX.Element} button primary component
 */
export const BSecondary = ({ title, className, type }) => {
	return (
		<Button
			className={`${className} btn-secondary`}
			type={type}
			variant="contained"
		>
			{title}
		</Button>
	);
};

BSecondary.propTypes = {
	title: propTypes.string.isRequired,
	className: propTypes.string,
	type: propTypes.string,
};

/**
 * Button to upload files
 * @param {string} title text to show on button
 * @param {string} className additional classNames to add to button
 * @param {function} onChange onChange envent handler
 * @returns {JSX.Element} file upload button
 */
export const BUpload = ({ title, className, onChange, accept }) => {
	return (
		<Button
			variant="contained"
			component="label"
			className={`${className} btn-primary`}
			onChange={onChange}
		>
			{title}
			<input type="file" multiple hidden accept={accept} />
		</Button>
	);
};

BUpload.propTypes = {
	title: propTypes.string.isRequired,
	className: propTypes.string,
	onChange: propTypes.func,
	accept: propTypes.string,
};
