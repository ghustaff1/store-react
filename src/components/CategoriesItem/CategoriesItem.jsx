import React from 'react'
import './CategoriesItem.scss';
import { act } from 'react-dom/test-utils';

const CategoriesItem = ({ title, active, setActive }) => {
  const [open, setOpen] = React.useState(active);

  const bakeryTestData = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6'];


  return (
    <li className='categoriesItem'
      onClick={()=>setOpen(!open)}>
      <p>{title}</p>
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.61035 1.40001L3.66535 3.45501C3.75903 3.54814 3.88576 3.60041 4.01785 3.60041C4.14994 3.60041 4.27667 3.54814 4.37035 3.45501L6.37035 1.45501" stroke="#6A983C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="bevel" />
      </svg>
      <ul className="categoriesItem-popup">
        {/* Такой-же компонент в <Search/> */}
        {open && bakeryTestData.map(title => <li onClick={()=>setOpen(false)}>{title}</li>)}
      </ul>
    </li>
  )
}

export default CategoriesItem;