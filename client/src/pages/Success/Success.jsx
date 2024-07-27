import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import requestMethod from "../../utils/requestMethod";

const Success = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const url = new URLSearchParams(search);
  const payment_intent = url.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await requestMethod.put(`/orders`, { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [navigate, payment_intent]);

  return (
    <div>
      Payment Successful.You are redirected to orders page.Please wait...
    </div>
  );
};

export default Success;
