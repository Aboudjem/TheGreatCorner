import React from 'react';
import '../index.css';
import AddAd from './AddAd';

class Admin extends React.Component {
    handleChange = (event, key) => {
        const ad = this.props.ads[key];
        const updatedAd = {
            ...ad,
            [event.target.name]: event.target.value
        };
      this.props.updateAds(key, updatedAd);
    };

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
        const adminCards = Object
            .keys(this.props.ads)
            .map(this.renderAdmin);
        return (
            <div className="cards">
                <AddAd addAds={this.props.addAds}/>
                {adminCards}
                <footer>
                    <button onClick={ this.props.loadAds}>Fill</button>
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