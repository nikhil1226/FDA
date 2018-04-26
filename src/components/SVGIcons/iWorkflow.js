import React from 'react';

const SvgiWorkflow = props => {
  const className = props.className;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" className={className} color="rgba(0, 0, 0, 0.87)">
      <path
        d="M21.71,16.23l.06-.16H25V8.93H21.77l-.06-.16A9.82,9.82,0,0,0,16.23,3.3l-.16-.06V0H8.93V3.23l-.16.06A9.82,9.82,0,0,0,3.29,8.77l-.06.16H0v7.14H3.23l.06.16A9.82,9.82,0,0,0,8.77,21.7l.16.06V25h7.14V21.77l.16-.06A9.82,9.82,0,0,0,21.71,16.23ZM19.9,11H23V14H19.9ZM11,2H14V5.1H11ZM5.1,14H2V11H5.1ZM14,23H11V19.9H14Zm2.42-3.62-.38.22v-1.7H8.93v1.7l-.38-.22a7.88,7.88,0,0,1-2.89-2.89l-.22-.38h1.7V8.93H5.44l.22-.38A7.87,7.87,0,0,1,8.55,5.66l.38-.22v1.7h7.14V5.44l.38.22a7.87,7.87,0,0,1,2.89,2.89l.22.38h-1.7v7.14h1.7l-.22.38A7.87,7.87,0,0,1,16.45,19.34Z"
        fill="#175d9d"
      />
    </svg>
  );
};

export default SvgiWorkflow;
