import React from 'react';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { UserContext } from '../../App';
import './Shipment.css';
import { getDatabaseCart } from '../../utilities/databaseManager';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    const savedCart = getDatabaseCart(data);
    const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() };
    console.log(orderDetails);
    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
          alert('Your order placed successfully')
      })
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
      {errors.name && <span className="error">Name is required</span>}
      <input name="email" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
      {errors.email && <span className="error">Email is required</span>}
      <input name="address" {...register("address", { required: true })} placeholder="Your Address" />
      {errors.address && <span className="error">Address is required</span>}
      <input name="phone" {...register("phone", { required: true })} placeholder="Your phone number" />
      {errors.phone && <span className="error">Phone number is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;