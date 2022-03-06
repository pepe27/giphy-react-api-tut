import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //false

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "g1WcrQoGleoVrPKTSOOatDa1DZ6VZBF8",
          limit: 25, //set this number higher, to check the Loader is working
        },
      });

      console.log(results);
      setData(results.data.data); //based on the results Object
      setIsLoading(false); //change the state of the Loader to false, after the data is loaded! Now that state is changed, renderGifs() runs again, and returns the mapped data into the <img src={}>
    };

    fetchData();
  }, []); //empty array as the 2nd parameter to useEffect()

  const renderGifs = () => {
    if (isLoading) {
      return <Loader />;
    }

    return data.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} alt={el.images.title} />
        </div>
      );
    });
  };

  return <div className="container gifs">{renderGifs()}</div>;
};

export default Giphy;
