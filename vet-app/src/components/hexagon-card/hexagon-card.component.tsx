import React from "react";
import "./hexagon-card.style.scss";

const hexagons = [
    { id: 1, image: 'https://source.unsplash.com/random/1', text: 'Paws & Love' },
    { id: 2, image: 'https://source.unsplash.com/random/2', text: 'Our Team' },
    { id: 3, image: 'https://source.unsplash.com/random/3', text: 'Quality Care' },
    { id: 4, image: 'https://source.unsplash.com/random/1', text: 'Best Buddy' },
    { id: 5, image: 'https://source.unsplash.com/random/2', text: 'Shared love' },
    { id: 6, image: 'https://source.unsplash.com/random/3', text: 'Simple Care' },
    // Add more hexagon data objects
  ];

const HexagonCard = () => {
  return (
    <div className={"hexagon-grid"}>
      {hexagons.map((hex) => (
        <div key={hex.id} className={"hexagon"}>
          <img src={hex.image} alt="Hexagon" />
          <div className={"hexagon-text"}>{hex.text}</div>
        </div>
      ))}
    </div>
  );
};

export default HexagonCard;
