import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

const api = 'https://vacation-planner-api.herokuapp.com/api/';

export default class DestinationEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      country: '',
      city: '',
      description: '',
      imageUrl: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'country':
        this.setState({country: event.target.value});
        break;
      case 'city':
        this.setState({city: event.target.value});
        break;
      case 'description':
        this.setState({description: event.target.value});
        break;
      case 'imageUrl':
        this.setState({imageUrl: event.target.value});
        break;
      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = this.state;

    const history = this.props.history;

    const id = this.state.id;

    axios.post(`${api}update/destinations/${id}`, data)
      .then(res => {
        history.push(`/destination/${res.data._id}`);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`${api}read/destinations/${id}`)
      .then(res => {
        this.setState({
          country: res.data.country,
          city: res.data.city,
          description: res.data.description,
          id: res.data._id,
          imageUrl: res.data.imageUrl
        });
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
          <h2>Edit Destination</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="formItem">
              <div>{this.state.country}</div>
              <label>Country:</label>
              <input type="text" name="country" placeholder={this.state.country} onChange={this.handleChange}/>
            </div>
            <div className="formItem">
              <div>{this.state.city}</div>
              <label>City:</label>
              <input type="text" name="city" placeholder={this.state.city} onChange={this.handleChange}/>
            </div>
            <div className="formItem">
              <div>{this.state.imageUrl}</div>
              <label>Image Url:</label>
              <input type="text" name="imageUrl" placeholder={this.state.imageUrl} onChange={this.handleChange}/>
            </div>
            <div className="formItem">
              <div>{this.state.description}</div>
              <label>Description:</label>
              <input type="text" name="description" placeholder={this.state.description} onChange={this.handleChange}/>
            </div>
            <button className='search-btn'>Submit</button>
            <Link to={`/destination/${this.state.id}`}><input type="button" value="Cancel" className='search-btn' /></Link>
          </form>
        </div>
    );
  }
}
