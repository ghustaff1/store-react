import axios from 'axios';
import React from 'react';
import './FooterLinks.scss';
import { Link } from 'react-router-dom';
import GreenLink from '../../GreenLink';
import MainTitle from '../../MainTitle';
import AsideTitle from '../../AsideTitle';

const FooterLinks = () => {

  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      await axios.get('http://localhost:8000/footerLinks')
        .then(res => setData(res.data));
    };
    fetchData();
  }, []);



  return (

    <div className="footer-links__refs refs">
      {
        data?.map(obj =>
          <div key={obj.title} className="refs__item">
            <AsideTitle value={obj.title} />
            <ul className="refs__list">
              {obj.links.map(item =>
                <li key={item.text} className='refs__link'>
                  <Link to={item.path}>
                    <GreenLink path={item.path} value={item.text} />
                  </Link>
                </li>)}
            </ul>
          </div>
        )
      }
    </div>

  )
}

export default FooterLinks