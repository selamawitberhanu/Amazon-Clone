import React, { useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useContext } from "react";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/Axios.js";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type.js";

function Payment() {
  // 🔁 Make sure your DataContext returns [state, dispatch]
  const { state, dispatch }= useContext(DataContext);
  const { user, basket } = state;

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const totalPrice = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e?.error?.message ? e.error.message : "");
  };

  const [processing, setProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe has not loaded yet.");
      return;
    }

    setProcessing(true);

    try {
      // Step 1: Create payment intent
      const response = await axiosInstance({
        method: "post",
        url: `/payments/create?total=${Math.round(totalPrice * 100)}`,
      });

      const clientSecret = response.data?.clientSecret;
       console.log("Client Secret:", clientSecret);
      if (!clientSecret) {
        throw new Error("Failed to get payment details.");
      }

      // Step 2: Confirm card payment
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  console.log("Payment Intent:", paymentIntent);
     console.log("user.uid:", user.uid);
        // Step 3: Save order to Firestore
        const orderRef = doc(
          collection(db, "users", user.uid, "orders"),
          paymentIntent.id
        );
   console.log("Order Reference:", orderRef);
   console.log("Basket:", basket);
   console.log("Payment Amount:", paymentIntent.amount);
console.log("Payment Created At:", paymentIntent.created);

        await setDoc(orderRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        // Clear basket
        dispatch({ type: Type.EMPTY_BASKET });
       setProcessing(false);
        // Redirect to orders page
        navigate("/orders");
      
       
    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error.message || "An error occurred during payment.");
      setProcessing(false);
    } 
    
  };

//   await db
//   .collection("users")
//   .doc(user.uid)
//   .collection("orders")
//   .doc(paymentIntent.id)
//   .set({
//     basket: basket,
//     amount: paymentIntent.amount,
//     created: paymentIntent.created,
//   });


//    setProcessing(false);
// }
// catch (error) {
//   console.log(error);
//   setProcessing(false);
  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>

      {/* Payment Section */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* Products */}
        < div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div className={classes.product_container}>
              {basket?.map((item) => (
            <ProductCard key={item.id} product={item} flex={true} />
          ))}
          </div>
      
        </div>
        <hr />

        {/* Card Form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* Error Display */}
                {cardError && (
                  <small className={classes.error}>{cardError}</small>
                )}

                {/* Card Element */}
                <CardElement onChange={handleChange} />

                {/* Price Summary */}
                <div className={classes.payment_price}>
                <div>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <p>Total Order |</p>
                    <CurrencyFormat amount={totalPrice} />
                  </span>
                </div>
                  
                

                {/* Submit Button */}
                <button type="submit" disabled={processing || !stripe}>
                  {processing ? (
                    <div className={classes.loading}>
                      <ClipLoader color="gray" size={12} />
                      <p>Please Wait ...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;