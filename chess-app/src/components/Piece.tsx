import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Square } from "~/chess/board/square";

type Props = {
  sq: Square;
};

const Piece = (props: Props) => {
  const sq = props.sq;
  const [piece, setPiece] = useState("./no_image.svg");
  useEffect(() => {
    const piece = pieceHelper(sq);

    if (piece) {
      return setPiece(piece);
    }
  }, [sq]);

  return (
    <div className="content-end" key={sq.getId}>
      {piece !== undefined ? (
        <Image src={piece} width={100} height={100} alt={piece} />
      ) : (
        <></>
      )}
      {/* {sq.getPiece?.getFirstLetter} */}
    </div>
  );
};

export default Piece;

const pieceHelper = (sq: Square) => {
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
