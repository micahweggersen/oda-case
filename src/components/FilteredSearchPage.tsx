import { useState } from 'react';
import {
  Category,
  DataType,
  Product,
  QueryList,
  RecipeList,
  SearchParametersType,
} from '../types';
import { fetchData } from '../utils/fetchData';
import SearchInput from './filters/SearchInput';
import SearchQueryTags from './filters/SearchQueryTags';
import CategoryFilter from './filters/CategoryFilter';
import RecipeListView from './filters/RecipeListView';
import ProductListView from './filters/ProductListView';
import FilterComponent from './filters/FilterComponent';
import { Divider, Pagination } from 'antd';

const FilteredSearchPage: React.FC = () => {
  const [data, setData] = useState<DataType | undefined>();
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchParameters, setSearchParameters] =
    useState<SearchParametersType>({
      category: null,
      filters: null,
    });

  const onSearch = async (value: string, page = 1) => {
    setSearchValue(value);
    if (page > 1) {
      value = `${value}&page=${page}`;
    }
    const encodedValue = encodeURIComponent(value);
    const query = value ? 'query' : 'all';

    if (searchParameters?.filters) {
      const res = await fetchData(
        encodedValue,
        'filter',
        searchParameters.filters,
      );
      if (res) {
        setData({
          attributes: res.attributes,
          filters: res.filters,
          items: data?.items || [],
        });
        // Filter out only products from the items
        setFilteredItems(
          res.items?.filter(item => item.type === 'product') as Product[],
        );
      }
      return;
    }

    const res = await fetchData(encodedValue, query);
    if (res) {
      setData(res);
      setFilteredItems(
        res.items.filter(item => item.type === 'product') as Product[],
      );
    }
  };

  const onQueryClick = (query: string) => {
    setSearchValue(query);
    const encodedQuery = encodeURIComponent(query);
    onSearch(encodedQuery);
  };

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={onSearch}
        />

        {data && (
          <>
            <SearchQueryTags
              queryItems={data.items.filter(
                (item): item is QueryList => item.type === 'query_list',
              )}
              onQueryClick={onQueryClick}
            />

            <CategoryFilter
              categories={data.items.filter(
                (item): item is Category => item.type === 'category',
              )}
              selectedCategoryId={searchParameters.category}
              searchParameters={searchParameters}
              setSearchParameters={setSearchParameters}
            />
            {searchValue && (
              <FilterComponent
                filters={data.filters}
                setSearchParameters={setSearchParameters}
              />
            )}
          </>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 15,
        }}
      >
        {data && data.items.some(item => item.type === 'recipe_list') && (
          <>
            <Divider orientation="left">Oppskrifter</Divider>
            <RecipeListView
              recipes={data.items
                .filter(
                  (item): item is RecipeList => item.type === 'recipe_list',
                )
                .slice(0, 3)}
            />
          </>
        )}
        <Divider orientation="left">Produkter</Divider>
        <ProductListView products={filteredItems} />
        <Divider />
        <Pagination
          defaultCurrent={data?.attributes.page || 1}
          total={
            (data?.attributes.has_more_items
              ? (data?.attributes.page + 1) * 10
              : (data?.attributes.page ?? 1) * 10) || 10
          } // Placeholder total value
          onChange={page => {
            onSearch(searchValue, page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default FilteredSearchPage;
