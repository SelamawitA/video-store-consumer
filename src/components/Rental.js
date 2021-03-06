import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cust from './Customer.js'
import axios from 'axios';
import './Rental.css';
class Rental extends Component {

  constructor() {
    super();
  }

  addRental = () => {
    let time = new Date();

    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    let rentalDate = `${year}-${month}-${day + 7}`;
    let movie = this.props.movie.title;
    let customer = this.props.customer.name

    axios.post( `http://localhost:3000/rentals/${movie}/check-out?customer_id=${this.props.customer.id}&due_date=${rentalDate}`)
    .then((response) => {
      this.props.setStatus(`Success: ${movie} has been checked out by ${customer} and is due on ${rentalDate}.`, 'success');
    })
    .catch((error) => {
      this.props.setStatus(`Unable to create Rental: ${error.message}`, 'error');
    });
  }


  onFormSubmit = (event) => {
    event.preventDefault();
    this.addRental();
    this.props.customer.name = ''
    this.props.movie.title = ''
  }


  render(){
    return(
      <div className="check-out-section">
        <form onSubmit={this.onFormSubmit}>
        <section className="rental-labels">
          <div>
            <label className="customer-label" htmlFor="customerName">Customer: </label>
            <input name="cust" value={this.props.customer.name} disabled/>
          </div>
          <div>
            <label className="movie-label" htmlFor="movieName">Movie: </label>
            <input name="movie" value={this.props.movie.title} disabled/>
          </div>
          <input id="image" type="image" alt="Checkout button"
           src="https://i.imgur.com/oGbuhGm.png?3"/>
        </section>
        </form>
          <hr/>
      </div>
    )
  }
}

Rental.propTypes = {
  customer: PropTypes.string.isRequired,
  movie: PropTypes.string.isRequired
}
export default Rental;
