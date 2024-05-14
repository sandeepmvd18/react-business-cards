import React, { useState } from 'react';
import { BusinessCard } from './components/BusinessCard';
import { AddCardForm } from './components/AddCardForm';

function App() {
  const [cards, setCards] = useState([]);

  const handleAddCard = (newCard) => {
    setCards([...cards, newCard]);
  };

  return (
    <div>
      <h1>Business Card App</h1>
      <AddCardForm onAddCard={handleAddCard} />
      {cards.map((card, index) => (
        <BusinessCard
          key={index}
          name={card.name}
          description={card.description}
          linkedin={card.linkedin}
          twitter={card.twitter}
          otherSocialMedia={card.otherSocialMedia}
          interests={card.interests}
        />
      ))}
    </div>
  );
}

export default App;
