import React from 'react'
import axios from 'axios';
import HomeSaleSection from '../HomeSaleSection/HomeSaleSection';
import { useSelector } from 'react-redux';

const BestSell = () => {

  const [data, setData] = React.useState([]);

  const fetchBestSell = async () => {
    await axios.get('http://localhost:8000/products')
      .then(res => setData(res.data.sort((a, b) => b.sells - a.sells).slice(0, 3)));
  }
  const categories=useSelector(({categories})=>categories.categories.map(obj=>obj.category));

  React.useEffect(() => {
    fetchBestSell();
  }, [])



  return (
    <HomeSaleSection
      title="Best selling products"
      data={data}
      links={categories}
      className='bestSell' />
  )
}

export default BestSell;