import { Input } from 'antd';

const { Search } = Input;

interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  setSearchValue,
  onSearch,
}) => (
  <Search
    placeholder="Søk etter produkter"
    allowClear
    enterButton="Søk"
    size="large"
    onSearch={onSearch}
    value={decodeURIComponent(searchValue)}
    onChange={e => setSearchValue(e.target.value)}
  />
);

export default SearchInput;
