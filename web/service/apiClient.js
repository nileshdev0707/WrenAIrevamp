import axios from "axios";
import { base, token } from "./serviceConfig";

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

{/* Get Docs Page */}
const getDocsApi = () => axiosApi.get(`/api/docs-page?populate=*`);

{/* Get Developers Page */}
const getDevelopersApi = () => axiosApi.get(`/api/developers-page?populate=*`);

{/* Get Pricing Page */}
const getPricingApi = () => axiosApi.get(`/api/pricing?populate=*`);

{/* Get Product Page */}
const getProductApi = () => axiosApi.get(`/api/product-page?populate=*`);

export { solutionsApi, navigationApi, pagesApi, getDocsApi, getDevelopersApi, getPricingApi, getProductApi };