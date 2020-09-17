import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((p) => (
        <div key={p.name}>
          <Part key={p.name} part={p}></Part>
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default Content;
