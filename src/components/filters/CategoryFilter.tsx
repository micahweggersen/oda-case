import { Radio, Space, Typography } from 'antd';
import { Category, SearchParametersType } from '../../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: number | null;
  searchParameters: SearchParametersType;
  setSearchParameters: React.Dispatch<
    React.SetStateAction<SearchParametersType>
  >;
}

const { Title } = Typography;

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  searchParameters,
  setSearchParameters,
}) => {
  const onCategoryChange = (e: any) => {
    const categoryId = parseInt(e.target.value);
    setSearchParameters({
      ...searchParameters,
      category: categoryId,
    });
  };

  if (categories.length === 0) return null;

  return (
    <>
      <Title level={3}>Kategorier - not in use</Title>
      <Radio.Group onChange={onCategoryChange} value={selectedCategoryId}>
        <Space direction="vertical">
          {categories.map(item => (
            <Radio key={item.id} value={item.id}>
              {item.attributes.name}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </>
  );
};

export default CategoryFilter;
