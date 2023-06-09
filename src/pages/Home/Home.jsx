import React from 'react'
import './Home.scss';
import BestSell from '../../components/HomePage/BestSell/BestSell';
import BestFarmers from '../../components/HomePage/BestFarmers/BestFarmers';
import Reviews from '../../components/HomePage/Reviews/Reviews';
import Cart from '../../components/Cart/Cart';

const Home = () => {

  return (
    <div className="home">
      <BestSell/>
      <BestFarmers/>
      <Reviews/>
    </div>
  )
}

export default Home;