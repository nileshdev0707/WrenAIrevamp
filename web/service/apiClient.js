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
const homePageApi = () => axiosApi.get(`/api/home-page?populate=*`);
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

{/* Get Contact Page */}
const getContactApi = () => axiosApi.get(`/api/contact-page?populate=*`);

{/* Get Privacy Policy Page */}
const getPrivacyPolicyApi = () => axiosApi.get(`/api/privacy-policy-page?populate=*`);

{/* Get Request Demo Page */}
const getRequestDemoApi = () => axiosApi.get(`/api/request-page?populate=*`);

{/* Get Terms of Use Page */}
const getTermsOfUseApi = () => axiosApi.get(`/api/terms-page?populate=*`);

export { solutionsApi,homePageApi, navigationApi, pagesApi, getDocsApi, getDevelopersApi, getPricingApi, getProductApi, getContactApi, getPrivacyPolicyApi, getRequestDemoApi, getTermsOfUseApi };