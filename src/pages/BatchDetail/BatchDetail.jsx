import React from 'react';
import { useParams } from 'react-router-dom';

export const BatchDetail = () => {
  let { id } = useParams();

  return <div>BatchDetail {id}</div>;
};
