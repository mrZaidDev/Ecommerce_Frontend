import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const useFetchById = (url) => { //how to use multiple states in any other ///////////ZZZZZZZZZZ
  const [response, setResponse] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(url, {
          withCredentials: true,
        });
        setResponse(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return { response };
};

export default useFetchById;
