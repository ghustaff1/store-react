import React from 'react'
import './Categories.scss';
import CategoriesItem from '../CategoriesItem/CategoriesItem';

const Categories = () => {


  const categoriesTitles = ['Bakery', 'Fruit and vegetables', 'Meat and fish', 'Drinks', 'Kitchen', 'Special nutrition', 'Baby', 'Pharmasy'];

  const categoriesTestData = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6'];

  return (
    <div className='categories'>
      <div className='container'>
        <ul className='categories-list'>
          {
            categoriesTitles.map((title) => {
              return (
                <CategoriesItem key={title} title={title}/>
              )
            })
          }
  
        </ul>
      </div>
    </div>
  )
}

export default Categories;