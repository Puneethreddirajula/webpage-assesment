// Define the types for sales data and the structure of the totals
interface Sale {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
}

interface Totals {
    totalRetailSales: number;
    totalWholesaleSales: number;
    totalUnitsSold: number;
    totalRetailerMargin: number;
}

// Formatter functions with type annotations
export const dateFormatter = (date: string): string => {
    const [year, month, day] = date.split('-');
    const shortYear = year.slice(2);
    return `${month}-${day}-${shortYear}`;
};

export const formatMoney = (amount: number): string => {
    if (isNaN(amount)) {
        throw new Error('Invalid number');
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

// Month names as a constant array
export const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Function to calculate total sales by month
export const getTotalSalesByMonth = (sales: Sale[], monthShortName: string): Totals => {
    const monthIndex = monthNames.indexOf(monthShortName);

    if (monthIndex === -1) {
        throw new Error(`Invalid month short name: ${monthShortName}`);
    }

    let totalRetailSales = 0;
    let totalWholesaleSales = 0;
    let totalUnitsSold = 0;
    let totalRetailerMargin = 0;

    sales.forEach(sale => {
        const saleDate = new Date(sale.weekEnding + 'T00:00:00Z');
        if (saleDate.getUTCMonth() === monthIndex) {
            totalRetailSales += sale.retailSales;
            totalWholesaleSales += sale.wholesaleSales;
            totalUnitsSold += sale.unitsSold;
            totalRetailerMargin += sale.retailerMargin;
        }
    });

    return {
        totalRetailSales,
        totalWholesaleSales,
        totalUnitsSold,
        totalRetailerMargin
    };
};

// Function to get graph data based on sales
export const getGraphData = (sales: Sale[]) => {
    const graphData = monthNames.map(monthShortName => {
        const totals = getTotalSalesByMonth(sales, monthShortName);
        return {
            month: monthShortName.toUpperCase(),
            totalRetailSales: totals.totalRetailSales,
            totalRetailSalesStr: formatMoney(totals.totalRetailSales),
            totalWholesaleSales: totals.totalWholesaleSales,
            totalWholesaleSalesStr: formatMoney(totals.totalWholesaleSales),
            totalUnitsSold: totals.totalUnitsSold,
            totalRetailerMargin: totals.totalRetailerMargin,
            totalRetailerMarginStr: formatMoney(totals.totalRetailerMargin)
        };
    });
    return graphData;
};
