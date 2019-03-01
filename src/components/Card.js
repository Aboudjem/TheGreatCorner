import React from 'react';

class Card extends React.Component {

    render() {
        const specifications = this.props.details.specifications.split(',').map((item, key) => <li key={key}>{item}</li>);
        const description = this.props.details.description.split('\n').map((item, key) => <li key={key}>{item}</li>);

        return (
            <div className="card">

                <div className="image">
                    <img src={this.props.details.image} alt="" />
                </div>

                <div className="ad">

                    <h2>{this.props.details.name}</h2>

                    <ul className="liste-specifications">
                        {specifications}
                    </ul>

                    <ol className="liste-instruction">
                        {description}
                    </ol>
                </div>
            </div>
        )
    }

    static propTypes = {
        details: React.PropTypes.object.isRequired
    };
}

export default Card;