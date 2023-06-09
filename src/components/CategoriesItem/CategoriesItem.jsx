import React from 'react'
import './CategoriesItem.scss';
import { Link } from 'react-router-dom';
import { getCategoryFromPath } from '../../redux/slices/categoriesSlice';

const CategoriesItem = ({ category, categoryFarms }) => {
  const [isHovered, setIsHovered] = React.useState(false);


  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='categoriesItem'>
      <a href='#'>
        <p>{getCategoryFromPath(category)}</p>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.61035 1.40001L3.66535 3.45501C3.75903 3.54814 3.88576 3.60041 4.01785 3.60041C4.14994 3.60041 4.27667 3.54814 4.37035 3.45501L6.37035 1.45501" stroke="#6A983C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
        </svg>
      </a>
      {isHovered &&
        <ul className="categoriesItem-popup">
          {categoryFarms.map(farm =>
            <li key={farm}>
              <Link to={`/categories/${category}?farm=${farm}`}>{farm}</Link>
            </li>
          )}
        </ul>}
    </li>
  )
}

export default CategoriesItem;