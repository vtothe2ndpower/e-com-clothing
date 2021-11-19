import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_live_51J3wUGKklEFbkQ1WQuUtFDvt7WWbd0eHyBqUc8DRsSdk3CO3dE16fUrf30MEvDGq1O2myfd9EXn5yVuUUP3V3JmM00WMa3Xeo6';

	const onToken = token => {
		console.log('token: ', token);
		alert('Payment Successful');
	}

	return (
		<StripeCheckout 
			label='Pay Now'
			name='Shop Detro'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
			bitcoin={true}
		/>
	);
};

export default StripeCheckoutButton;