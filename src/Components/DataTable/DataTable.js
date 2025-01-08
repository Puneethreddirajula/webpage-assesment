import { useState } from 'react';
import './DataTable.css';
import { convertDateFormat, addDelimiter, sortedSales } from '../../util/helpers';

const DataTable = ({ sales }) => {
  const [sortBy, setSortBy] = useState('weekEnding');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  return (
    <table className='container'>
      <thead>
        <tr>
          <th onClick={() => toggleSortOrder('weekEnding')}>
            Week Ending <span className='arrow'>{sortBy === 'weekEnding' ? (sortOrder === 'asc' ? '▼' : '▲') : '▼'}</span>
          </th>
          <th onClick={() => toggleSortOrder('retailSales')}>
            Retail Sales <span className='arrow'>{sortBy === 'retailSales' ? (sortOrder === 'asc' ? '▼' : '▲') : '▼'}</span>
          </th>
          <th onClick={() => toggleSortOrder('wholesaleSales')}> 
            Wholesale Sales <span className='arrow'>{sortBy === 'wholesaleSales' ? (sortOrder === 'asc' ? '▼' : '▲') : '▼'}</span>
          </th>
          <th onClick={() => toggleSortOrder('unitsSold')}>
            Units Sold <span className='arrow'>{sortBy === 'unitsSold' ? (sortOrder === 'asc' ? '▼' : '▲') : '▼'}</span>
          </th>
          <th onClick={() => toggleSortOrder('retailerMargin')}>
            Retailer Margin <span className='arrow'>{sortBy === 'retailerMargin' ? (sortOrder === 'asc' ? '▼' : '▲') : '▼'}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedSales(sales, sortBy, sortOrder).map((sale, idx) => (
          <tr key={sale + idx}>
            <td>{convertDateFormat(sale.weekEnding)}</td>
            <td>${addDelimiter(sale.retailSales)}</td>
            <td>${addDelimiter(sale.wholesaleSales)}</td>
            <td>{sale.unitsSold}</td>
            <td>${addDelimiter(sale.retailerMargin)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
