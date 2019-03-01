import React from 'react';
import '../index.css';
import AddAd from './AddAd';
import Base from '../base';

class Admin extends React.Component {

    state = {
        uid: null,
        owner: null,
    };

    componentDidMount(){
        Base.onAuth(user => {
            if (user) {
                this.handleConnexion(null, {user})
            }
        })
    }

    connexion = provider => {
        Base.authWithOAuthPopup(provider, this.handleConnexion);
    };

    disconnect = () => {
        Base.unauth();
        this.setState({uid: null});
    };

    handleConnexion = (err, authData) => {
        if(err) {
            console.log(err);
            return;
        }
        const boxRef = Base.database().ref(this.props.login);

        boxRef.once('value', snapshot => {
            const data = snapshot.val() || {};
            if(!data.owner) {
                boxRef.set({
                    owner: authData.user.uid
                })
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })

        })
    };



    handleChange = (event, key) => {
        const ad = this.props.ads[key];
        const updatedAd = {
            ...ad,
            [event.target.name]: event.target.value
        };
      this.props.updateAds(key, updatedAd);
    };

    renderLogin = () => {
        return (
            <div className="login">
                <h2>Login using Facebook !</h2>
                <button className="facebook-button" onClick={() => this.connexion('facebook')}> Connect with Facebook</button>
            </div>
        )
    }

    renderAdmin = key => {
        const ad = this.props.ads[key];
        return (
            <div className="card" key={key}>
                <form className="admin-form">
                    <input ref={input => this.name = input} name="name" value={ad.name} type="text" placeholder="Ad's title" onChange={e => this.handleChange(e, key)} />
                    <input ref={input => this.image = input} name="image" value={ad.image} type="text" placeholder="Image's url" onChange={e => this.handleChange(e, key)} />
                    <textarea ref={input => this.specifications = input} name="specifications" value={ad.specifications} rows="3" placeholder="Details separated by commas" onChange={e => this.handleChange(e, key)} />
                    <textarea ref={input => this.description = input} name="description" value={ad.description} rows="15" placeholder="One per line" onChange={e => this.handleChange(e, key)} />
                </form>
                <button onClick={() => this.props.deleteAds(key)}>Delete this ad</button>
            </div>
        )
    };
    render() {
        const disconnect = <button onClick={this.disconnect}>Disconnect</button>;
        if (!this.state.uid){
            return <div>{this.renderLogin()}</div>
        }

        if (this.state.uid !== this.state.owner){
            return (
                <div className="login">
                    {this.renderLogin()}
                <p>You're not the owner of this page !</p>
                </div>
            );
        }

        const adminCards = Object
            .keys(this.props.ads)
            .map(this.renderAdmin);
        return (
            <div className="cards">
                <AddAd addAds={this.props.addAds}/>
                {adminCards}
                <footer>
                    <button onClick={ this.props.loadAds}>Fill</button>
                    {disconnect}
                </footer>
            </div>
        )
    }

    static propTypes = {
        ads:        React.PropTypes.object.isRequired,
        loadAds:    React.PropTypes.func.isRequired,
        addAds:     React.PropTypes.func.isRequired,
        updateAds:  React.PropTypes.func.isRequired,
        deleteAds:  React.PropTypes.func.isRequired
    };
}

export default Admin;