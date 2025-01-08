import { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import LineGraph from './Components/LineGraph/LineGraph';
import ProductOverview from './Components/ProductOverview/ProductOverview';
import DataTable from './Components/DataTable/DataTable';
import apiData from './util/data.json';
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await simulateApiCall();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }finally{
        setLoading(false);
      }
    })()
  },[]);

  const simulateApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(apiData);
      }, 1000); 
    });
  };

  return (
    <>
      
      {loading && ( 
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {!loading && (
        <>
          <Header />
          <div className="main-content">
            <ProductOverview data={data}/>
            <div className="bar">
              <LineGraph sales={data.sales}/>
              <DataTable sales={data.sales}  />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
