import React, { useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing ] = useState("");
    const [succeeded, setSucceeded ] = useState(false);
    const [clientSecret, setClientSecret] = useState(true); 
    const history = useHistory();

    useEffect(() => {
        // generate the special stripe secret which allows
        // us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currency subunit
                url: `/payment/create?total=${getBasketTotal(basket)*100}`

            })
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket]);

    console.log('THE SECRET IS >>>', clientSecret);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit= (event) => {
        event.preventDefault();
        setProcessing(true);

        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            // console.log('this is the response',resp);

            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_BASKET',
            })

            history.replace('/orders');
        })
        .catch(e=> console.log(e.message));

    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : ""); 

    }
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout(<Link to='/checkout'>{basket?.length}</Link>)
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Bokaro, Jharkhand</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title" >
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items"> 
                        {
                            basket.map(item => (
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="payment__details">
                        {/* stripe magic will go */}
                        
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                    <p>
                                        Subtotal ({basket.length} items): <strong>{value}</strong>
                                    </p>
                                    
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}  
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rs"}
                            />
                            <button disabled=
                                {processing || 
                                disabled || 
                                succeeded}>
                                    <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
