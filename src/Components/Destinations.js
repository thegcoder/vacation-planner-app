import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

const api = 'https://vacation-planner-api.herokuapp.com/api/all/destinations';

export default class Destinations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      destinations: []
    }
  }

  componentDidMount() {
    axios.get(api)
      .then(res => {
          const destinations = res.data;
          this.setState({ destinations });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  render() {
    return (
        <div>
          <h2>Destinations</h2>
          <Link to={`/destination/create`}><h3>Create Destination</h3></Link>
          {this.state.destinations.map((destination, index) => {
            return (
              <div key={destination._id}>
                <div className="displayText">
                  {destination.city}, {destination.country}
                </div>
                <div className="displayImage">
                  <Link to={`/destination/${destination._id}`}>
                    <img src={destination.imageUrl} alt={destination.city} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
    );
  }
}
