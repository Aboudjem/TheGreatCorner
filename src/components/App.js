import React from 'react';
import Header from "./Header";
import Admin from "./Admin";
import ads from '../ads';
import Card from './Card';
import base from '../base';

class App extends React.Component {
    state = {
        ads: {}
    };


    componentWillMount() {
        this.ref = base.syncState(`${this.props.params.login}/ads`, {
            context: this,
            state: 'ads'
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    loadAds = () => {
        this.setState({ads});
    };

    addAds = (ad) => {
        const ads = {...this.state.ads};
        const timestamp = Date.now();
        ads[`Ads-${timestamp}`] = ad;
        this.setState({ads});
    };

    updateAds = (key, updatedAd) => {
        const ads = {...this.state.ads};
        ads[key] = updatedAd;
        this.setState({ads})
    };

    deleteAds = (key) => {
        const ads = {...this.state.ads};
        ads[key] = null;
        this.setState({ads});
    };

    render() {

        const cards = Object
            .keys(this.state.ads)
            .map(key => <Card key={key} details={this.state.ads[key]}/>);
        return (
            <div className="box">
                <Header login={this.props.params.login}/>
                <h1>{this.props.params.login}</h1>
                <div className="cards">
                    {cards}
                </div>
                <Admin
                    ads={this.state.ads}
                    loadAds={this.loadAds}
                    addAds={this.addAds}
                    updateAds={this.updateAds}
                    deleteAds={this.deleteAds}
                />
            </div>
        )
    }

    static propTypes = {
        params: React.PropTypes.object.isRequired
    };
}

export default App;