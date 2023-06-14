import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getPathByCategory } from '../redux/slices/categoriesSlice';
const UserPathWrapper = styled.div`
margin-bottom:24px;
font-size:16px;
display:flex;
gap:8px;
`;



const UserPath = ({ path }) => {


  return (
    <UserPathWrapper className="userPath">
      <Link to='/' style={{ color: '#A9A9A9' }}>Homepage /</Link>
      {path.map((title, i) => {
        return i !== path.length - 1 ?
          <Link
            key={title}
            to={
              getPathByCategory(title)
            }
            style={{ color: '#A9A9A9' }}>{title} /</Link> :
          <span key={title}>{title}</span>;
      })}
    </UserPathWrapper>
  )
}

export default UserPath;