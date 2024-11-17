import { Tabs } from 'antd';
import { SearchOutlined, ShopOutlined, StarOutlined } from '@ant-design/icons';

import SavedItemsView from './components/SavedItemsView';
import Header from './components/Header';
import FilteredSearch from './components/FilteredSearchPage';
import Cart from './components/Cart';
import './App.css';

export function App() {
  // The children prop is the content that will be displayed when the tab is active
  const tabItems = [
    {
      label: 'Filtrert søk',
      key: 'search',
      icon: <SearchOutlined />,
      children: <FilteredSearch />,
    },
    {
      label: 'Ditt Oda',
      key: 'ditt-oda',
      icon: <StarOutlined />,
      children: <SavedItemsView />,
    },
    {
      label: 'Handlekurv',
      key: 'cart',
      icon: <ShopOutlined />,
      children: <Cart />,
    },
  ];

  return (
    <div className="app-container">
      <Header />
      <div className="tabs-container">
        <Tabs defaultActiveKey="1" centered items={tabItems} />
      </div>
    </div>
  );
}

export default App;
