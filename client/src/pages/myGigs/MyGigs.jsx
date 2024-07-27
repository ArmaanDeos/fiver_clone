import React from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import requestMethod from "../../utils/requestMethod";

const MyGigs = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: async () => {
      try {
        const response = await requestMethod.get(
          `/gigs?userId=${currentUser._id}`
        );
        console.log(response); // Debugging to check response
        return response.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    enabled: !!currentUser._id, // Only run query if userId is available
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return requestMethod.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title heading">
            <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img className="image" src={gig.coverImg} alt={gig.title} />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className="delete"
                      src="./img/delete.png"
                      alt="Delete"
                      onClick={() => handleDelete(gig._id)}
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

export default MyGigs;
