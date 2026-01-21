import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { errorNotify, successNotify } from "../utils/Toast";

const useFetchById = (url) => {
  const [response, setResponse] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(url, {
          withCredentials: true,
        });
        setResponse(res.data);
      } catch (error) {
        errorNotify(error.response.data.message);
      }
    };
    fetch();
  }, []);

  return { response };
};

export default useFetchById;
