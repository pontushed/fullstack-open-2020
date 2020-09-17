import React from 'react';

const Total: React.FC<{ exercisesSum: number }> = ({ exercisesSum }) => {
  return (
    <div>
      <p>Number of exercises: {exercisesSum}</p>
    </div>
  );
};

export default Total;
