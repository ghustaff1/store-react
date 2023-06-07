import React from 'react'
import './ProductCard.scss';
import MainBtn from '../../MainBtn';
import { Link } from 'react-router-dom';

const ProductCard = ({ title, descr, imgUrl, actualPrice, datedPrice, id }) => {

  const sale = datedPrice ? Math.round((1 - actualPrice / datedPrice) * 100) : null;
  const link = `items/${id}`;
  return (
    <div className="productCard">
      <Link to={link}>
        {sale && <div className="productCard__sale">- {sale} %</div>}
        <div className='productCard__img'>
          <img src={imgUrl[0]} alt={title} />
        </div>
        <div className='productCard__text'>
          <h2 className='productCard__title'>{title}</h2>
          <p className='productCard__descr'>
            {descr.split(" ").slice(0, 10).join(" ")}
            ...</p>
        </div>
      </Link>
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