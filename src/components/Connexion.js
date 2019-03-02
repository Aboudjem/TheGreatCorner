import React from 'react';
import logo from '../../public/img/logo.png';

class Connexion extends React.Component {

	goToApp = event => {
		event.preventDefault();
		const login = this.boxInput.value;
		this.context.router.transitionTo(`/box/${login}`);
	}

	render() {
		return (
			<div className="connexionBox">
				<form className="connexion" onSubmit={(e) => this.goToApp(e)} >
					<img src={logo} alt="logo"/>
					<h1>The Good Corner !</h1>
					<input type="text" placeholder="Type Name" pattern="[A-Za-z-]{1,}" required ref={(input) => {this.boxInput = input}} />
					<button type="submit">GO</button>
					<p>No special characters allowed.</p>
				</form>
			</div>
		)
	}

	static contextTypes = {
		router: React.PropTypes.object
	};
}

export default Connexion;