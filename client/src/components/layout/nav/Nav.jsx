import { Link } from 'react-router-dom';
import Search from '@mui/icons-material/Search';

import './nav.scss';
import { BPrimary } from '../../util/button/Button';

const Nav = () => {
	return (
		<header>
			<nav className="nav">
				<div className="nav__logo">
					<Link to="/">
						<img src="/images/logo/logo.png" alt="Logo" />
					</Link>
				</div>
				<ul className="nav__list">
					<li>
						<Link to="/">Home</Link>
					</li>

					<li>
						<Link to="/properties">Properties</Link>
					</li>

					<li>
						<a href="/#form-section">Contact Us</a>
					</li>

					<li className="nav__search">
						<input type="text" placeholder="Search" />
						<Search />
					</li>
				</ul>
				<ul className="nav__btns">
					<BPrimary title="Add Listings" />
				</ul>
			</nav>
		</header>
	);
};

export default Nav;
