import React from 'react';

class AddAd extends React.Component {

    createAd = event => {
        event.preventDefault();
        const ad = {
            name: this.name.value,
            image: this.image.value,
            specifications: this.specifications.value,
            description: this.description.value,
        };
        this.props.addAds(ad);
        this.adForm.reset();
    };

    render () {
        return (
            <div className="card">
                <form className="admin-form ajouter-ad"
                ref={input => this.adForm = input}
                      onSubmit={e => this.createAd(e)}
                >
                    <input ref={input => this.name = input} type="text" placeholder="Ad's title" />
                    <input ref={input => this.image = input} type="text" placeholder="Image's url" />
                    <textarea ref={input => this.specifications = input} rows="3" placeholder="Details separated by commas" />
                    <textarea ref={input => this.description = input} rows="15" placeholder="One per line" />
                    <button type="submit" >+ Add this ad</button>
                </form>
            </div>
        )
    }
}

export default AddAd;