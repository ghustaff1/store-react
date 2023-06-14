import React from 'react'
import UserPath from '../../components/UserPath'

const Category = ({category}) => {
  return (
    <div className={`category ${category}`}>
      <div className="container">
        <UserPath path={[category]}/>
      </div>
    </div>
  )
}

export default Category