import React, {Component} from 'react';
import './loading.css'; // Make sure to import the CSS file

class Loading extends Component {
    render() {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }
}

export default Loading;
