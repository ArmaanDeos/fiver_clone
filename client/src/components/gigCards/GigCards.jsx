import React from "react";
import "./GigCards.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import requestMethod from "../../utils/requestMethod";

const GigCards = ({ item }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gigUser"],
    queryFn: async () => {
      return await requestMethod.get(`/users/${item.userId}`).then((res) => {
        return res.data.data;
      });
    },
  });
  console.log(data);

  return (
    <Link to={`/gig/${item._id}`}>
      <div className="gigCard">
        <img src={item.coverImg} alt="" />
        <div className="info">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong"
          ) : (
            <div className="user">
              <img src={data.img || "./img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starsNum) &&
                item.starNumber !== 0 &&
                Math.round(item.totalStars / item.starsNum)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCards;
