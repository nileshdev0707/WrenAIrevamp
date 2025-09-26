import axios from "axios";
import { base, token } from "./serviceConfig";

const axiosApi = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
  timeout: 10000, // 10 seconds timeout
});

{
  /* Get Home Page */
}
const homePageApi = (lang) =>
  axiosApi.get(`/api/home-page?populate=*&lang=${lang}`);

{
  /* Get Solutions Page */
}
const solutionsApi = (lang) =>
  axiosApi.get(`/api/solutions-page?populate=*&lang=${lang}`);
const navigationApi = (lang) =>
  axiosApi.get(`/api/navigation?populate=*&lang=${lang}`);
const pagesApi = (lang) =>
  axiosApi.get(`/api/pages?fields=slug,navLabel,title,showInNav,navOrder`);

{
  /* Get Docs Page */
}
const getDocsApi = (lang) =>
  axiosApi.get(`/api/docs-page?populate=*&lang=${lang}`);

{
  /* Get Developers Page */
}
const getDevelopersApi = (lang) =>
  axiosApi.get(`/api/developers-page?populate=*&lang=${lang}`);

{
  /* Get Pricing Page */
}
const getPricingApi = (lang) =>
  axiosApi.get(`/api/pricing?populate=*&lang=${lang}`);

{
  /* Get Product Page */
}
const getProductApi = (lang) =>
  axiosApi.get(`/api/product-page?populate=*&lang=${lang}`);

{
  /* Get Contact Page */
}
const getContactApi = (lang) =>
  axiosApi.get(`/api/contact-page?populate=*&lang=${lang}`);

{
  /* Get Privacy Policy Page */
}
const getPrivacyPolicyApi = (lang) =>
  axiosApi.get(`/api/privacy-policy-page?populate=*&lang=${lang}`);

{
  /* Get Request Demo Page */
}
const getRequestDemoApi = (lang) =>
  axiosApi.get(`/api/request-page?populate=*&lang=${lang}`);

{
  /* Get Terms of Use Page */
}
const getTermsOfUseApi = (lang) =>
  axiosApi.get(`/api/terms-page?populate=*&lang=${lang}`);

{
  /* Get Solutions Industries Page */
}
const getSolutionsIndustriesApi = (lang) =>
  axiosApi.get(`/api/solutions-industries-page?populate=*&lang=${lang}`);

{
  /* Get Affiliate Program Page */
}
const getAffiliateProgramApi = (lang) =>
  axiosApi.get(`/api/affiliate-program?populate=*&lang=${lang}`);

const getSlaApi = (lang) =>
  axiosApi.get(`/api/sla-page?populate=*&lang=${lang}`);

export {
  getSlaApi,
  solutionsApi,
  homePageApi,
  navigationApi,
  pagesApi,
  getDocsApi,
  getDevelopersApi,
  getPricingApi,
  getProductApi,
  getContactApi,
  getPrivacyPolicyApi,
  getRequestDemoApi,
  getTermsOfUseApi,
  getAffiliateProgramApi,
  getSolutionsIndustriesApi,
};
