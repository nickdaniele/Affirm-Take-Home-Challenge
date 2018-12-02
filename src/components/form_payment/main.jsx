import React, { Component } from 'react';
import '../../css/main.css';

const cleanState = {
  name: '',
  card: 'visa',
  number: '',
  cvv: '',
  expDate: '',
  submitted: false,
  errors: {
    number:'',
    cvv: '',
    expDate: ''
  }
};

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);

    this.state = Object.assign({}, cleanState);
  }

  handleUserInput(event) {
    const { name, value } = event.target;

    this.validateField(name, value);
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const errors = this.state.errors;
    let errorsPresent = false;

    // Making copy of state to test all fields prior to submit.
    let allFields = Object.assign({}, this.state);
    
    // Deleting fields with no validation.
    delete allFields.name;
    delete allFields.card;
    delete allFields.submitted;
    delete allFields.errors;

    const fieldKeys = Object.keys(allFields);

    fieldKeys.forEach((current) => {
      const value = allFields[current];
      this.validateField(current, value);
    });
    
    fieldKeys.forEach((current) => {
      if (errors[current]) {
        errorsPresent = true;
      }
    });

    if (!errorsPresent) {
      this.setState(cleanState);
      this.setState({ submitted: true });
    } 
  }

  validateField(fieldName, value) {
    let {card, errors} = this.state;
    let fieldValid;
    let regex;
    let errorMsg;

    // Re-setting submitted in case there was a form submission prior.
    this.setState({ submitted: false });

    switch(fieldName) {
      case 'number':
        regex = /^4[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
        errorMsg = 'Number must start with "4" and match the pattern "xxxx-xxxx-xxxx"';

        if (card === 'amex') {
          regex = /^34|37[0-9]{2}-[0-9]{6}-[0-9]{5}$/;          
          errorMsg = 'Number must start with "34 of "37" and match the pattern "xxxx-xxxxxx-xxxxx"';
        }

        fieldValid = regex.test(value);
        errors.number = fieldValid ? '' : errorMsg;
        break;
      case 'cvv':
        regex = /[a-z,A-Z,0-9]{3}$/;
        errorMsg = 'CVV must contain 3 characters.';

        if (card === 'amex') {
          regex = /[a-z,A-Z,0-9]{4}$/;          
          errorMsg = 'CVV must contain 4 characters.';
        }

        fieldValid = regex.test(value);
        errors.cvv = fieldValid ? '' : errorMsg;
        break;
      case 'expDate':
        const currentMonth = new Date();
        const userMonth = new Date(value);
        errorMsg = 'Your card has expired.';

        fieldValid = userMonth > currentMonth;
        errors.expDate = fieldValid ? '' : errorMsg;
        break;
      default:
        break;
    }

    this.setState({ errors });
  }

  render() {
    const { name, card, number, cvv, expDate, submitted, errors } = this.state;
    let submittedText;

    if (submitted) {
      console.log('yuuup');
      submittedText = <p className="complete">{'Credit Card Information submitted'}</p>;
    }

    return (
      <div className="form-wrapper">
        <div className="form">
          <h1>Enter Your Credit Card Information</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="card-type">
              <div className="card-type-label">Select a Card Type:</div>
              <div className="radio">
                <label>
                  <input onChange={this.handleUserInput} type="radio" name="card" value="visa" checked={card === 'visa'} />
                  VISA
                </label>
              </div>
              <div className="radio">
                <label>
                  <input onChange={this.handleUserInput} type="radio" name="card" value="amex" checked={card === 'amex'} />
                  AMERICAN EXPRESS
                </label>
              </div>
            </div>
            <input onChange={this.handleUserInput} type="text" id="name" name="name" placeholder="Name" value={name} required />
            <input onChange={this.handleUserInput} type="text" id="number" name="number" placeholder="Card Number" value={number} required />
            <p className="error">{errors.number}</p>
            <input onChange={this.handleUserInput} type="text" id="cvv" name="cvv" placeholder="CVV2" value={cvv} required />
            <p className="error">{errors.cvv}</p>
            <div>Expiration Date: </div>
            <input onChange={this.handleUserInput} type="month" id="expDate" name="expDate" value={expDate} required />
            <p className="error">{errors.expDate}</p>
            <button type="submit">Submit</button>
            {submittedText}
          </form>
        </div>
      </div>
    );
  }
}
