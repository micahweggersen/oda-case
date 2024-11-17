import { useContext } from 'react';
import { List, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { AppContext } from '../AppContext';

const { Title } = Typography;

const Cart = () => {
  // Access the context
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('Cart must be used within an AppProvider');
  }

  const { cart, setCart } = context;

  const total = cart.reduce(
    (acc, item) => acc + Number(item.attributes.gross_price),
    0,
  );

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: 'auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Handlekurv
      </Title>
      <List
        itemLayout="vertical"
        dataSource={cart}
        style={{ background: '#fff', borderRadius: '8px', padding: '16px' }}
        renderItem={item => (
          <List.Item
            key={item.id}
            style={{ borderRadius: '8px', marginBottom: '16px' }}
            actions={[
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  setCart(cart.filter(i => i.id !== item.id));
                }}
              />,
            ]}
            extra={
              <img
                width={120}
                height={120}
                alt={item.attributes.full_name}
                src={item.attributes.images[0]?.large.url}
                style={{ borderRadius: '8px', objectFit: 'contain' }}
              />
            }
          >
            <List.Item.Meta
              title={item.attributes.full_name}
              description={`${item.attributes.gross_price} ${item.attributes.currency}`}
            />
          </List.Item>
        )}
      />
      <div
        style={{
          textAlign: 'right',
          marginTop: '16px',
          fontSize: '1.2em',
          fontWeight: 'bold',
        }}
      >
        <Title level={4}>Total: {total.toFixed(2)}</Title>
        <Button
          type="primary"
          style={{ marginLeft: '16px' }}
          disabled={!cart.length}
        >
          Gå til kassen
        </Button>
      </div>
    </div>
  );
};

export default Cart;
