import React, { useState, useEffect } from 'react';
import { getCategories, getDataSources, getAllCategories } from '../../services/dashboardService';
import './dashboard.css';

const CategoryView = ({ sectionId, onSelectDataSource }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [accessibleCategories, setAccessibleCategories] = useState([]);
  const [dataSources, setDataSources] = useState([]);

  useEffect(() => {
    const fetchDataSources = async () => {
      try {
        const result = await getDataSources(); 
        setDataSources(result);
      } catch (error) {
        console.error('Error fetching data sources:', error);
      }
    };

    fetchDataSources();
  }, []);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const result = await getAllCategories(); 
        setAllCategories(result);
      } catch (error) {
        console.error('Error fetching all categories:', error);
      }
    };

    fetchAllCategories();
  }, []);

  useEffect(() => {
    const fetchAccessibleCategories = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.data.data.userid : null;

        if (userId && sectionId) {
          const result = await getCategories(userId, sectionId);
          setAccessibleCategories(result || []);
        }
      } catch (error) {
        console.error('Error fetching accessible categories:', error);
      }
    };

    fetchAccessibleCategories();
  }, [sectionId]);

  const accessibleCategoryIds = new Set(accessibleCategories.map(cat => cat.id));

  return (
    <div className="category-view">
      {allCategories.length === 0 ? (
        <p>Loading categories...</p>
      ) : (
        allCategories.map(category => (
          <div
            key={category.id}
            className={`category ${!accessibleCategoryIds.has(category.id) ? 'locked' : ''}`}
          >
            <h3>{category.name}</h3>
            {accessibleCategoryIds.has(category.id) ? (
              <>
                <div className="data-source-buttons">
                  {dataSources.length === 0 ? (
                    <p>Loading data sources...</p>
                  ) : (
                    dataSources.map(dataSource => (
                      <button
                        key={dataSource.id}
                        onClick={() => onSelectDataSource(category, dataSource.name)}
                      >
                        {dataSource.name}
                      </button>
                    ))
                  )}
                </div>
              </>
            ) : (
              <p>Access Denied</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryView;
