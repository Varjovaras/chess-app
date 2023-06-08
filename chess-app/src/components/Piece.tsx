import React from "react";
import Image from "next/image";

import { Square } from "~/chess/board/square";

type Props = {
  sq: Square;
  piece: string | undefined;
  handlePieceClick: (sq: string) => void;
};

const Piece = (props: Props) => {
  const sq = props.sq;
  const piece = props.piece;
  const handlePieceClick = props.handlePieceClick;

  return (
    <button
      className="content-end hover:bg-sky-700"
      key={sq.getId}
      onClick={() => handlePieceClick(sq.getSquareName)}
      value={sq.getSquareName}
    >
      {piece ? (
        <Image src={piece} width={100} height={100} alt={piece} />
      ) : (
        <></>
      )}
    </button>
  );
};

export default Piece;
