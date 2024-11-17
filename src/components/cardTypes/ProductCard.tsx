import { Card, Typography, message } from 'antd'; // Import 'message' from 'antd'
import { Product } from '../../types';
import {
  ShoppingCartOutlined,
  InfoCircleOutlined,
  AppstoreAddOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

interface ProductCardProps {
  index: number;
  item: Product;
}

const { Link } = Typography;

const ProductCard: React.FC<ProductCardProps> = ({ index, item }) => {
  // Access the context
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('SavedItemsView must be used within an AppProvider');
  }

  const { personalList, setPersonalList, cart, setCart } = context;

  const AddToCart: React.FC<{ item: Product }> = ({ item }) => {
    const addToCart = () => {
      setCart([...cart, item]);
      message.success(
        `${item.attributes.name} har blitt lagt til i handlekurven!`,
      );
    };
    return (
      <>
        {cart.find(i => i.id === item.id) ? (
          <CheckCircleOutlined key="added-to-cart" style={{ color: 'green' }} />
        ) : (
          <ShoppingCartOutlined key="add-to-cart" onClick={addToCart} />
        )}
      </>
    );
  };

  const AddToList: React.FC<{ item: Product }> = ({ item }) => {
    const addToList = () => {
      setPersonalList([...personalList, item]);
    };
    const removeFromList = () => {
      setPersonalList(personalList.filter(i => i.id !== item.id));
    };
    return (
      <>
        {personalList.find(i => i.id === item.id) ? (
          <DeleteOutlined key="remove-form-list" onClick={removeFromList} />
        ) : (
          <AppstoreAddOutlined key="add-to-list" onClick={addToList} />
        )}
      </>
    );
  };

  const Info: React.FC<{ frontUrl: string }> = ({ frontUrl }) => {
    return (
      <>
        <Link href={frontUrl} target="_blank" rel="noreferrer">
          <InfoCircleOutlined key="info" />
        </Link>
      </>
    );
  };

  return (
    <Card
      key={item.id}
      style={{ width: '30%' }}
      cover={
        item.attributes.images[0]?.thumbnail?.url && (
          <img
            alt={item.attributes.name || 'Product image'}
            src={item.attributes.images[0].thumbnail.url}
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
        <AddToCart item={item} />,
        <AddToList item={item} />,
        <Info frontUrl={item.attributes.front_url} />,
      ]}
    >
      <Card.Meta
        title={item.attributes.name}
        description={
          item.attributes.gross_price + ' ' + item.attributes.currency
        }
      />
    </Card>
  );
};

export default ProductCard;
