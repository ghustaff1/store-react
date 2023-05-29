import React from 'react'
import './BestSell.scss';
import MoreBtn from '../MoreBtn';
import ProductCard from '../ProductCard/ProductCard';
import GreenLink from '../GreenLink';
import MainBtn from '../MainBtn';

const BestSell = () => {

  const tempCardObj={
    actualPrice:'12.45', 
    datedPrice:'15.99', 
    sale:'0.2'
  }

  const tempListdata=['Kitchen', 'Meat and fish', 'Special nutrition','Pharmasy','Baby'];

  return (
    <div className="bestSell">
      <div className="container">
        <div className="bestSell__wrapper">
          <aside className="bestSell__aside">
            <h2>Best selling products</h2>
            <ul>
              {tempListdata.map(title=><li key={title}><GreenLink underline={true} value={title}/></li>)}
            </ul>
            
            <MainBtn type='3' size='medium' text='More products' dir='next'/>
          </aside>
          <div className="bestSell__content">
            <ProductCard {...tempCardObj}/>
            <ProductCard {...tempCardObj}/>
            <ProductCard {...tempCardObj}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestSell;