import React, { Component } from 'react';

const state = {
  name: '',
  cardNumber: '',
  CVV2: '',
  expMonth: '',
  expYear: ''
};

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = state;
  }

  render() {
    return (
      <div>
        <h1>Enter Your Credit Card Information</h1>
      </div>
    );
  }
}
