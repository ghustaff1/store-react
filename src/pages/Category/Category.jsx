import React from 'react'
import UserPath from '../../components/UserPath'
import './Category.scss';
import MainTitle from '../../components/MainTitle'
import { useParams } from 'react-router-dom'
import { getCategoryFromPath } from '../../redux/slices/categoriesSlice'
import AsideComponent from '../../components/CategoryPage/AsideComponent/AsideComponent'
import AsideTitle from '../../components/AsideTitle';
import Rating from '../../components/Rating/Rating';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';


const Category = () => {
  const [view, setView] = React.useState('grid');
  const [items, setItems] = React.useState();
  const [categoryName, setCategoryName]=React.useState()
  // const [category, setCategory]=React.useState()

  const { category } = useParams();
  
  // const categoryName = getCategoryFromPath(category);

  React.useEffect(() => {
    const fetchItems=async()=>{
      axios.get(`http://localhost:8000/products?category=${categoryName}`)
      .then(res=>setItems(res.data));
    };
    setCategoryName(getCategoryFromPath(category));
    fetchItems();
  }, [categoryName])
  // console.log(categoryName);
  // console.log(category)

  return (
    <div className={`category ${categoryName}`}>
      <div className="container">
        <UserPath path={[categoryName]} />
        <div className='category__top top'>
          <div className="top__head">
            <MainTitle value={categoryName} />
            <div className="top__view">
              <div className="top__gridView ">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 8H14.6673" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 1.33331V14.6666" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Gried view</p>
              </div>
              <div className="top__listView">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 4.66663H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 8H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 11.3333H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>List view</p>
              </div>
              <div className="top__productsAmount">
                <span>100</span>
                <p>Products</p>
              </div>
            </div>
          </div>
          <div className="top__filters filters">
            <div className="filters__price">
              <div className='filters__price-asc'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.8096 21.8701C17.3324 21.8701 21.8096 17.3929 21.8096 11.8701C21.8096 6.34722 17.3324 1.87006 11.8096 1.87006C6.28672 1.87006 1.80957 6.34722 1.80957 11.8701C1.80957 17.3929 6.28672 21.8701 11.8096 21.8701Z" stroke="#D1D1D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
                </svg>
                <p>Ascending</p>
              </div>
              <div className='filters__price-desc'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.8096 21.8701C17.3324 21.8701 21.8096 17.3929 21.8096 11.8701C21.8096 6.34722 17.3324 1.87006 11.8096 1.87006C6.28672 1.87006 1.80957 6.34722 1.80957 11.8701C1.80957 17.3929 6.28672 21.8701 11.8096 21.8701Z" stroke="#D1D1D1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="bevel" />
                </svg>
                <p>Descending</p>
              </div>
            </div>

          </div>
        </div>

        <div className="category__main main">
          <div className="category__aside aside">
            <div className="aside__item">
              <AsideTitle title='Farms' />
              <ul className="aside__list">
                <li>farm</li>
                <li>farm</li>
                <li>farm</li>
                <li>farm</li>
              </ul>
            </div>
            <div className="aside__item">
              <AsideTitle title='Rating' />
              <ul className="aside__list">
                <li><Rating itemName='a' rate='5' color='gold' /></li>
                <li><Rating itemName='b' rate='4' color='gold' /></li>
                <li><Rating itemName='c' rate='3' color='gold' /></li>
                <li><Rating itemName='d' rate='2' color='gold' /></li>
                <li><Rating itemName='e' rate='1' color='gold' /></li>
              </ul>
            </div>
            {/* PriceSlider */}
          </div>
          <div className="main__items">
          {
            items?.map(item=><ProductCard key={item.id} {...item}/>)
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category