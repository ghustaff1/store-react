import React from 'react';
import './Cart.scss';

const Cart = () => {
  return (
    <div className="cart">
      <div className="cart__top">
        <h2 className="cart__title"></h2>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.3606 14.36L1.64062 1.63995" stroke="#151515" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="bevel" />
          <path d="M14.3606 1.63995L1.64062 14.36" stroke="#151515" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="bevel" />
        </svg>
      </div>
      {/* cart-item перенести в отдельный компонент */}
      <div className="cart-item">
        <div className="cart-item__left">
          <div className="cart-item__img">
            <img src="img/apples.jpg" alt="apples" />
          </div>
          <div className="cart-item__wishlist">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.15559 1.44502C6.63297 0.967627 7.28045 0.699432 7.95559 0.699432C8.63072 0.699432 9.2782 0.967627 9.75559 1.44502C10.233 1.92241 10.5012 2.56988 10.5012 3.24502C10.5012 3.92015 10.233 4.56763 9.75559 5.04502L9.10059 5.70001L5.50059 9.30001L1.90058 5.70001L1.24558 5.04502C0.768195 4.56763 0.5 3.92015 0.5 3.24502C0.5 2.56988 0.768195 1.92241 1.24558 1.44502C1.72297 0.967627 2.37045 0.699432 3.04558 0.699432C3.72072 0.699432 4.36819 0.967627 4.84558 1.44502L5.50059 2.10002L6.15559 1.44502Z" stroke="#151515" stroke-linecap="round" stroke-linejoin="bevel" />
            </svg>
            <p>Wishlist</p>
          </div>
          <div className="cart-item__remove">
            <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.68031 7.17999L1.32031 0.819992" stroke="#151515" stroke-linecap="round" stroke-linejoin="bevel" />
              <path d="M7.68031 0.819992L1.32031 7.17999" stroke="#151515" stroke-linecap="round" stroke-linejoin="bevel" />
            </svg>
            <p>Remove</p>
          </div>
        </div>
        <div className="cart-item__right">
          <h3 className="cart-item__title">Apples</h3>
          <ul className="cart-item__specs specs">
            <li>
              <p className='specs__spec'>Farm</p>
              <p className='specs__content'>Tharamis farm</p>
            </li>
            <li>
              <p lassName='specs__spec'>Freshness</p>
              <p className='specs__content'>1 day old</p>
            </li>
          </ul>
          <div className="cart-item__order">
            <div className="cart-item__prices">
              <p className="cart-item__actualPrice">23.42</p>
              <s className="cart-item__datedPrice">25.43</s>
            </div>
            <div className="cart-item__amount"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart