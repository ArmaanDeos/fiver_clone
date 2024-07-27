import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducers } from "../../reducers/gigReducers";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import requestMethod from "../../utils/requestMethod";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducers, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_FEATURES", payload: e.target[0].value });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    if (!singleFile && file.length === 0) {
      console.log("No files to upload");
      return;
    }

    setUploading(true);
    try {
      const cover = singleFile ? await upload(singleFile) : null;

      const images = await Promise.all([...file].map(upload));

      dispatch({
        type: "ADD_IMAGES",
        payload: { coverImg: cover, images: images },
      });
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => requestMethod.post("/gigs/create", gig),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/myGigs");
  };

  console.log(state);

  return (
    <div className="add">
      <div className="container">
        <div className="heading">
          <h1>Add New Gig</h1>
        </div>
        <div className="sections">
          <div className="info">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="e.g. I will do something I'm really good at"
              name="title"
              onChange={handleChange}
            />
            <label htmlFor="cat">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInput">
                <label htmlFor="cover">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="images">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFile(e.target.files)}
                />
              </div>
              <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Uploaded"}
              </button>
            </div>
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleCreate}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="shortTitle">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              name="shortDesc"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="features">Add Features</label>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((feature) => (
                <div className="item" key={feature}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURES", payload: feature })
                    }
                  >
                    {feature} <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="price">Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
