import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCards from "../../components/gigCards/GigCards";
import { useQuery } from "@tanstack/react-query";
import requestMethod from "../../utils/requestMethod";
import { useLocation, useNavigate } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const minPrice = queryParams.get("min") || "";
  const maxPrice = queryParams.get("max") || "";

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["gigs", location.search],
    queryFn: async () => {
      try {
        const response = await requestMethod.get(`/gigs${location.search}`);
        return response.data.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const applyFilters = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("min", minRef.current.value);
    newSearchParams.set("max", maxRef.current.value);
    navigate(`/gigs?${newSearchParams.toString()}`);
  };

  const toggleSortMenu = () => {
    setOpen(!open);
  };

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("sort", type);
    history.push({
      pathname: "/gigs",
      search: newSearchParams.toString(),
    });
  };

  useEffect(() => {
    refetch();
  }, [sort, location.search]);

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
            <input
              ref={minRef}
              type="text"
              placeholder="min"
              defaultValue={minPrice}
            />
            <input
              ref={maxRef}
              type="text"
              placeholder="max"
              defaultValue={maxPrice}
            />
            <button onClick={applyFilters}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By</span>
            <span className="sortType" onClick={toggleSortMenu}>
              {sort === "sales" ? "Best Selling" : "Newest"}
              <img src="./img/down.png" alt="" />
            </span>
            {open && (
              <div className="rightMenu">
                <span onClick={() => reSort("sales")}>Best Selling</span>
                <span onClick={() => reSort("createdAt")}>Newest</span>
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
