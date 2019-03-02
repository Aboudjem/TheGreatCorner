// React
import React from 'react';
//Components
import Header from './Header';
import Admin from './Admin';
import Card from './Card';
// Importer les ads
import ads from '../ads';
// Firebase
import base from '../base';

class App extends React.Component {

	state = {
		ads: {}
	};

	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.login}/ads`, {
			context: this,
			state: 'ads'
		});
	}

	componentWillUnmount() {
	  base.removeBinding(this.ref);
	}

	loadExemple = () => {
		this.setState({ ads });
	};

	addAd = (ad) => {
		const ads = {...this.state.ads};
		const timestamp = Date.now();
    ads[`ad-${timestamp}`] = ad;
		this.setState({ ads });
	};

	updateAd = (key, updateAd) => {
		const ads = {...this.state.ads};
		ads[key] = updateAd;
		this.setState({ ads });
	};

	deleteAd = (key) => {
		const ads = {...this.state.ads};
		ads[key] = null;
		this.setState({ ads });
	};

	render() {

		const cards = Object
			.keys(this.state.ads)
			.map(key => <Card key={key} details={this.state.ads[key]} />);

		return (
			<div className="box">
				<Header login={this.props.params.login} />
				<div className="cards">
					{cards}
				</div>
				<Admin
					ads={this.state.ads}
					loadExemple={this.loadExemple}
					addAd={this.addAd}
					updateAd={this.updateAd}
					deleteAd={this.deleteAd}
					login={this.props.params.login}
				/>
			</div>
		)
	}

	static propTypes = {
	  params: React.PropTypes.object.isRequired
	};
}

export default App;