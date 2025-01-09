import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from './redux/dataSlice';
import Header from './Components/Header/Header';
import LineGraph from './Components/LineGraph/LineGraph';
import ProductOverview from './Components/ProductOverview/ProductOverview';
import DataTable from './Components/DataTable/DataTable';
import apiData from './util/data.json';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.data);

  useEffect(() => {
    const simulateApiCall = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(apiData);
        }, 1000);
      });
    };

    const fetchData = async () => {
      dispatch(fetchDataStart());
      try {
        const response = await simulateApiCall();
        dispatch(fetchDataSuccess(response));
      } catch (error) {
        dispatch(fetchDataFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {!loading && data && (
        <>
          <Header />
          <div className="main-content">
            <ProductOverview data={data} />
            <div className="bar">
              <LineGraph sales={data.sales} />
              <DataTable sales={data.sales} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
