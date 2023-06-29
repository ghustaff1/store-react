import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import BestFarmers from './components/HomePage/BestFarmers/BestFarmers';
import Product from './pages/Product/Product';
import Cart from './components/Cart/Cart';
import Category from './pages/Category/Category';
import { useDispatch } from 'react-redux';
import { fetchCategories } from './redux/slices/categoriesSlice';
import Blogs from './pages/Blogs/Blogs';
import Blog from './pages/Blog/Blog';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='items/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/categories/:category' element={<Category />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='blogs/:id' element={<Blog/>}/>
      </Route>
    </Routes>
  );
}

export default App;
