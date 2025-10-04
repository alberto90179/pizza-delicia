import React from 'react';
import ComboCard from './ComboCard';

function ComboSection() {
  const combos = [
    {
      title: '2 pizzas medianas de 2 ingredientes',
      description: 'Llévate 2 pizzas medianas de 2 ingredientes a tan solo $180 pesos',
      image: 'https://cdn7.kiwilimon.com/recetaimagen/41724/960x640/57505.jpg.jpg',
      alt: 'promoción de la semana',
      reverse: false,
    },
    {
      title: 'Para estas fiestas patrias',
      description: '2 pizzas mexicanas, 1 orden de nachos, salsa macha y un refresco de 2 lts a solo $240 pesos',
      image: 'https://web.didiglobal.com/_next/image/?url=https%3A%2F%2Fimg0.didiglobal.com%2Fstatic%2Fsoda_public%2Fimg_9c79865e66d44bb79f9d2ac458688a3e.JPG4_3&w=3840&q=75',
      alt: 'promoción de la semana',
      reverse: true,
    },
  ];

  return (
    <div className="combo-container">
      {combos.map((combo, index) => (
        <ComboCard key={index} {...combo} />
      ))}
    </div>
  );
}

export default ComboSection;