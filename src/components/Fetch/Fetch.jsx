import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const Fetch = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const getData = () => {
    axios.get("https://picsum.photos/v2/list").then((response) => {
      setFetchedData(response.data);
    });
  };
  return (
    <>
      <div>
        <h1>Fetch Image List</h1>
        <Button variant="primary" onClick={getData}>
          Fetch
        </Button>
      </div>
      <div className="imageHolder">
        {fetchedData &&
          fetchedData.map((image) => {
            return (
              <div key={image.id}>
                <img
                  className="imageList"
                  src={image.download_url}
                  alt={image.author}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Fetch;
