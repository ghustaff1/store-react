import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Product.scss';
import MainTitle from '../../components/MainTitle';
import AddToWishList from '../../components/ProductPage/AddToWishList/AddToWishList';
import BaseProductInfo from '../../components/ProductPage/BaseProductInfo/BaseProductInfo';


const Product = () => {
  const [data, setData] = React.useState({});
  const [carted, setCarted] = React.useState(false);
  const [amount, setAmount] = React.useState(1);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/products/${id}`);
        setData(data);
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


  return (
    <div className="product">
      <div className="container">
        <div className='product__wrapper'>
          <div className="product__imgs">
            {data?.imgUrl?.map(url =>
              <img key={url} src={process.env.PUBLIC_URL + url} alt={data.title} />)}
          </div>
          <div className="product__content">
            <MainTitle value={data.title} />
            {/* rating */}
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
                <p className="product__actualPrice">{amount ?
                  data.actualPrice * amount :
                  data.actualPrice} USD</p>
                {data.datedPrice ?
                  <s className="product__datedPrice">{data.datedPrice} USD</s> :
                  null}
              </div>
              <div className="product__order-btns">
                <div className="product__order-amount">
                  <input value={amount} type="text" placeholder={amount}
                    onChange={e => onChangeAmount(e)} />
                  <p className='product__order-measure'>{data.measure}</p>
                </div>
                <button className='product__order-cart'
                  onClick={() => setCarted(!carted)}>
                  {carted ?
                    (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>) :
                    (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1608 7H1.49414" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                      <path d="M6.82812 12.3334V1.66676" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
                    </svg>)}
                  <p>{carted ? 'Remove from' : "Add to"} cart</p>
                </button>
              </div>
            </div>
            <AddToWishList />
            <BaseProductInfo farm={data.farm} recipe={data.recipe} id={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;