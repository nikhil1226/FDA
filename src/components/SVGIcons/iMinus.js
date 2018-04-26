import React from 'react';

const SvgiMinus = props => {
  const className = props.className;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" className={className} color="rgba(0, 0, 0, 0.87)">
      <polygon
        points="0 6.25 2.5 6.25 2.5 2.5 6.25 2.5 6.25 0 0 0 0 6.25"
        fill="#175d9d"
      />
      <polygon
        points="2.5 18.75 0 18.75 0 25 6.25 25 6.25 22.5 2.5 22.5 2.5 18.75"
        fill="#175d9d"
      />
      <polygon
        points="22.5 22.5 18.75 22.5 18.75 25 25 25 25 18.75 22.5 18.75 22.5 22.5"
        fill="#175d9d"
      />
      <polygon
        points="18.75 0 18.75 2.5 22.5 2.5 22.5 6.25 25 6.25 25 0 18.75 0"
        fill="#175d9d"
      />
      <rect y="8.75" width="2.5" height="7.5" fill="#175d9d" />
      <rect x="8.75" y="22.5" width="7.5" height="2.5" fill="#175d9d" />
      <rect x="22.5" y="8.75" width="2.5" height="7.5" fill="#175d9d" />
      <rect x="8.75" width="7.5" height="2.5" fill="#175d9d" />
      <rect x="7.5" y="11.25" width="10" height="2.5" fill="#175d9d" />
    </svg>
  );
};

export default SvgiMinus;
