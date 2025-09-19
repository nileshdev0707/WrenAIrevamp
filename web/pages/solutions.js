import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "./layout";
import SolutionHero from "../components/solutions/solutionHero";
import { solutionsApi } from "../service/apiClient";
import SolutionsTab from "../components/solutions/solutionsTab";
import EnterPrise from "../components/solutions/enterPrise";
import Industry from "../components/solutions/Industry";
import PartnerEcosystem from "../components/solutions/partnerEcosystem";

export default function Solutions() {
  const [solutions, setSolutions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        
        const response = await solutionsApi();
        const solutionsRes = response.data;
        const solutionsData = solutionsRes?.data?.attributes ?? solutionsRes?.data ?? null;
        setSolutions(solutionsData);
      } catch (error) {
        console.error('Error fetching solutions data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  console.log("solutions ==> ", solutions);
    
  return (
    <Layout>
      {solutions?.hero.length > 0 && (
        <div className="max-w-7xl mx-auto lg:px-6 md:px-4 px-2">
             <SolutionHero data={solutions} />
             <SolutionsTab data={solutions} />
      </div>   
      )}
      {solutions?.EnterpriseFeaturesBlock.length > 0 && (
        <div className="bg-[#F7FBFE]">
          <EnterPrise data={solutions} />
        </div>
      )}
      {solutions?.ContentBlock.length > 0 && (
      <div className="max-w-7xl mx-auto lg:px-6 md:px-4 px-2">
        <Industry data={solutions} />
        <PartnerEcosystem data={solutions} />
      </div>
      )}
    </Layout>
  );
}
