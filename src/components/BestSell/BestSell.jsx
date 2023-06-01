import React from 'react'
import axios from 'axios';
import HomeSection from '../HomeProductsSection/HomeProductsSection';

const BestSell = () => {

  const [data, setData] = React.useState([]);


  const fetchBestSell = async () => {
      await axios.get('http://localhost:8000/bestSell')
      .then(res=>setData(res.data));
  }

  React.useEffect(() => {
    fetchBestSell();
  }, [])



  return (
    <HomeSection data={data} className='bestSell' />
  )
}

export default BestSell;