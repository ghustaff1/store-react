import React from 'react'
import UserPath from '../../components/UserPath'
import './Category.scss';
import MainTitle from '../../components/MainTitle'
import { useParams, useSearchParams } from 'react-router-dom'
import { getCategoryFromPath } from '../../redux/slices/categoriesSlice'
import AsideTitle from '../../components/AsideTitle';
import Rating from '../../components/Rating/Rating';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';
// import Pagination from '../../components/CategoryPage/Pagination/Pagination';
import Pagination from '../../components/CategoryPage/Pagination/Pagination'
import PriceSlider from '../../components/CategoryPage/PriceSlider';

const viewType = ['grid', 'list']

const Category = () => {
  const [view, setView] = React.useState(viewType[0]);
  const [sortPrice, setSortPrice] = React.useState(null);
  const [items, setItems] = React.useState();
  const [farms, setFarms] = React.useState();
  const [chosenFarms, setChosenFarms] = React.useState([]);
  const [chosenRating, setChosenRating] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  const [sliderPrices, setSliderPrices] = React.useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const wishListItems = useSelector(({ wishlist }) => wishlist.items);


  const { category } = useParams();
  const categoryName = getCategoryFromPath(category);
  const _itemsUrl = `http://localhost:8000/products?category=${category}`;

  const totalItemsAmount = React.useRef(0);
  const priceRange = React.useRef([]);

  React.useEffect(() => {

    axios.get(`http://localhost:8000/categories?category=${category}`)
      .then(res => {
        setFarms(res.data[0].categoryFarms)
      });

    axios.get(_itemsUrl).then(res => {
      totalItemsAmount.current = res.data.length;
      priceRange.current[0] = Math.min.apply(null, res.data.map(obj => obj.price));
      priceRange.current[1] = Math.max.apply(null, res.data.map(obj => obj.price));

    });

    const farmName = searchParams.get('farm');
    if (farmName) setChosenFarms([...chosenFarms, farmName]);



  }, []);


  const setUrl = (url) => {
    if (chosenFarms.length) {
      chosenFarms.forEach(farm => url += `&farm=${farm}`);
    }
    if (chosenRating.length) {
      chosenRating.forEach(rating => url += `&rating=${rating}`);
    }
    url += `&_start=${currentPage * 6}&_limit=6`;
    console.log(url)
    return url;
  }

  const updateSearchParams = () => {
    setSearchParams({
      farm: chosenFarms,
      rating: chosenRating
    })
  }



  React.useEffect(() => {
    updateSearchParams();
    const fetchItems = async () => {

      axios.get(setUrl(_itemsUrl))
        .then(res => {
          console.log(res.data)
          if (sortPrice) {
            sortPrice === 'desc' ?
              res.data.sort((a, b) => b.price - a.price) :
              res.data.sort((a, b) => a.price - b.price);
          }
          if (sliderPrices.length) {
            res.data = res.data.filter(
              obj => obj.price >= sliderPrices[0] && obj.price <= sliderPrices[1]
              )
          }

          setItems(res.data)
        });
    };
    fetchItems();
  }, [category, sortPrice, chosenFarms, chosenRating, currentPage, sliderPrices]); //может изменится если будет другая бд


  const onToggleFarm = (farm) => {
    if (chosenFarms.includes(farm)) {
      const newChosenFarms = chosenFarms;
      newChosenFarms.splice(newChosenFarms.indexOf(farm), 1);
      setChosenFarms([...newChosenFarms]);
    } else {
      setChosenFarms([...chosenFarms, farm]);
    }
  };

  const onToggleRating = (rating) => {
    if (chosenRating.includes(rating)) {
      const newChosenRating = chosenRating;
      newChosenRating.splice(newChosenRating.indexOf(rating), 1);
      setChosenRating([...newChosenRating]);
    } else {
      setChosenRating([...chosenRating, rating]);
    }

  }

  console.log('sliderPrices', sliderPrices)


  return (
    <div className={`category ${categoryName}`}>
      <div className="container">
        <UserPath path={[getCategoryFromPath(category)]} section='categories'/>
        <div className='category__top top'>
          <div className="top__head">
            <MainTitle value={categoryName} />
            <div className="top__view">
              <button
                onClick={() => setView('grid')}
                className={`top__gridViewBtn ${view === 'grid' ? 'active' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 8H14.6673" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 1.33331V14.6666" stroke="#6A983C" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>Grid view</p>
              </button>
              <button
                onClick={() => setView('list')}
                className={`top__listViewBtn ${view === 'list' ? 'active' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.334 1.33331H2.66732C1.93094 1.33331 1.33398 1.93027 1.33398 2.66665V13.3333C1.33398 14.0697 1.93094 14.6666 2.66732 14.6666H13.334C14.0704 14.6666 14.6673 14.0697 14.6673 13.3333V2.66665C14.6673 1.93027 14.0704 1.33331 13.334 1.33331Z" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 4.66663H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 8H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.33398 11.3333H14.6673" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>List view</p>
              </button>
              <div className="top__productsAmount">
                <span>{totalItemsAmount.current}</span>
                <p>Products</p>
              </div>
            </div>
          </div>
          <div className="top__filters filters">
            <div className="filters__price">
              <p className='filters__title'>Price</p>
              <div
                // ref={ascBtn} 
                onClick={() => setSortPrice('asc')}
                className={`filters__price-asc filters-priceBtn ${sortPrice === 'asc' ? 'active' : ''}`}>
                <span className='filters__checkbox'></span>
                <p>Ascending</p>
              </div>
              <div
                // ref={descBtn} 
                onClick={() => setSortPrice('desc')}
                className={`filters__price-asc filters-priceBtn ${sortPrice === 'desc' ? 'active' : ''}`}>
                <span className='filters__checkbox'></span>
                <p>Descending</p>
              </div>
            </div>

          </div>
        </div>

        <div className="category__main main">
          <div className="category__aside aside">
            <div className="aside__item">
              <AsideTitle value='Farms' />
              <ul className="aside__list farms">
                {farms?.map(farm =>
                  <li
                    key={farm}
                    onClick={() => onToggleFarm(farm)}
                    className={chosenFarms.includes(farm) ? 'active' : ''}>
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
              <AsideTitle value='Rating' />
              <ul className="aside__list">
                <li onClick={() => onToggleRating(5)}
                  className={chosenRating.includes(5) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating5' rate='5' color='gold' /></li>
                <li onClick={() => onToggleRating(4)}
                  className={chosenRating.includes(4) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating4' rate='4' color='gold' /></li>
                <li onClick={() => onToggleRating(3)}
                  className={chosenRating.includes(3) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating3' rate='3' color='gold' /></li>
                <li onClick={() => onToggleRating(2)}
                  className={chosenRating.includes(2) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating2' rate='2' color='gold' /></li>
                <li onClick={() => onToggleRating(1)}
                  className={chosenRating.includes(1) ? 'active' : ''}>
                  <span className='aside__checkbox'>
                    <svg width="16" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.55957 5.85003L4.61957 8.91003L12.4396 1.09003" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Rating itemName='rating1' rate='1' color='gold' /></li>
              </ul>
            </div>
            <div className="aside__item">
              <AsideTitle value='Price' />
              <PriceSlider
                minPrice={priceRange.current[0]}
                maxPrice={priceRange.current[1]}
                setSliderPrices={setSliderPrices} />
            </div>
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
        <Pagination
          amount={Math.ceil(totalItemsAmount.current / 6)}
          setPage={setCurrentPage}
          currentPage={currentPage} />
      </div>
    </div>
  )
}

export default Category