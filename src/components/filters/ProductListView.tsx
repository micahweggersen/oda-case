import { Product } from '../../types';
import ProductCard from '../cardTypes/ProductCard';

interface ProductListViewProps {
  products: Product[];
}

const ProductListView: React.FC<ProductListViewProps> = ({ products }) => (
  <>
    {products.length > 0 ? (
      products.map((item, index) => (
        <ProductCard key={index} index={index} item={item} />
      ))
    ) : (
      <p>No results found.</p>
    )}
  </>
);

export default ProductListView;
