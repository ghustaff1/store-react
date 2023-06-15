import React from 'react'
import './Categories.scss';
import CategoriesItem from '../CategoriesItem/CategoriesItem';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getCategoryFromPath } from '../../redux/slices/categoriesSlice';

const Categories = () => {
  const [categoriesData, setCategoriesData] = React.useState([]);

  // const fetchCategories = async () => {
  //   await axios.get('http://localhost:8000/categories')
  //     .then(res => setCategoriesData(res.data));
  // }
  // React.useEffect(() => {
  //   fetchCategories();
  // }, [])
  const {categories} = useSelector(({ categories }) => categories);




  return (
    <div className='categories'>
      <div className='container'>
        <ul className='categories-list'>
          {
            categories.map((obj) =>
              <CategoriesItem
                key={obj.category}
                category={getCategoryFromPath(obj.category)}
                categoryFarms={obj.categoryFarms} />
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Categories;