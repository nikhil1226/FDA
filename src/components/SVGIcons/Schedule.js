import React from 'react';

const SvgSchedule = props => {
  const className = props.className;
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.58 30">
      <polygon
        points="25.58 1.23 25.58 25.68 21.25 30 0 30 0 1.23 3.91 1.23 3.91 0 5.32 0 5.32 1.23 20.26 1.23 20.26 0 21.67 0 21.67 1.23 25.58 1.23"
        fill="transparent"
      />
      <path
        className="main-part"
        d="M7.45,19.88v.71h4.74v2.13H6.39a1.07,1.07,0,0,1-1.07-1.07V19.88A2.85,2.85,0,0,1,8.17,17H9.35a.71.71,0,1,0,0-1.42H8.17a.71.71,0,0,0-.71.71H5.32a2.84,2.84,0,0,1,2.85-2.85H9.35a2.84,2.84,0,1,1,0,5.69H8.17a.71.71,0,0,0-.71.71Zm10.67-6.4V17h-1.9a.71.71,0,0,1-.71-.71V13.48H13.38v2.85a2.85,2.85,0,0,0,2.84,2.85h1.9v3.56h2.13V13.48ZM21.67,1.23V0H20.26V1.23H5.32V0H3.91V1.23H0V30H21.25l4.33-4.32V1.23Zm0,26.36h0v-1.5h1.51Zm2.5-2.91H20.25v3.91H1.41V8.89H24.17Zm0-17.2H1.41V2.63h2.5V5.32H5.32V2.63H20.26V5.32h1.41V2.63h2.5Z"
        fill="#0460a8"
      />
    </svg>
  );
};

export default SvgSchedule;
