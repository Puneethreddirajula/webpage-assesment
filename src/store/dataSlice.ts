import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dateFormatter, formatMoney, getGraphData } from './utils';

// Define the types for sales data
interface Sale {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
    formattedDate?: string;
    retailSalesStr?: string;
    wholesaleSalesStr?: string;
    retailerMarginStr?: string;
}

// Define the type for the initial state
interface DataState {
    data: {
        sales?: Sale[];
        title?: string;
        subtitle?: string;
        tags?: string[];
    };
    graphData: any[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: DataState = {
    data: {},
    graphData: [],
    loading: true,
    error: null,
};

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        fetchDataRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action: PayloadAction<{ sales: Sale[] }>) => {
            action.payload.sales.forEach(sale => {
                sale.formattedDate = dateFormatter(sale.weekEnding);
                sale.retailSalesStr = formatMoney(sale.retailSales);
                sale.wholesaleSalesStr = formatMoney(sale.wholesaleSales);
                sale.retailerMarginStr = formatMoney(sale.retailerMargin);
            });
            state.data = action.payload;
            state.graphData = getGraphData(action.payload.sales);
            state.loading = false;
            state.error = null;
        },
        fetchDataFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;

export default dataSlice.reducer;
