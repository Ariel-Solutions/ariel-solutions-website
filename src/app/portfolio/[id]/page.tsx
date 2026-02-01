'use client'

import { useParams } from 'next/navigation';

const PortfolioItem = () => {
  const params = useParams();
  const id = params.id;

  return (
    <div style={{ border: "2px solid red", padding: "20px" }}>
      <h1>Portfolio Item: {id}</h1>
    </div>
  );
};

export default PortfolioItem;
