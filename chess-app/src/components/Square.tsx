import React from "react";
import Piece from "./Piece";
import { Square as Sq } from "~/chess/board/square";

const Square = ({ sq }: { sq: Sq }) => {
  return <>{sq.getPiece ? <Piece sq={sq} key={sq.getId} /> : <></>}</>;
};

export default Square;
