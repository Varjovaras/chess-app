import React from "react";
import Piece from "./Piece";
import { Square as Sq } from "~/chess/board/square";

const Square = ({ sq }: { sq: Sq }) => {
  return (
    <div>
      {sq.getPiece ? (
        <Piece sq={sq} key={sq.getId} piece={pieceHelper(sq)} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Square;

const pieceHelper = (sq: Sq) => {
  const piece = sq.getPiece;
  switch (piece!.getName) {
    case "pawn":
      return "./pieces/white_pawn.svg";
    case "PAWN":
      return "./pieces/black_pawn.svg";
    case "night":
      return "./pieces/white_knight.svg";
    case "NIGHT":
      return "./pieces/black_knight.svg";
    case "bishop":
      return "./pieces/white_bishop.svg";
    case "BISHOP":
      return "./pieces/black_bishop.svg";
    case "queen":
      return "./pieces/white_queen.svg";
    case "QUEEN":
      return "./pieces/black_queen.svg";
    case "king":
      return "./pieces/white_king.svg";
    case "KING":
      return "./pieces/black_king.svg";
    case "rook":
      return "./pieces/white_rook.svg";
    case "ROOK":
      return "./pieces/black_rook.svg";
  }
};
