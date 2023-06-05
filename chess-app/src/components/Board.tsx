import React from "react";
import { Square as Sq } from "~/chess/board/square";
import Square from "./Square";

type Props = {};

const Board = ({ board }: { board: Sq[] }) => {
  board.reverse();

  return (
    <div className="grid grid-cols-8  sm:grid-cols-8">
      {board.map((sq) =>
        sq.getColor === "WHITE" ? (
          <div
            className="h-14 w-14 bg-gray-200 text-center hover:text-base"
            key={sq.getId}
          >
            <Square sq={sq} />
          </div>
        ) : (
          <div
            className="h-14 w-14 bg-gray-400 text-center hover:text-base"
            key={sq.getId}
          >
            <Square sq={sq} />
          </div>
        )
      )}
    </div>
  );
};

export default Board;
