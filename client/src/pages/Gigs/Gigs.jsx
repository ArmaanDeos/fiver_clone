import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCards from "../../components/gigCards/GigCards";
import { useQuery } from "@tanstack/react-query";
import requestMethod from "../../utils/requestMethod";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: async () => {
      try {
        const response = await requestMethod.get(
          `/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        );
        return response.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });
  console.log(data);

  const apply = () => {
    refetch();
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr - Graphics & Design -</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="text" placeholder="min" />
            <input ref={maxRef} type="text" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType">
              <span className="sortType">
                {sort === "sales" ? "Best Selling" : "Newest"}
              </span>
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        <div className="gigs-card">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong..."
            : data.map((gig) => <GigCards key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
