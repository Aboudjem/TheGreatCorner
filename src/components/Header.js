import React from 'react';
// import logo from '../../public/img/logo.png';
class Header extends React.Component {
	render() {
		return (
			<div>
			<header>
				{/*<img className="logo" src={logo} alt="logo" />*/}
				<h1>{this.props.login}'s corner</h1>
			</header>
			</div>
		)
	}

	static propTypes = {
	  login: React.PropTypes.string.isRequired
	};
}

export default Header;