import React from 'react'
import './Categories.scss';
import CategoriesItem from '../CategoriesItem/CategoriesItem';
import axios from 'axios';

const Categories = () => {
  const [categoriesData, setCategoriesData] = React.useState([]);

  const fetchCategories = async () => {
    await axios.get('http://localhost:8000/categories')
      .then(res => setCategoriesData(res.data));
  }
  React.useEffect(() => {
    fetchCategories();
  }, [])
  


  return (
    <div className='categories'>
      <div className='container'>
        <ul className='categories-list'>
          {
            categoriesData.map((obj) => <CategoriesItem key={obj.title} {...obj} />
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Categories;