import React from "react";
import "./SingleGig.scss";
import "react-alice-carousel/lib/alice-carousel.css";
import GigSLider from "../../components/gigSlider/GigSLider";
import requestMethod from "../../utils/requestMethod";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Reviews from "../../components/reviews/Reviews";

const SingleGig = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["gig"],
    queryFn: async () => {
      try {
        const response = await requestMethod.get(`/gigs/single/${id}`);
        return response.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await requestMethod.get(`/users/${data.userId}`);
        return response.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  console.log(userData);

  return (
    <div className="gig">
      {isLoading && <div>Loading...</div>}
      {error && <div>Something went wrong</div>}
      {data && (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Liverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {userLoading ? (
              "Loading..."
            ) : userError ? (
              "Something went wrong"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={userData.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span>{userData.username}</span>
                {!isNaN(data.totalStars / data.starsNum) &&
                  data.starNumber !== 0 && (
                    <div className="stars">
                      {Array(Math.round(data.totalStars / data.starsNum))
                        .fill()
                        .map((item, i) => (
                          <img src="/img/star.png" alt="" key={i} />
                        ))}

                      <span>{Math.round(data.totalStars / data.starsNum)}</span>
                    </div>
                  )}
              </div>
            )}
            {/* Slider */}
            <div className="sliders">
              <GigSLider item={data} />
            </div>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {userLoading ? (
              "Loading..."
            ) : userError ? (
              "Something went wrong"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={userData.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{userData.username}</span>
                    {!isNaN(data.totalStars / data.starsNum) &&
                      data.starNumber !== 0 && (
                        <div className="stars">
                          {Array(Math.round(data.totalStars / data.starsNum))
                            .fill()
                            .map((item, i) => (
                              <img src="/img/star.png" alt="" key={i} />
                            ))}

                          <span>
                            {Math.round(data.totalStars / data.starsNum)}
                          </span>
                        </div>
                      )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">
                        {userData.country.toUpperCase()}
                      </span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{userData.desc}</p>
                </div>
              </div>
            )}

            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} days delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="feature">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleGig;
