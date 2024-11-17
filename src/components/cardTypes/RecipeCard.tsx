import { Card, Typography } from 'antd';
import { Recipe } from '../../types';
import { ArrowUpOutlined } from '@ant-design/icons';

interface RecipeCardProps {
  index: number;
  item: Recipe;
}

const { Link } = Typography;

const RecipeCard: React.FC<RecipeCardProps> = ({ index, item }) => {
  return (
    <Card
      key={item.id}
      style={{ width: '30%' }}
      cover={
        item.attributes.feature_image_url && (
          <img
            alt={item.attributes.title || 'Recipe image'}
            src={item.attributes.feature_image_url}
            style={{
              objectFit: 'contain',
              height: 100,
              maxWidth: 140,
              padding: 10,
              margin: 'auto',
            }}
          />
        )
      }
      actions={[
        <Link href={item.attributes.front_url} target="_blank" rel="noreferrer">
          Se opskrift
          <ArrowUpOutlined />
        </Link>,
      ]}
    >
      <Card.Meta
        title={item.attributes.title}
        description={
          item.attributes.difficulty_string +
          ' ' +
          item.attributes.cooking_duration_string
        }
      />
    </Card>
  );
};

export default RecipeCard;
