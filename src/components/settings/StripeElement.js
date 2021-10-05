import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');


function StripeElement() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default StripeElement