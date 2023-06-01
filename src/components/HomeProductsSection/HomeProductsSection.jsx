import React from 'react'
import './HomeProductsSection.scss';
import MainBtn from '../MainBtn';
import GreenLink from '../GreenLink';
import ProductCard from '../ProductCard/ProductCard';
import HomeSectionTitle from '../HomeSectionTitle';


const HomeSection = ({ data, className }) => {

  return (
    <div className={`homeSection ${className}`}>
      <div className="container">
        <div className='homeSection__wrapper'>
          <aside className='homeSection__aside'>
            <HomeSectionTitle title={data?.title} />
            <ul>
              {data?.links?.map(title => {
                return <li key={title}><GreenLink underline={true} value={title} /></li>;
              })}
            </ul>
            <MainBtn type='3' size='medium' text='More products' dir='next' />
          </aside>
          <div className='homeSection__cards'>
            {data?.items?.map(obj => <ProductCard key={obj.id} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSection;