import React from "react";
import "./Messages.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import requestMethod from "../../utils/requestMethod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

const Messages = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      try {
        const response = await requestMethod.get(`/conversations`);
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      await requestMethod.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleClick = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title heading">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((con) => (
                <tr
                  className={
                    (currentUser.isSeller && !con.readBySeller) ||
                    (!currentUser.isSeller && !con.readByBuyer)
                      ? "active"
                      : ""
                  }
                  key={con.id}
                >
                  <td>{currentUser.isSeller ? con.buyerId : con.sellerId}</td>
                  <td>
                    <Link to={`/message/${con.id}`} className="link">
                      {con?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(con.updatedAt).fromNow()}</td>
                  <td>
                    {(currentUser.isSeller && !con.readBySeller) ||
                    (!currentUser.isSeller && !con.readByBuyer) ? (
                      <button onClick={() => handleClick(con.id)}>
                        Mark as Read
                      </button>
                    ) : null}
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

export default Messages;
