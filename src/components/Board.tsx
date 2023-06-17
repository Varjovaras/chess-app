import { Square as Sq } from "~/chess/board/square";
import Square from "./Square";

interface Props {
  board: Sq[];
  handlePieceClick: (sq: Sq) => void;
}

const Board = ({ board, handlePieceClick }: Props) => {
  return (
    <div className="grid grid-cols-8">
      {board.map((sq) =>
        sq.getColor === "WHITE" ? (
          <button
            className="lg:h-18 lg:w-18  h-11 w-11 bg-gray-200 text-center hover:bg-cyan-200 hover:text-base focus:bg-teal-500 sm:h-16 sm:w-16"
            key={sq.getId}
            onClick={() => handlePieceClick(sq)}
          >
            <Square sq={sq} />
          </button>
        ) : (
          <button
            className="lg:h-18 lg:w-18 h-11 w-11 bg-gray-400 text-center hover:bg-cyan-200 hover:text-base focus:bg-teal-500 sm:h-16 sm:w-16"
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
