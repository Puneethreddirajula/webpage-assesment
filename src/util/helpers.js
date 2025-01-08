
/**
 * Sorts an array of sales objects based on a specified column and sorting order.
 *
 * @param {array} sales - The array of sales objects to be sorted.
 * @param {string} sortBy - The column name by which the array should be sorted.
 * @param {string} sortOrder - The sorting order ('asc' for ascending, 'desc' for descending).
 * @returns {array} - A new array containing the sorted sales objects.
 */
export const sortedSales = (sales, sortBy, sortOrder) => {
  const t = sales.slice().sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }
  });
  console.log(t)
  return t;
};

/**
 * Converts the format of a date string from 'YYYY-MM-DD' to 'MM-DD-YY'.
 * 
 * @param {string} date - The input date string in the 'YYYY-MM-DD' format.
 * @returns {string} - The output is a date string in the 'MM-DD-YY' format.
*/
export const convertDateFormat = (date) => {
  const dateArray = date.split('-');
  const newDateFormat = `${dateArray[1]}-${dateArray[2]}-${dateArray[0].substring(2)}`;
  return newDateFormat;
} 

/**
 * Attaches a ',' to every third integer 
 * 
 * @param {number} value - The input value is a number 
 * @returns {string} - The output is a string of integers with a ',' separating at every third number
*/
export const addDelimiter = (value) => {
  const formattedNumber = value.toLocaleString();
  return formattedNumber;
}

