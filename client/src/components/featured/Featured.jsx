import React, { useState, useRef, useEffect } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Function to handle search
  const handleSearch = () => {
    navigate(`/gigs?search=${input}`);
  };

  // Function to handle clearing input
  const clearInput = () => {
    setInput("");
    inputRef.current.focus(); // Set focus back to input after clearing
  };

  // Function to handle popular searches
  const handlePopularSearch = (term) => {
    navigate(`/gigs?search=${term}`);
  };

  // Function to handle keyboard events
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Set focus on input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="Search Icon" />
              <input
                ref={inputRef}
                type="text"
                placeholder='Try "building mobile app"'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {input && ( // Show clear button if input is not empty
                <button className="clearButton" onClick={clearInput}>
                  <img src="./img/clear.png" alt="Clear Icon" />
                </button>
              )}
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => handlePopularSearch("Web Design")}>
              Web Design
            </button>
            <button onClick={() => handlePopularSearch("WordPress")}>
              WordPress
            </button>
            <button onClick={() => handlePopularSearch("Logo Design")}>
              Logo Design
            </button>
            <button onClick={() => handlePopularSearch("AI Services")}>
              AI Services
            </button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="Man Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
