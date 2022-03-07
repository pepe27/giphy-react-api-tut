import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader";
import Paginate from "./Paginate";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  //these 2 variables are used for slice() the data[]
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  //Page1 item 1 - item 25
  //Page2 item 26 - item 50
  //Page3 item 51 - item 75
  //to figure out the last number of ALL Pages, by multiply it by the items/per page
  //to figure out, the first number within a page, take the last item subtracted by the itemsPerPage

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false); //assume no errors at first
      setIsLoading(true);

      //Error Handling: Wrap the API Call in a try/catch statement
      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "g1WcrQoGleoVrPKTSOOatDa1DZ6VZBF8",
            limit: 100,
          },
        });

        console.log(results);
        setData(results.data.data); //based on the results Object
      } catch (err) {
        // console.log(err);
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      }

      setIsLoading(false); //change after the data is loaded. Now State is changed so renderGifs() runs again, and returns the mapped data into the <img src={}> that the user sees.
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

  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes.
        </div>
      );
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value); //e = whatever the user inputs
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevent page reload
    setIsError(false); //false @@@@@@@@@@@@
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "g1WcrQoGleoVrPKTSOOatDa1DZ6VZBF8",
          q: search,
          limit: 40,
        },
      });
      setData(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
    }
    setIsLoading(false);
  };

  return (
    <div className="m-2">
      {renderError()}
      <form className="form-inline justify-content-center m-2">
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          onChange={handleSearchChange}
          value={search}
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mx-2"
        >
          Go
        </button>
      </form>
      <div className="container gifs">{renderGifs()}</div>
    </div>
  );
};

export default Giphy;
