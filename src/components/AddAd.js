import React from 'react';

class AddAd extends React.Component {

	addAd = (event) => {
		event.preventDefault();

		const ad = {
			name: this.name.value,
			image: this.image.value,
			specifications: this.specifications.value,
			description: this.description.value
		}
		this.props.addAd(ad);
		this.adForm.reset();
	};


	render() {
		return (
			<div className="card" >
				<form className="admin-form add-ad"
					ref={input => this.adForm = input}
					onSubmit={(e) => this.addAd(e)}
				>

					<input ref={input => this.name = input} type="text" placeholder="Ad title" />

					<input ref={input => this.image = input} type="text" placeholder="Image's link" />

					<textarea ref={input => this.specifications = input} rows="3" placeholder="Specifications (Commas separated)" ></textarea>

					<textarea ref={input => this.description = input} rows="15" placeholder="Description (One per line)" ></textarea>

					<button type="submit">+ Publish this ad</button>
				</form>
			</div>
		)
	}

	static propTypes = {
	  addAd: React.PropTypes.func.isRequired
	};

}

export default AddAd;