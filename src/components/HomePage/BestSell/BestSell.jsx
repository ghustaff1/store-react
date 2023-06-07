import React from 'react'
import axios from 'axios';
import HomeSaleSection from '../HomeSaleSection/HomeSaleSection';

const BestSell = () => {

  const [data, setData] = React.useState([]);
  const [links, setLinks]=React.useState([]);

  const fetchBestSell = async () => {
    await axios.get('http://localhost:8000/products')
      .then(res => setData(res.data.sort((a,b)=>b.sells-a.sells).slice(0,3)));
  }
  const fetchLinks = async () => {
    await axios.get('http://localhost:8000/categories')
      .then(res => setLinks(res.data.map(obj=>obj.title)));
  }

  React.useEffect(() => {
    fetchBestSell();
    fetchLinks();
  }, [])

  

  return (
    <HomeSaleSection  
    title="Best selling products"
    data={data} 
    links={links}
    className='bestSell'/>
  )
}

export default BestSell;