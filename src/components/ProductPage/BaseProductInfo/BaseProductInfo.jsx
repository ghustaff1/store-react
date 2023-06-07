import React from 'react';
import './BaseProductInfo.scss';
import axios from 'axios';

const categories = ['Description', 'Reviews'];

const BaseProductInfo = ({ farm, recipe, id }) => {

  const [activeCat, setActiveCat] = React.useState(categories[0]);
  const [farmData, setfarmData] = React.useState(null);
  const [reviews, setReviews] = React.useState(null);

  React.useEffect(() => {
    const fetchFarmData = async () => {
      await axios.get(`http://localhost:8000/farms`)
        .then(res => setfarmData(res.data.find(obj => obj.farm === farm)));
    };
    fetchFarmData();

    const fetchReviews = async () => {
      await axios.get(`http://localhost:8000/products/${id}`)
        .then(res => setReviews(res.data.reviews));
    };
    fetchReviews();
  }, [farm]);


  const content = activeCat === categories[0] ?
    (
      <>
        <li>
          <h4 className='BaseProductInfo__farm'>{farm}</h4>
          <p className='BaseProductInfo__farmDescr'>{farmData?.descr}</p>
        </li>
        <li>
          <h4 className='BaseProductInfo__farm'>How to cook</h4>
          <p className='BaseProductInfo__farmDescr'>{recipe}</p>
        </li>
      </>
    ) :
    reviews?.map(review => <li key={review} className='BaseProductInfo__review'>{review}</li>);

  return (
    <div className="BaseProductInfo">
      <div className="BaseProductInfo__categories">
        {categories.map(cat =>
          <h3 key={cat}
            className={cat === activeCat ?
              'BaseProductInfo__category active' :
              'BaseProductInfo__category'}
            onClick={e => setActiveCat(e.currentTarget.textContent)}>{cat}</h3>)
        }
      </div>
      <ul className="BaseProductInfo__content">
        {content}
      </ul>
    </div>
  )
}

export default BaseProductInfo;