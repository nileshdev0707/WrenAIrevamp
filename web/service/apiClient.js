import axios from "axios";
import { base, token } from "./serviceConfig";
console.log("token ==> ", token);

const axiosApi = axios.create({
  baseURL: base,
  headers: {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  timeout: 10000, // 10 seconds timeout
});

 const solutionsApi = () => axiosApi.get(`/api/solutions-page?populate=*`);
const navigationApi = () => axiosApi.get(`/api/navigation?populate=*`);
const pagesApi = () => axiosApi.get(`/api/pages?fields=slug,navLabel,title,showInNav,navOrder`);


export { solutionsApi, navigationApi, pagesApi };