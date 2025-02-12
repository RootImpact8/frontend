import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchLocation();
  }

  fetchLocation = async () => {
    const token = localStorage.getItem('token'); // Ensure a token is stored in localStorage
    const url = "http://43.201.122.113:8081/api/user-info/location";

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.setState({ location: response.data, loading: false });
      console.log(response.data);
      
    } catch (error) {
      this.setState({ error: error.toString(), loading: false });
    }
  }

  render() {
    const { location, loading, error } = this.state;
    return (
      <div>
        {loading ? <p>Loading location data...</p> : error ? <p>Error: {error}</p> : 
          <div>
            <p>City/Province: {location.city}, District: {location.state}</p>
          </div>
        }
      </div>
    );
  }
}

export default Test;
