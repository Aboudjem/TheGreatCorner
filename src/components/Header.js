import React from 'react';
import '../index.css';

class Header extends React.Component {
    render() {
        return (
        <header>
            <h1>
                The Good Corner ! <strong> Welcome {this.props.login}</strong>
            </h1>
        </header>
        )
    }
}

export default Header;