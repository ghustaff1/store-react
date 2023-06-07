import { Routes, Route } from 'react-router-dom';

import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import BestFarmers from './components/HomePage/BestFarmers/BestFarmers';
import Product from './pages/Product/Product';


function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {/* <Route path='' element={<Home />} /> */}
        <Route path='' element={<Home />} />
        <Route path='items/:id' element={<Product />} />
        {/* <Route path='test' element={<BestFarmers />}/> */}
      </Route>
    </Routes>
  );
}

export default App;
