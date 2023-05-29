import React from 'react'

const MoreBtn = () => {

  const btnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '13px 16px',
    borderRadius: '12px',
    backgroundColor: '#F5F5F5',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700',
    color: '#151515',
    fontFamily: "'Poppins', sans-serif"
  }

  return (
    <button className="moreBtn" style={btnStyle}>
      <p style={{fontFamily:'inherit'}}>More products</p>
      <svg style={{transform:'translateY(2px)'}} width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.0332 8.18669L4.7732 5.44669C4.89737 5.32178 4.96706 5.15281 4.96706 4.97669C4.96706 4.80056 4.89737 4.63159 4.7732 4.50669L2.10654 1.84002" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel" />
      </svg>


    </button>
  )
}

export default MoreBtn;