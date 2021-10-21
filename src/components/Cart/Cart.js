import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    //  console.log(cart);
    const formateNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    // const total = cart.reduce((total,prd) => total + prd.price , 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity ;
    }

    let shipping = 0;
    if(total > 35){
        shipping  = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const tax = total/10;
    const grandTotal = total + shipping + tax;
    
    return (
        <div>
            <h4 className = "text-danger">Order Summery</h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price : {formateNumber(total)}</p>
            <p><small>Shipping Price : {shipping}</small></p>
            <p><small>Tax : {formateNumber(tax)}</small></p>
            <p>Total : {formateNumber(grandTotal)}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;