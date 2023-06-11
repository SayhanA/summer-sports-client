import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import './CheckoutForm.css'


const CheckoutForm = ({ id, cart, price }) => {
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const [cartError, setCartError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('')

    // console.log("cart:",cart)

    useEffect(() => {
        if (!user && !price > 0) {
            return
        }
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                // console.log(res.data.ClientSecret)
                setClientSecret(res.data.ClientSecret)
            })
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("cart from checkour form:",cart)

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCartError(error.message)
            console.log(error)
        }
        else {
            setCartError('')
            // console.log('paymentMethod', paymentMethod)
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || "anonymous"
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError)
            setCartError(confirmError)
        }

        console.log(paymentIntent)

        setProcessing(false)

        if (paymentIntent?.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            // const transactionId = paymentIntent.id;
            // const payments = {
            //     email: user?.email, transactionId, price,
            //     data: new Date(),
            //     quantity: cart?.length,
            //     orderStatus: "service pending",
            //     cartItems: cart.map(item => item._id),
            //     menuItems: cart.map(item => item.classId),
            //     itemNames: cart.map(item => item.sport),
            // }

            console.log(cart)
            delete cart._id
            
            axiosSecure.post('/payment', {...cart,id})
                .then(res => {
                    console.log(res.data)
                    if (res.data.result?.insertedId) {
                        // display confirm
                    }
                })
        }

    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <CardElement className=''
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-outline btn-warning mt-10 w-full font-bold normal-case' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay Now
                </button>
            </form>
            {cartError && <div className='font-bold text-red-500 text-xl text-center py-5'>{cartError}</div>}
            {transactionId && <div className='font-bold text-green-500 text-xl text-center py-5'>Transaction complete with transactionId: {transactionId}</div>}

        </div>
    );
};

export default CheckoutForm;