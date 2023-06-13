import React from "react";
import Image from "next/image";

import { Square } from "~/chess/board/square";

type Props = {
  sq: Square;
  piece: string | undefined;
};

const Piece = (props: Props) => {
  const sq = props.sq;
  const piece = props.piece;

  return (
    <div className="content-end hover:scale-105" key={sq.getId}>
      {piece ? (
        <Image
          src={piece}
          width={100}
          height={100}
          alt={piece}
          priority={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Piece;
