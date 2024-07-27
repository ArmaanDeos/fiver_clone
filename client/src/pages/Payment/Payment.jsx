import React, { useEffect, useState } from "react";
import "./Payment.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import requestMethod from "../../utils/requestMethod";
import { useParams } from "react-router-dom";
import CheckOutForm from "../../components/checkoutForm/CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51PKJeqBrh4yFtngK9J4Hx4kRePUtMPQEeNn8uwflEjMElb0LVleTjN8tK5s0hiSx53iV97lKtyZ0Z7PH1jmraMoa00re36O9U8"
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await requestMethod.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [id]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
