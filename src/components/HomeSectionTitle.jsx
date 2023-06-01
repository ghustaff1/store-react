import React from 'react'
import styled from 'styled-components'

const Title = styled.h2`
  color:#151515;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  line-height: 1.5;
`;
const HomeSectionTitle = ({title}) => {
  return (
    <Title>{title}</Title>
  )
}

export default HomeSectionTitle;