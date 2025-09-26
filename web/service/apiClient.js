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
const homePageApi = (lang) => axiosApi.get(`/api/home-page?populate=*&lang=${lang}`);
const solutionsApi = (lang) => axiosApi.get(`/api/solutions-page?populate=*&lang=${lang}`);
const navigationApi = () => axiosApi.get(`/api/navigation?populate=*`);
const pagesApi = () => axiosApi.get(`/api/pages?fields=slug,navLabel,title,showInNav,navOrder`);

{/* Get Docs Page */}
const getDocsApi = () => axiosApi.get(`/api/docs-page?populate=*`);

{/* Get Developers Page */}
const getDevelopersApi = (lang) => axiosApi.get(`/api/developers-page?populate=*&lang=${lang}`);

{/* Get Pricing Page */}
const getPricingApi = () => axiosApi.get(`/api/pricing?populate=*`);

{/* Get Product Page */}
const getProductApi = (lang) => axiosApi.get(`/api/product-page?populate=*&lang=${lang}`);

{/* Get Contact Page */}
const getContactApi = () => axiosApi.get(`/api/contact-page?populate=*`);

{/* Get Privacy Policy Page */}
const getPrivacyPolicyApi = () => axiosApi.get(`/api/privacy-policy-page?populate=*`);

{/* Get Request Demo Page */}
const getRequestDemoApi = () => axiosApi.get(`/api/request-page?populate=*`);

{/* Get Terms of Use Page */}
const getTermsOfUseApi = () => axiosApi.get(`/api/terms-page?populate=*`);

{/* Get Solutions Industries Page */}
const getSolutionsIndustriesApi = () => axiosApi.get(`/api/solutions-industries-page?populate=*`);

{/* Get Affiliate Program Page */}
const getAffiliateProgramApi = () => axiosApi.get(`/api/affiliate-program?populate=*`);

const getSlaApi = () => axiosApi.get(`/api/sla-page?populate=*`);

export { getSlaApi,  solutionsApi,homePageApi, navigationApi, pagesApi, getDocsApi, getDevelopersApi, getPricingApi, getProductApi, getContactApi, getPrivacyPolicyApi, getRequestDemoApi, getTermsOfUseApi, getAffiliateProgramApi, getSolutionsIndustriesApi };