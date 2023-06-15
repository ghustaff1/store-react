import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Product.scss';
import MainTitle from '../../components/MainTitle';
import AddToWishList from '../../components/ProductPage/AddToWishList/AddToWishList';
import BottomProductInfo from '../../components/ProductPage/BottomProductInfo/BottomProductInfo';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../redux/slices/cartSlice';
import UserPath from '../../components/UserPath';
import Rating from '../../components/Rating/Rating';


const Product = () => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [amount, setAmount] = React.useState(1);

  const { id } = useParams();

  const carted = useSelector(state => state.cart.items.find(obj => obj.id === id));

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`http://localhost:8000/products?id=${id}`)
          .then(res => setData(res.data[0]));
        setLoading(false);
      } catch {
        alert('error');
      }
    }
    fetchData();
  }, []);

  const onChangeAmount = (e) => {
    //сделать проверку на число
    //сделать alert если ввели больше, чем имеется
    if (+e.currentTarget.value > data.amount)
      setAmount(data.amount);
    else
      setAmount(e.currentTarget.value);
  }

  const onToggleCart = () => {
    carted ?
      dispatch(removeItem({
        id,
        price: 12 //temp
      })) :
      dispatch(addItem({
        id,
        amount,
        price: amount * +data.actualPrice
      }))

  }

  if (loading) { return <div>Loading</div> }; //может быть удалить

  return (
    <div className="product">
      <div className="container">
        <UserPath path={[data.category, data.title]} />
        <div className='product__wrapper'>
          <div className="product__imgs">
            {data?.imgUrl?.map(url =>
              <img key={url} src={process.env.PUBLIC_URL + url} alt={data.title} />)}
          </div>
          <div className="product__content">
            <MainTitle value={data.title} />
            {/* rating */}
            <Rating itemName={data.title} rate={data.rating} color='gold'/>
            <p className="product__descr">{data.descr}</p>
            <dl className="product__info">
              <div>
                <dt>SKU:</dt>
                <dd>{data.id}</dd>
              </div>
              <div>
                <dt>Category:</dt>
                <dd>{data.category}</dd>
              </div>
              <div>
                <dt>Stock:</dt>
                <dd>{data.amount ? 'In Stock' : 'Unavailable'}</dd>
              </div>
              <div>
                <dt>Farm:</dt>
                <dd>{data.farm}</dd>
              </div>
              <div>
                <dt>Freshness:</dt>
                <dd>{data.freshness} days old</dd>
              </div>
              <div>
                <dt>Amount:</dt>
                <dd>{data.amount}</dd>
              </div>
            </dl>
            <div className="product__order">
              <div className="product__price">
                <p className="product__actualPrice">{(data.actualPrice * amount).toFixed(2)} USD</p>
                {data.datedPrice ?
                  <s className="product__datedPrice">{data.datedPrice} USD</s> :
                  null}
              </div>
              <div className="product__order-btns">
                {/* такой же компонент в CartItem */}
                <div className="product__order-amount">
                  <input value={amount} type="text" placeholder={amount}
                    onChange={e => onChangeAmount(e)} />
                  <p className='product__order-measure'>{data.measure}</p>
                </div>
                <button className='product__order-cart'
                  onClick={onToggleCart}>
                  {carted ?
                    (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>) :
                    (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      <path d="M6.82812 12.3334V1.66676" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>)}
                  <p>{carted ? "Remove from cart" : "Add to cart"}</p>
                  {/* <p>{addedToCart.current ? "Remove from cart" : null}</p> */}
                </button>
              </div>
            </div>
            <AddToWishList />
            <BottomProductInfo farm={data.farm}
              recipe={data.recipe}
              reviews={data.reviews}
              id={id} />
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Product;