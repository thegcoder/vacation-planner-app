import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

const api = 'https://vacation-planner-api.herokuapp.com/api/';

export default class UserDelete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      id: '',
      name: '',
      imageUrl: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = this.state;

    const history = this.props.history;

    const id = this.state.id;

    axios.post(`${api}delete/users/${id}`, data)
      .then(res => {
        history.push(`/users`);
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

    axios.get(`${api}read/users/${id}`)
      .then(res => {
        this.setState({
          email: res.data.email,
          id: res.data._id,
          name: res.data.name,
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
          <h2>Delete User</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <div>{this.state.imageUrl}</div>
            </div>
            <div>
              <div>{this.state.name}</div>
            </div>
            <div>
              <div>{this.state.email}</div>
            </div>
            <button className='search-btn'>Submit</button>
            <Link to={`/user/${this.state.id}`}><input type="button" value="Cancel" className='search-btn' /></Link>
          </form>
        </div>
    );
  }
}
