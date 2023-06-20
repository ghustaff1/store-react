import React from 'react'
import UserPath from '../../components/UserPath'
import './Category.scss';
import MainTitle from '../../components/MainTitle'
import { useParams } from 'react-router-dom'
import { getCategoryFromPath } from '../../redux/slices/categoriesSlice'
import AsideTitle from '../../components/AsideTitle';
import Rating from '../../components/Rating/Rating';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';

const viewType = ['grid', 'list']

const Category = () => {
  const [view, setView] = React.useState(viewType[0]);
  const [sortPrice, setSortPrice] = React.useState();
  const [items, setItems] = React.useState();
  const [farms, setFarms] = React.useState();
  const [chosenFarms, setChosenFarms] = React.useState([]);
  const [chosenRating, setChosenRating] = React.useState([]);

  const  wishListItems  = useSelector(({ wishlist }) => wishlist.items);
  console.log(wishListItems)


  const gridBtn = React.useRef(null);
  const listBtn = React.useRef(null);

  const ascBtn = React.useRef(null);
  const descBtn = React.useRef(null);

  const { category } = useParams();
  const categoryName = getCategoryFromPath(category);

  React.useEffect(() => {
    const gridElem = gridBtn.current;
    gridElem.classList.add('active');
    axios.get(`http://localhost:8000/categories?category=${category}`)
      .then(res => {
        setFarms(res.data[0].categoryFarms.map(farm => farm))
      });
    
  }, []);

  React.useEffect(() => {
    const fetchItems = async () => {
      axios.get(`http://localhost:8000/products?category=${category}`)
        .then(res => {
          if (sortPrice) {
            sortPrice === 'desc' ?
              res.data.sort((a, b) => b.actualPrice - a.actualPrice) :
              res.data.sort((a, b) => a.actualPrice - b.actualPrice);
          }
          if (chosenFarms.length) {
            res.data = res.data.filter(obj => {
              return chosenFarms.includes(obj.farm)
            })
          }
          if (chosenRating.length) {
            // console.log(chosenRating)
            res.data = res.data.filter(obj => {
              return chosenRating.includes(+obj.rating)
            })
          }
          // console.log(res.data)
          setItems(res.data)
        });
    };
    fetchItems();
  }, [category, sortPrice, chosenFarms, chosenRating]); //может изменится если будет другая бд


  const onChangeView = (view) => {
    setView(view);
    const listElem = listBtn.current;
    const gridElem = gridBtn.current;
    if (view === 'list') {
      listElem.classList.add('active');
      gridElem.classList.remove('active');
    } else {
      listElem.classList.remove('active');
      gridElem.classList.add('active');
    }
  }

  const onSortByPrice = (sort) => {
    setSortPrice(sort);
    const ascElem = ascBtn.current;
    const descElem = descBtn.current;
    if (sort === 'asc') {
      ascElem.classList.add('active');
      descElem.classList.remove('active');
    } else {
      ascElem.classList.remove('active');
      descElem.classList.add('active');
    }
  }

  const onAddFarm = (e, farm) => {
    e.currentTarget.classList.toggle('active')
    if (chosenFarms.includes(farm)) {
      const newChosenFarms = chosenFarms;
      newChosenFarms.splice(newChosenFarms.indexOf(farm), 1);
      setChosenFarms([...newChosenFarms]);
    } else {
      setChosenFarms([...chosenFarms, farm]);
    }
  };


  const onAddRating = (e, rating) => {
    e.currentTarget.classList.toggle('active')
    if (chosenRating.includes(rating)) {
      const newChosenRating = chosenRating;
      newChosenRating.splice(newChosenRating.indexOf(rating), 1);
      setChosenRating([...newChosenRating]);
    } else {
      setChosenRating([...chosenRating, rating]);
    }
    // console.log(ch)
  }



  return (
    <div className={`category ${categoryName}`}>
      <div className="container">
        <UserPath path={[getCategoryFromPath(category)]} />
        <div className='category__top top'>
          <div className="top__head">
            <MainTitle value={categoryName} />
            <div className="top__view">
              <button ref={gridBtn}
                onClick={() => onChangeView('grid')}
                className="top__gridViewBtn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 8H14.6673" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 1.33331V14.6666" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Grid view</p>
              </button>
              <button ref={listBtn}
                onClick={() => onChangeView('list')}
                className="top__listViewBtn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 4.66663H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 8H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 11.3333H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>List view</p>
              </button>
              <div className="top__productsAmount">
                <span>{items?.length}</span>
                <p>Products</p>
              </div>
            </div>
          </div>
          <div className="top__filters filters">
            <div className="filters__price">
              <p className='filters__title'>Price</p>
              <div ref={ascBtn} onClick={() => onSortByPrice('asc')} className='filters__price-asc filters-priceBtn'>
                <span className='filters__checkbox'></span>
                <p>Ascending</p>
              </div>
              <div ref={descBtn} onClick={() => onSortByPrice('desc')} className='filters__price-desc filters-priceBtn'>
                <span className='filters__checkbox'></span>
                <p>Descending</p>
              </div>
            </div>

          </div>
        </div>

        <div className="category__main main">
          <div className="category__aside aside">
            <div className="aside__item">
              <AsideTitle title='Farms' />
              <ul className="aside__list farms">
                {farms?.map(farm =>
                  <li key={farm} onClick={(e) => onAddFarm(e, farm)}>
                    <span className='aside__checkbox'>
                      <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>

                    </span>
                    <p>{farm}</p>
                  </li>)}

              </ul>
            </div>
            <div className="aside__item">
              <AsideTitle title='Rating' />
              <ul className="aside__list">
                <li onClick={(e) => onAddRating(e, 5)}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating5' rate='5' color='gold' /></li>
                <li onClick={(e) => onAddRating(e, 4)}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating4' rate='4' color='gold' /></li>
                <li onClick={(e) => onAddRating(e, 3)}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating3' rate='3' color='gold' /></li>
                <li onClick={(e) => onAddRating(e, 2)}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating2' rate='2' color='gold' /></li>
                <li onClick={(e) => onAddRating(e, 1)}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating1' rate='1' color='gold' /></li>
              </ul>
            </div>
            {/* PriceSlider */}
          </div>
          <div className={`main__items ${view}`}>
            {
              items?.map(item => <ProductCard 
                key={item.id} 
                {...item} 
                view={view}
                wishlisted={wishListItems.includes(item.id)}
                 />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category