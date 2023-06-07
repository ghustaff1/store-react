import React from 'react'
import './HomeProductsSection.scss';
import MainBtn from '../../MainBtn';
import GreenLink from '../../GreenLink';
import ProductCard from '../ProductCard/ProductCard';
import HomeSectionTitle from '../../HomeSectionTitle';


const HomeSaleSection = ({ title, data, links, className }) => {

  
  return (
    <div className={`homeSection ${className}`}>
      <div className="container">
        <div className='homeSection__wrapper'>
          <aside className='homeSection__aside'>
            <HomeSectionTitle title={title} />
            <ul>
              {links?.map(link => {
                return <li key={link}><GreenLink underline={true} value={link} /></li>;
              })}
            </ul>
            <MainBtn type='3' size='medium' text='More products' dir='next' />
          </aside>
          <div className='homeSection__cards'>
            {data?.map(obj => <ProductCard key={obj.id} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSaleSection;