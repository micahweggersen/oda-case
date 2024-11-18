import { Select, SelectProps } from 'antd';
import { useState, useCallback } from 'react';
import { DataType, Product, QuerySettings, SearchSettings } from '../types';
import { fetchData } from '../utils/fetchData';
import { filterResults } from '../utils/filter';

interface SearchProps {
  personalList: Product[];
  setPersonalList: React.Dispatch<React.SetStateAction<Product[]>>;
  type: SearchSettings;
  query: QuerySettings;
}

const SearchContainer: React.FC<SearchProps> = ({
  personalList,
  setPersonalList,
  query,
}) => {
  const [selectData, setSelectData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<number>();
  const [results, setResults] = useState<DataType['items']>([]);

  const handleSearch = useCallback(
    async (searchValue: string) => {
      const results = await fetchData(searchValue, query);
      if (!results) {
        return;
      }
      const filteredResults = filterResults(results as DataType);

      setResults(filteredResults);
      setSelectData(
        filteredResults.map((item, i) => ({
          value: i,
          label:
            'name' in item.attributes
              ? item.attributes.name + ' - ' + item.type
              : 'display_name' in item.attributes &&
                item.attributes.display_name + ' - ' + item.type,
        })),
      );
    },
    [query], // Dependencies for useCallback
  );

  const handleChange = (newValue: number) => {
    const item = results[newValue];
    const validItem = item.type === 'product' ? (item as Product) : null;
    if (validItem) {
      setPersonalList([...personalList, validItem]);
    }
    setValue(newValue);
  };

  return (
    <>
      <Select
        showSearch
        value={value}
        placeholder={'Søk'}
        style={{ width: 400 }}
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={selectData || []}
      />
    </>
  );
};

export default SearchContainer;
