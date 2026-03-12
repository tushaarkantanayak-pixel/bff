"use client";

import GameCardList from "./GameCardList";

export default function GameList({ games, isOutOfStock }) {
  return (
    <div className="space-y-3">
      {games.map((game, i) => (
        <GameCardList
          key={i}
          index={i}
          game={game}
          isOutOfStock={isOutOfStock}
        />
      ))}
    </div>
  );
}
