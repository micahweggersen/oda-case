import { DataType, QuerySettings } from '../types';

let currentValue = '';

export const fetchData = async (
  value: string,
  route: QuerySettings, // Add route as a parameter to decide which endpoint to call
  filters?: string,
) => {
  currentValue = value;

  try {
    let endpoint = '';

    switch (route) {
      case 'query':
        endpoint = `http://localhost:5000/proxy/oda/query?q=${value}`;
        break;
      case 'all':
        endpoint = `http://localhost:5000/proxy/oda/all`;
        break;
      case 'filter':
        endpoint = `http://localhost:5000/proxy/oda/filter?q=${value}&filters=${filters}`;
        break;
      default:
        throw new Error('Invalid route');
    }
    console.log('fetching data from:', endpoint);
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: DataType = await response.json();

    if (currentValue === value) {
      return data;
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
