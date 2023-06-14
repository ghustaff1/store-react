import React from 'react';
import './BottomProductInfo.scss';
import Description from '../Description/Description';
import axios from 'axios';
import Reviews from '../Reviews/Reviews';

const categories = ['Description', 'Reviews'];

const BottomProductInfo = ({ farm, recipe, reviews, id }) => {

  const [activeCat, setActiveCat] = React.useState(categories[0]);
  const [farmData, setfarmData] = React.useState(null);
  // const [reviews, setReviews] = React.useState(null);

  React.useEffect(() => {
    // const fetchFarmData = async () => {
    //   await axios.get(`http://localhost:8000/farms`)
    //     .then(res => setfarmData(res.data.find(obj => obj.farm === farm)));
    // };
    // fetchFarmData();

    // const fetchReviews = async () => {
    //   await axios.get(`http://localhost:8000/products/${id}`)
    //     .then(res => setReviews(res.data.reviews));
    // };
    // fetchReviews();
  }, []);



  const content = activeCat === categories[0] ?
    (
      <Description farm={farm} recipe={recipe}/>
    ) :
    <Reviews reviews={reviews}/>;

  return (
    <div className="BottomProductInfo">
      <div className="BottomProductInfo__categories">
        {categories.map(cat =>
          <h3 key={cat}
            className={cat === activeCat ?
              'BottomProductInfo__category active' :
              'BottomProductInfo__category'}
            onClick={e => setActiveCat(e.currentTarget.textContent)}>{cat}</h3>)
        }
      </div>
      <ul className="BottomProductInfo__content">
        {content}
      </ul>
    </div>
  )
}

export default BottomProductInfo;