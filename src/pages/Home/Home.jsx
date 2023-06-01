import React from 'react'
import './Home.scss';
import BestSell from '../../components/BestSell/BestSell';
import BestFarmers from '../../components/BestFarmers/BestFarmers';
import Reviews from '../../components/Reviews/Reviews';

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