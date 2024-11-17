import { Tag, Typography } from 'antd';
import { QueryList } from '../../types';

interface SearchQueryTagsProps {
  queryItems: QueryList[];
  onQueryClick: (query: string) => void;
}
const { Title } = Typography;

const SearchQueryTags: React.FC<SearchQueryTagsProps> = ({
  queryItems,
  onQueryClick,
}) => {
  if (queryItems.length === 0) {
    return null;
  }
  return (
    <>
      <Title level={3}>Forslag til søk:</Title>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {queryItems.map(item =>
          item.items.map((queryItem, index) => (
            <Tag
              key={index}
              style={{ cursor: 'pointer', color: 'blue', width: 'fit-content' }}
              onClick={() => onQueryClick(queryItem.attributes.query)}
            >
              {queryItem.attributes.query}
            </Tag>
          )),
        )}
      </div>
    </>
  );
};

export default SearchQueryTags;
