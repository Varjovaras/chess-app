import React from "react";
import { Square as Sq } from "~/chess/board/square";
import Square from "./Square";

const Board = ({
  board,
  startSq,
  handlePieceClick,
}: {
  board: Sq[];
  startSq: string;
  handlePieceClick: (sq: Sq) => void;
}) => {
  return (
    <div className="grid grid-cols-8  sm:grid-cols-8">
      {board.map((sq) =>
        sq.getColor === "WHITE" ? (
          <button
            className="h-14 w-14 bg-gray-200 text-center hover:bg-cyan-200 hover:text-base"
            key={sq.getId}
            onClick={() => handlePieceClick(sq)}
          >
            <Square sq={sq} startSq={startSq} />
          </button>
        ) : (
          <button
            className="h-14 w-14 bg-gray-400 text-center hover:bg-cyan-200 hover:text-base"
            key={sq.getId}
            onClick={() => handlePieceClick(sq)}
          >
            <Square sq={sq} startSq={startSq} />
          </button>
        )
      )}
    </div>
  );
};

export default Board;
