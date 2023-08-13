// Dependencies
import React, { Component } from 'react';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addOrders } from '../store/cart';
export class MyPaymentForm extends Component {
  constructor(props) {
    super(props);
    console.log('inside Payment constructor ', props);
    this.state = {
      first: '',
      last: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      phone: '',
      transactionComplete: false,
    };
  }

  render() {
    let { amount, zip, first, last, address, email, phone, city, state } =
      this.props;
    return (
      <div>
        <PaymentForm
          applicationId="sandbox-sq0idb-9aiQYyJJerVQ_xS_gMVOmA"
          cardTokenizeResponseReceived={async (token, buyer) => {
            const response = await fetch('/api/pay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sourceId: token.token,
                amount: amount,
              }),
            });
            let res = await response.json();
            if (res.payment.status === 'COMPLETED') {
              this.props.addOrders({
                first,
                last,
                address,
                city,
                state,
                zip,
                email,
                shipDate:
                  res.payment.cardDetails.cardPaymentTimeline.capturedAt,
                paymentMethod: res.payment.sourceType,
                transactionId: res.payment.id,
                amount,
              });
              console.log(res.payment.status, 'success');
              this.props.handleCompleteTransaction();
            } else {
              console.log(res.payment.status, 'failure');
            }

            console.log('res ', res);
          }}
          locationId="LFJJJ47TKFPE2"
        >
          <CreditCard
            includeInputLabels
            postalCode={zip}
            buttonProps={{
              css: {
                "[data-theme='dark'] &": {
                  backgroundColor: '#61dafb',
                  color: 'var(--ifm-color-emphasis-100)',
                  '&:hover': {
                    backgroundColor: '#0091ea',
                  },
                },
                backgroundColor: '#771520',
                fontSize: '14px',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#530f16',
                },
              },
            }}
            style={{
              input: {
                fontSize: '14px',
              },
              'input::placeholder': {
                color: '#771520',
              },
            }}
          />
        </PaymentForm>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addOrders: (orders) => dispatch(addOrders(orders, history)),
  };
};

export default connect(null, mapDispatchToProps)(MyPaymentForm);
