import React, { useEffect } from 'react';
import logo from './assets/stackline_logo.svg';
import SalesGraph from './SalesGraph';
import SalesTable from "./SalesTable";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './store/dataSlice';
import { fetchData } from './services/api';
import './App.css';
import { RootState, AppDispatch } from './store/store';

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.data);

    useEffect(() => {
        const getData = async () => {
            dispatch(fetchDataRequest());
            try {
                const result = await fetchData();
                dispatch(fetchDataSuccess(result[0]));
            } catch (error: any) {
                dispatch(fetchDataFailure(error.message));
            }
        };

        getData();
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App bg-grey-background">
            <header className="bg-blue-header">
                <div className="container mx-auto px-2 py-4 flex justify-between items-center">
                    <div>
                        <a href="https://www.stackline.com/" className="flex items-left">
                            <img src={logo} alt="Stackline Logo" className="h-12 w-32 mr-2"/>
                        </a>
                    </div>
                </div>
            </header>

            <div className="container mx-auto flex mt-20 h-100">
                <aside className="w-1/4 bg-white shadow-md">
                    <div className="rounded-lg mb-6 p-6 flex flex-col items-center justify-center shadow-sm">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/51h-a5IaHeL.jpg" alt="Retail Product" className="w-1/2 mb-4"/>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{data.title}</h2>
                        <p className="text-xs text-grey-text mb-1 pl-6 pr-6">{data.subtitle}</p>
                    </div>
                    <div className="shadow-sm">
                        <div className="flex flex-wrap gap-2 shadow-sm px-6 pt-0 pb-4">
                            {data.tags && data.tags.map((tag: string) => (
                                <span key={tag} className="bg-gray-200 text-gray-800 px-6 py-1 rounded-sm text-xs border border-grey-arrow">{tag}</span>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className="w-3/4 pl-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-16">
                        <h3 className="text-xl text-gray-800 mb-4">Retail Sales</h3>
                        <div>
                            <SalesGraph/>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm h-100 overflow-auto">
                        <SalesTable/>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
