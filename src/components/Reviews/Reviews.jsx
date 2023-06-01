import React from 'react';
import axios from 'axios';
import './Reviews.scss';
import HomeSectionTitle from '../HomeSectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/scss/navigation';
import 'swiper/scss';

const Reviews = () => {
  const [reviewsData, setReviewsData] = React.useState([]);

  const getReviwsData = async () => {
    await axios.get('http://localhost:8000/reviews')
      .then(res => setReviewsData(res.data));
  }

  React.useEffect(() => {
    getReviwsData();
  }, [])

  return (
    <div className="reviews">
      <div className="container">
        <HomeSectionTitle title='Our customers says' />
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
        loop={true}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {reviewsData?.map(obj => {
          return (
            <SwiperSlide>
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