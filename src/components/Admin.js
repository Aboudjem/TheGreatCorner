import React from 'react';
import base from '../base';
import AddAd from './AddAd';

class Admin extends React.Component {

	state = {
		uid: null,
		owner: null
	};

	componentDidMount() {
		base.onAuth(user => {
			if (user) {
				this.handleConnexion(null, { user })
			}
		})
	}

	handleUpdate = (event, key) => {
		const ad = this.props.ads[key];
		const updateAd = {
			...ad,
			[event.target.name]: event.target.value
		};
		this.props.updateAd(key, updateAd);
	};

	connexion = (provider) => {
		console.log(`Tentative de connexion avec ${provider}`);
		base.authWithOAuthPopup(provider, this.handleConnexion);
	};

	disconnect = () => {
		base.unauth();
		this.setState({ uid: null });
	}

	handleConnexion = (err, authData) => {

		if (err) {
			console.log(err);
			return;
		}

		// récupérer le name de la boîte
		const boxRef = base.database().ref(this.props.login);

		// Demander à firebase les données
		boxRef.once('value', (snapshot) => {

			const data = snapshot.val() || {};

			// Attribuer la box si elle n'est à personne
			if(!data.owner) {
				boxRef.set({
					owner: authData.user.uid
				})
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			});

		});
	};

	renderLogin = () => {
		return (
				<div className="login">
					<h2>Connecte toi pour créer tes ads !</h2>
					<button className="facebook-button" onClick={() => this.connexion('facebook')} >Me connecter avec Facebook</button>
					<button className="twitter-button" onClick={() => this.connexion('twitter')} >Me connecter avec Twitter</button>
				</div>
		)
	};

	renderAdmin = (key) => {
		const ad = this.props.ads[key];
		return (
			<div className="card" key={key} >
				<form className="admin-form">

					<input type="text" name="name" placeholder="Nom de la ad" value={ad.name} onChange={(e) => this.handleUpdate(e, key)} />

					<input type="text" name="image" placeholder="Adresse de l'image" value={ad.image} onChange={(e) => this.handleUpdate(e, key)} />

					<textarea name="specifications" rows="3" placeholder="Liste des ingrédients" value={ad.specifications} onChange={(e) => this.handleUpdate(e, key)} ></textarea>

					<textarea name="description" rows="15" placeholder="Liste des description" value={ad.description} onChange={(e) => this.handleUpdate(e, key)} ></textarea>

				</form>
				<button onClick={() => this.props.deleteAd(key)} >Delete</button>
			</div>
		)
	};

	render() {
		const disconnect = <button onClick={this.disconnect} >Déconnexion!</button>

		// Check si il existe un propriétaire
		if (!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}

		//Check c'est le propriétaire de la boîte
		if (this.state.uid !== this.state.owner) {
			return (
				<div className="login">
					{this.renderLogin()}
					<p>⚠Tu n'es pas le propriétaire de cette boîte à ads.</p>
				</div>
			)
		}

		const adminCards = Object
			.keys(this.props.ads)
			.map(this.renderAdmin);

		return (
			<div className="cards">
				<AddAd addAd={this.props.addAd} />
				{adminCards}
				<footer>
					<button onClick={this.props.loadExemple} >Remplir</button>
				{disconnect}
				</footer>
			</div>	
		)
	}

	static propTypes = {
		ads: React.PropTypes.object.isRequired,
		loadExemple: React.PropTypes.func.isRequired,
		addAd: React.PropTypes.func.isRequired,
		updateAd: React.PropTypes.func.isRequired,
		deleteAd: React.PropTypes.func.isRequired,
		login: React.PropTypes.string.isRequired
	};

}

export default Admin;