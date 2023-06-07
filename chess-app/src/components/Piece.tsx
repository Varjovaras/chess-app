import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Square } from "~/chess/board/square";

type Props = {
  sq: Square;
  piece: string | undefined;
};

const Piece = (props: Props) => {
  const sq = props.sq;
  const piece = props.piece;
  // const [piece, setPiece] = useState("./no_image.svg");

  return (
    <div className="content-end" key={sq.getId}>
      {piece ? (
        <Image src={piece} width={100} height={100} alt={piece} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Piece;
