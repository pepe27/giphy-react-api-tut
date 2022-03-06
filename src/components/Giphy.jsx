import React, { useEffect, useState } from "react";
import axios from "axios";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //false

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "g1WcrQoGleoVrPKTSOOatDa1DZ6VZBF8",
          limit: 20,
        },
      });

      console.log(results);
      setData(results.data.data); //based on the results Object
    };

    fetchData();
  }, []); //empty array as the 2nd parameter to useEffect()

  const renderGifs = () => {
    if (isLoading) {
      return <div className="">Loading...</div>;
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
