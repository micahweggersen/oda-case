import React, { useState, useEffect } from 'react';
import { DataType, SearchParametersType } from '../../types';
import { Button, Typography } from 'antd';

interface FilterComponentProps {
  filters: DataType['filters'];
  setSearchParameters: React.Dispatch<
    React.SetStateAction<SearchParametersType>
  >;
}

const { Title } = Typography;

const FilterComponent: React.FC<FilterComponentProps> = ({
  filters,
  setSearchParameters,
}) => {
  // State to keep track of active filters
  const [activeFilters, setActiveFilters] = useState<
    { name: string; value: string }[]
  >([]);

  // Effect to update `setSearchParameters` whenever `activeFilters` changes
  useEffect(() => {
    const filterString = activeFilters
      .map(filter => `${filter.name}:${filter.value}`)
      .join(',');

    setSearchParameters(prevParams => ({
      ...prevParams,
      filters: filterString,
    }));
  }, [activeFilters, setSearchParameters]);

  // Function to handle filter toggling
  const setFilters = (name: string, value: string) => {
    setActiveFilters(prevFilters => {
      const isFilterActive = prevFilters.some(
        filter => filter.name === name && filter.value === value,
      );

      return isFilterActive
        ? prevFilters.filter(
            filter => !(filter.name === name && filter.value === value),
          )
        : [...prevFilters, { name, value }];
    });
  };

  if (filters.length === 0) return null;

  return (
    <div>
      <div>
        {filters && (
          <>
            <Title level={3}>Filters:</Title>
            <Button.Group
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {filters.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => setFilters(item.name, item.value)}
                  type={
                    activeFilters.some(
                      filter =>
                        filter.name === item.name &&
                        filter.value === item.value,
                    )
                      ? 'primary'
                      : 'default'
                  }
                >
                  {item.display_value}
                </Button>
              ))}
            </Button.Group>
          </>
        )}
      </div>

      <div>
        {filters && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {filters.map((item, index) => (
              <div key={index}>
                <p>{item.active ? item.display_value + ' ✓' : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
