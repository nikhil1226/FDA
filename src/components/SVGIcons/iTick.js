import React from 'react';

const SvgiTick = props => {
  const className = props.className;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.5 25" className={className} color="rgba(0, 0, 0, 0.87)">
      <path d="M18.984 2.813l-10.547 10.547-4.922-4.922-3.516 3.516 8.438 8.438 14.063-14.063z" fill="#175d9d" />
    </svg>
  );
};

export default SvgiTick;
