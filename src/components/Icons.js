import React from 'react';

export function BaselineCheck(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
      ></path>
    </svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        fill="currentColor"
        d="M7 10l5 5 5-5H7z"
      />
    </svg>
  );
}

export function ChevronUpIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path
        fill="currentColor"
        d="M7 14l5-5 5 5H7z"
      />
    </svg>
  );
}


