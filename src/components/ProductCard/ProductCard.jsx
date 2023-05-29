import React from 'react'
import './ProductCard.scss';
import imageUrl from '../../assets/testFoodImg.jpg';
import MainBtn from '../MainBtn';

const ProductCard = ({ actualPrice, datedPrice, sale }) => {

  return (
    <div className="productCard">
      {sale && <div className="productCard__sale">-{sale * 100} %</div>}
      <img src={imageUrl} alt="" />
      <div className='productCard__text'>
        <h2 className='productCard__title'>Product title</h2>
        <p className='productCard__descr'>Space for a small product description</p>
      </div>
      <div className="productCard__bottom">
        <div className="productCard__price">
          <b className='productCard__price-actual'>{actualPrice} USD</b>
          {sale > 0 ?
            <s className='productCard__price-dated'>{datedPrice}</s> :
            null}
        </div>
        <MainBtn size='small' type='2' text='Buy now' />
      </div>
    </div>
  )
}

export default ProductCard;