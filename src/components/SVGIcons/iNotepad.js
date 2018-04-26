import React from 'react';

const SvgiNotepad = props => {
  const className = props.className;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.5 25" className={className} color="rgba(0, 0, 0, 0.87)" >
      <path
        d="M16.25,2.5V0h-10V2.5H0V25H22.5V2.5Zm-7.5,0h5V5h-5ZM20,22.5H2.5V5H6.25V7.5h10V5H20Z"
        fill="#175d9d"
      />
      <rect x="5" y="10" width="2.5" height="2.5" fill="#175d9d" />
      <rect x="8.75" y="10" width="8.75" height="2.5" fill="#175d9d" />
      <rect x="5" y="15" width="2.5" height="2.5" fill="#175d9d" />
      <rect x="8.75" y="15" width="8.75" height="2.5" fill="#175d9d" />
    </svg>
  );
};

export default SvgiNotepad;
