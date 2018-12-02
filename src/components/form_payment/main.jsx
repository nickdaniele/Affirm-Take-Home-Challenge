import React, { Component } from 'react';

const state = {
  name: '',
  card: '',
  cvv: '',
  month: '',
  year: ''
};

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = state;
  }

  handleUserInput(event) {
    const { name, value } = event.target;
    
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('// User Submitted Form //');
  }

  render() {
    const { name, card, cvv, month, year } = this.state;

    return (
      <div>
        <h1>Enter Your Credit Card Information</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleUserInput} type="text" id="name" name="name" placeholder="Name" value={name} required />
          <input onChange={this.handleUserInput} type="number" id="card" name="card" placeholder="Card Number" value={card} required />
          <input onChange={this.handleUserInput} type="number" id="cvv" name="cvv" placeholder="CVV2" value={cvv} required />
          <input onChange={this.handleUserInput} type="number" id="month" name="month" placeholder="Exp. Month" value={month} required />
          <input onChange={this.handleUserInput} type="number" id="year" name="year" placeholder="Exp. Year" value={year} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
