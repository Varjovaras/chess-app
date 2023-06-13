import React from "react";
import { Square as Sq } from "~/chess/board/square";
import Square from "./Square";

const Board = ({
  board,
  handlePieceClick,
}: {
  board: Sq[];
  handlePieceClick: (sq: Sq) => void;
}) => {
  return (
    <div className="grid grid-cols-8">
      {board.map((sq) =>
        sq.getColor === "WHITE" ? (
          <button
            className="h-16 w-16 bg-gray-200 text-center hover:bg-cyan-200 hover:text-base focus:bg-teal-500 sm:h-8 sm:w-8"
            key={sq.getId}
            onClick={() => handlePieceClick(sq)}
          >
            <Square sq={sq} />
          </button>
        ) : (
          <button
            className="h-16 w-16 bg-gray-400 text-center hover:bg-cyan-200 hover:text-base focus:bg-teal-500 sm:h-8 sm:w-8"
            key={sq.getId}
            onClick={() => handlePieceClick(sq)}
          >
            <Square sq={sq} />
          </button>
        )
      )}
    </div>
  );
};

export default Board;
