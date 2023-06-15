import React from 'react'
import './ProductCard.scss';
import MainBtn from '../MainBtn';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';

const ProductCard = ({ title, descr, imgUrl, actualPrice, datedPrice, id, rating, freshness, farm, amount, view }) => {

  const sale = datedPrice ? Math.round((1 - actualPrice / datedPrice) * 100) : null;



  return (

    <div className={`productCard ${view}`}>
      {view === 'grid' ?
        (<>
          <Link to={`/items/${id}`}>
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
          <Rating itemName={title} rate={rating} color='gold' />
          <div className="productCard__bottom">
            <div className="productCard__price">
              <b className='productCard__price-actual'>{actualPrice} USD</b>
              {sale > 0 ?
                <s className='productCard__price-dated'>{datedPrice}</s> :
                null}
            </div>
            <MainBtn size='small' type='2' text='Buy now' />
          </div>
        </>) :
        (
          <>
            <div className="productCard__img">
              <img src={imgUrl[0]} alt={title} />
            </div>
            <div className="productCard__content">
              <div className="productCard__info">
                <div className="productCard__title">{title}</div>
                <div className="productCard__descr">{descr}</div>
                <Rating itemName={title} rate={rating} color='gold' />
                <dl className="productCard__specs">
                  <div>
                    <dt>Freshness:</dt>
                    <dd>{freshness} days old</dd>
                  </div>
                  <div>
                    <dt>Farm:</dt>
                    <dd>{farm}</dd>
                  </div>
                  <div>
                    <dt>Amount:</dt>
                    <dd>{amount}</dd>
                  </div>
                </dl>
              </div>
              <div className="productCard__orderInfo">
                <div class="productCard__price">
                  <b class="productCard__price-actual">{actualPrice} USD</b>
                  <s class="productCard__price-dated">{datedPrice}</s>
                </div>
                <div className="productCard__shipping">
                  <b>Free Shipping</b>
                  <p>Delivery in 1 day</p>
                </div>
                <div className='productCard__buttons'>
                  <MainBtn size='medium' type='2' text='Product detail' dir='next' />
                  {/* может быть изменить кнопку снизу*/}
                  <button className='productCard__wishlist'>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_37475_131580)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.13062 3.26001C9.76714 2.62349 10.6304 2.2659 11.5306 2.2659C12.4308 2.2659 13.2941 2.62349 13.9306 3.26001C14.5671 3.89653 14.9247 4.75984 14.9247 5.66001C14.9247 6.56019 14.5671 7.42349 13.9306 8.06001L13.0573 8.93334L8.25729 13.7333L3.45729 8.93334L2.58396 8.06001C1.94744 7.42349 1.58984 6.56019 1.58984 5.66001C1.58984 4.75984 1.94744 3.89653 2.58396 3.26001C3.22048 2.62349 4.08378 2.2659 4.98396 2.2659C5.88413 2.2659 6.74744 2.62349 7.38396 3.26001L8.25729 4.13334L9.13062 3.26001Z" stroke="#151515" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_37475_131580">
                          <rect width="16" height="16" fill="white" transform="translate(0.256836)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Add to wish list</p>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default ProductCard;