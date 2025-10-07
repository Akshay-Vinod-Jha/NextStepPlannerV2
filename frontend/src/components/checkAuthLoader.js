import axios from "axios";
import { getApiUrl } from '../config/config.js';

export const checkUserAuthLoader = async () => {
  try {
    const res = await axios.post(getApiUrl("/gettokendetails"), 
        {},
        {
      withCredentials: true, 
    });

    // Optional: return user data to route
    return res.data;
  } catch (err) {
    throw new Response("Unauthorized", {
      status: 302,
      headers: { Location: "/signin" },
    });
  }
};


export const checkAdminAuthLoader = async () => {
  try {
    const res = await axios.post(getApiUrl("/gettokendetails"), 
        {},
        {
      withCredentials: true,
    });

   const role = res.data.role;
    console.log(role);
    if(role !== 'ADMIN')
    {
      return  new Response("Forbidden", {
      status: 302,
      headers: { Location: "*" },
    })
  }
  return res.data;
  } catch (err) {
    console.log(err);
    throw new Response("Unauthorized", {
      status: 302,
      headers: { Location: "/signin" },
    });
  }
};