import React from 'react';

const Cursor = ({ mpostion }) => {
  console.log(mpostion);
  return (
    <div
      className="absolute z-[100000] bg-red-500"
      style={{ left: mpostion.x+10, top: mpostion.y }}
    >
      This is Cursor
    </div>
  );
};

export default Cursor;
