import React, { useState, useEffect } from 'react';
import { getSections, getCharts, getAllCategories } from '../services/dashboardService';
import SectionTabs from '../components/dashboard/sectiontab';
import CategoryView from '../components/dashboard/categoryview';
import Chart from '../components/dashboard/chart';
import './homepage.css';

const HomePage = () => {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [charts, setCharts] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [loadingSections, setLoadingSections] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingCharts, setLoadingCharts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.data.data.userid : null;
        

        setLoadingSections(true);
        const sectionsData = await getSections(userId);
        setSections(sectionsData);

        setLoadingCharts(true);
        const chartsData = await getCharts();
        setCharts(chartsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingSections(false);
        setLoadingCharts(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      if (selectedSection) {
        setLoadingCategories(true);
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          const userId = user ? user.data.data.userid : null;

          const categoriesData = await getAllCategories(userId, selectedSection.id);
          setCategories(categoriesData || []);
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setLoadingCategories(false);
        }
      }
    };

    fetchCategories();
  }, [selectedSection]);

  useEffect(() => {
    const fetchCharts = async () => {
      if (selectedCategory && selectedDataSource) {
        setLoadingCharts(true);
        try {
          const chartsData = await getCharts();
          setCharts(chartsData);
        } catch (error) {
          console.error("Error fetching charts:", error);
        } finally {
          setLoadingCharts(false);
        }
      }
    };

    fetchCharts();
  }, [selectedCategory, selectedDataSource]);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setSelectedCategory(null); 
    setSelectedDataSource(null);
    setCharts([]); 
  };

  const handleDataSourceClick = async (category, dataSourceName) => {
    setSelectedCategory(category);
    setSelectedDataSource(dataSourceName);

    try {
      const chartsData = await getCharts();
      setCharts(chartsData);
    } catch (error) {
      console.error("Error fetching charts:", error);
    }
  };

  const getUser = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.data ? user.data.data.userCategories : [];
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return [];
    }
  };

  const user = getUser();
  const filteredCategories = categories.filter(cat =>
    user.some(userCat => userCat.category.id === cat.id)
  );

  return (
    <div className="home-page">
      {loadingSections ? (
        <p>Loading sections...</p>
      ) : (
        <SectionTabs
          sections={sections}
          onSelectSection={handleSectionSelect}
          activeSection={selectedSection}
        />
      )}
      {selectedSection && (
        <>
          <h2>{selectedSection.name} Dashboard</h2>
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : (
            <CategoryView
              sectionId={selectedSection.id}
              categories={filteredCategories}
              onSelectDataSource={handleDataSourceClick}
            />
          )}
        </>
      )}
      {selectedCategory && selectedDataSource && (
         <div className="charts">
         {loadingCharts ? (
           <p>Loading charts...</p>
         ) : (
           charts.length > 0 ? (
             charts
               .filter(chart => chart.categoryCharts.some(catChart => catChart.category.id === selectedCategory.id))
               .map(chart => (
                 <Chart key={chart.id} data={chart} dataSource={selectedDataSource} />
               ))
           ) : 
           (
             <p>No charts available for the selected data source.</p>
           )
         )}
       </div>
     )}
   </div>
  );
};

export default HomePage;
