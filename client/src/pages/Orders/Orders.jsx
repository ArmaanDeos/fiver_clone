import React from "react";
import "./Orders.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import requestMethod from "../../utils/requestMethod";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await requestMethod.get("/orders");
        console.log(res);
        return res.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async (orderId) => {
      await requestMethod.delete(`/orders/${orderId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;
    try {
      const res = await requestMethod.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await requestMethod.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title heading">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>
                    <img className="image" src={item.img} alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <img
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handleContact(item)} // Pass item to handleContact
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
