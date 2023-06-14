import React from 'react';
import axios from 'axios';
import './Reviews.scss';
import HomeSectionTitle from '../../AsideTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import { useSwiper } from 'swiper/react';
import 'swiper/scss'; // core Swiper
import 'swiper/scss/navigation'; // Navigation module
import 'swiper/scss/pagination';

const Reviews = () => {
  const [reviewsData, setReviewsData] = React.useState([]);

  const getReviwsData = async () => {
    await axios.get('http://localhost:8000/reviews')
      .then(res => setReviewsData(res.data));
  }

  React.useEffect(() => {
    getReviwsData();
  }, []);


  return (
    <div className="reviews">
      <div className="container">
        <HomeSectionTitle title='Our customers says' />
      </div>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
      >
        {reviewsData?.map(obj => {
          return (
            <SwiperSlide key={obj.name}>
              <article>
                <p className='review__text'>" {obj.text} "</p>
                <h3 className='review__name'>{obj.name}</h3>
                <div className='review__img'>
                  <img src={obj.imgUrl} alt={obj.alt} />
                </div>
              </article>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}


export default Reviews;