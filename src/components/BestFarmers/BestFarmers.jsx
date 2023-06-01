import React from 'react'
import axios from 'axios';
import HomeSection from '../HomeProductsSection/HomeProductsSection';

const BestFarmers = () => {
  const [data, setData] = React.useState();

  const fetchBestFarmers = async () => {
    await axios.get('http://localhost:8000/bestFarmers')
      .then(res => setData(res.data));
  }

  console.log(data)

  React.useEffect(()=>{
    fetchBestFarmers();
  }, [])

  return (
    <HomeSection data={data} className='bestFarmers'/>
  )
}

export default BestFarmers;