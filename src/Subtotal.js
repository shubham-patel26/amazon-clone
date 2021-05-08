import React from 'react'
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';

function Subtotal() {
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                    <p>
                        {/* part of the homework */}
                        Subtotal (0 items): <strong>0</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox"/> This order
                        contain a gift

                    </small>
                    </>
                )}
                decimalScale={2}
                value={0}  
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal;
