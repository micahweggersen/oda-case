import { useContext } from 'react';
import Search from './SearchContainer';
import { AppContext } from '../AppContext';
import ProductCard from './cardTypes/ProductCard';

const SavedItemsView: React.FC = () => {
  // Access the context
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('SavedItemsView must be used within an AppProvider');
  }

  const { personalList, setPersonalList } = context;

  return (
    <>
      <Search
        personalList={personalList}
        setPersonalList={setPersonalList}
        type="onlyProduct"
        query="query"
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {personalList.map((product, index) => (
          <ProductCard key={index} index={index} item={product} />
        ))}
      </div>
    </>
  );
};

export default SavedItemsView;
