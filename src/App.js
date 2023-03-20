import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

function App() {
  
  return (

    <Layout>
      <Routes>
        <Route path='' element={<BurgerBuilder />} />
        <Route path='checkout/*' element={<Checkout />} />
        <Route path='orders' element={<Orders />} />
        <Route path='auth' element={<Auth />} />
      </Routes>
    </Layout>

  );
}

export default App;
