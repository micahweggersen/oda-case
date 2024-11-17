import { DataType } from '../types';

export function filterResults(data: DataType): DataType['items'] {
  //TODO: Use type:"product" in url to filter the results instead of filtering here, this is a temporary solution
  const results = data.items.filter(item => {
    switch (item.type) {
      case 'query':
        return false;
      case 'query_list':
        return false;
      case 'product':
        return true;
      case 'product_list':
        return false;
      case 'category':
        return false;
      case 'recipe':
        return false;
      case 'recipe_list':
        return false;
      default:
        return true;
    }
  });
  return results;
}
