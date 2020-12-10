import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HnnWLIftodrZculw9SlvQtlqDEtJs6XubxHfi0bNTEirepwZYbDedK4zwWcIlmQyyJGQTeuLFm2Jf5wPxyj3wSc00TggeWXfE';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment Successful');
        }).catch(error => {
            console.log('Payment Error: ', JSON.parse(error));
            alert('There was issue with ypur payment. Please sure you use the provided credit cart.');
        });
    };

    return (
        <StripeCheckout 
            label="Pay Now"
            name="CRWN Clothing"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};


export default StripeCheckoutButton;