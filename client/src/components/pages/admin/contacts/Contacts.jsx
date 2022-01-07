import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import { AError } from '../../../util/Alert';
import getRequest from '../../../../api/get';
import patchRequest from '../../../../api/patch';
import deleteRequest from '../../../../api/delete';

import './contacts.scss';

const Users = () => {
	const [response, setResponse] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [status, setStatus] = useState('');
	const [openError, setOpenError] = useState(false);

	useEffect(() => {
		getRequest('/contacts/all').then(data => {
			setResponse(data.data);
		});
	}, []);

	const deleteHandler = id => {
		return e => {
			e.preventDefault();

			deleteRequest(`/contacts/delete/${id}`).then(data => {
				if (data.success !== true) {
					setErrorMessage(data.message);
					setOpenError(true);
				} else {
					window.location.reload();
				}
			});
		};
	};

	const updateHandler = id => {
		return e => {
			e.preventDefault();

			patchRequest(`/contacts/update-status/${id}`, {
				status,
			}).then(data => {
				if (data.success !== true) {
					setErrorMessage(data.message);
					setOpenError(true);
				} else {
					window.location.reload();
				}
			});
		};
	};

	return (
		<>
			<AError
				title={errorMessage}
				id="alert-error"
				open={openError}
				setOpen={setOpenError}
			/>
			<Table className="contact-table">
				<TableHead>
					<TableRow>
						<TableCell
							className="contact-table__cell"
							align="right"
						>
							Name
						</TableCell>

						<TableCell
							className="contact-table__cell"
							align="right"
						>
							Subject
						</TableCell>

						<TableCell
							className="contact-table__cell"
							align="right"
						>
							Email
						</TableCell>

						<TableCell
							className="contact-table__cell"
							align="right"
						>
							Phone
						</TableCell>

						<TableCell
							className="contact-table__cell"
							align="right"
						>
							Message
						</TableCell>

						<TableCell
							className="contact-table__cell"
							align="right"
						>
							Status
						</TableCell>

						<TableCell
							className="contact-table__cell"
							align="right"
						>
							Update Status
						</TableCell>

						<TableCell
							className="contact-table__cell"
							align="right"
						>
							Delete
						</TableCell>

						<TableCell
							className="contact-table__cell"
							align="right"
						>
							Confirm
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{response.map(contact => (
						<TableRow key={contact._id}>
							<TableCell
								className="contact-table__cell"
								align="right"
							>
								{contact.name}
							</TableCell>

							<TableCell
								className="contact-table__cell"
								align="right"
							>
								{contact.subject}
							</TableCell>

							<TableCell
								className="contact-table__cell"
								align="right"
							>
								{contact.email}
							</TableCell>

							<TableCell
								className="contact-table__cell"
								align="right"
							>
								{contact.phone}
							</TableCell>
							<TableCell
								className="contact-table__cell"
								align="right"
								width="20%"
							>
								{contact.message}
							</TableCell>

							<TableCell
								className="contact-table__cell"
								align="right"
							>
								{contact.status}
							</TableCell>

							<TableCell
								className="contact-table__cell"
								align="right"
							>
								<FormControl sx={{ m: 1, minWidth: 80 }}>
									<InputLabel>Update Call Status</InputLabel>
									<Select
										value={status}
										label="Update Call Status"
										onChange={e =>
											setStatus(e.target.value)
										}
									>
										<MenuItem value="Pending">
											Pending
										</MenuItem>
										<MenuItem value="In Progress">
											In Progress
										</MenuItem>
										<MenuItem value="Completed">
											Completed
										</MenuItem>
									</Select>
								</FormControl>
							</TableCell>

							<TableCell
								className="contact-table__cell"
								align="right"
							>
								<form onSubmit={deleteHandler(contact._id)}>
									<button type="submit">
										<DeleteIcon />
									</button>
								</form>
							</TableCell>

							<TableCell
								className="contact-table__cell"
								align="right"
							>
								<form onSubmit={updateHandler(contact._id)}>
									<button type="submit">
										<DoneIcon />
									</button>
								</form>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default Users;