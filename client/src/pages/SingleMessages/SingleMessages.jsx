import React from "react";
import "./SingleMessages.scss";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import requestMethod from "../../utils/requestMethod";
import { useSelector } from "react-redux";

const SingleMessages = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      requestMethod.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);

  const mutation = useMutation({
    mutationFn: async (message) => {
      return await requestMethod.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt; John Doe &gt;
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <div>Something went wrong: {error.message}</div>
        ) : (
          <div className="messages">
            {data?.map((message) => {
              console.log("Message ID:", message.userId);
              console.log("Current User ID:", currentUser._id);
              return (
                <div
                  className={
                    message.userId === currentUser._id ? "owner item" : "item"
                  }
                  key={message.id}
                >
                  <img
                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt="User"
                  />
                  <p>{message.desc}</p>
                </div>
              );
            })}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea name="desc" placeholder="write a message" required />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default SingleMessages;
