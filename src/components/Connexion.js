import React from 'react';
import logo from '../../public/img/logo.png';
class Connexion extends React.Component {

	goToApp = event => {
		event.preventDefault();
		const pseudo = this.boxInput.value;
		this.context.router.transitionTo(`/box/${pseudo}`);
	};

	render() {
		return (
			<div className="connexionBox">
				<form className="connexion" onSubmit={(e) => this.goToApp(e)} >
				<img src={logo}/>
					<h1>My Ads</h1>
					<input type="text" placeholder="Your name" pattern="[A-Za-z-]{1,}" required ref={(input) => {this.boxInput = input}} />
					<button type="submit">GO</button>
					<p>No special characters are allowed</p>
				</form>
			</div>
		)
	}

	static contextTypes = {
		router: React.PropTypes.object
	};
}

export default Connexion;