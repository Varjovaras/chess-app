import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Square as Sq } from "~/chess/board/square";
import Chess from "~/chess/chess";
import Board from "~/components/Board";
import ChessForm from "../components/ChessForm";
import Image from "next/image";

const chess = new Chess();
chess.startingPosition();
// chess.move("e2", "e4");
// chess.move("b8", "c6");
// chess.move("d1", "h5");

const Home: NextPage = () => {
  const [board, setBoard] = useState(chess.getBoard.getBoardToFront);
  const [startSq, setStartSq] = useState("");
  const [endSq, setEndSq] = useState("");

  // useEffect(() => {});

  const handleStartSqChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setStartSq(e.target.value);
  };

  const handleEndSqChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEndSq(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e);
    try {
      chess.move(startSq, endSq);
    } catch {
      console.log("error");
      return;
    }
    setBoard(chess.getBoard.getBoardToFront);
    setStartSq("");
    setEndSq("");
  };

  const handlePieceClick = (sq: Sq) => {
    const piece = sq.getPiece;
    if (startSq === "" && piece) {
      setStartSq(sq.getSquareName);
      return;
    }
    if (startSq !== "") {
      try {
        chess.move(startSq, sq.getSquareName);
      } catch {
        if (piece) {
          setStartSq(sq.getSquareName);
        } else {
          setStartSq("");
        }
      }
      setStartSq("");
    }
  };

  return (
    <>
      <Head>
        <title>Chess App</title>
        <meta
          name="description"
          content="Chess-app generated by create-t3-app"
        />
        <link rel="icon" href="/pieces/black_king.svg" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-10 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-cyan-400">Chess App</span>
          </h1>
          {chess.getCheckmate ? (
            <h1 className="text-red-500">game over</h1>
          ) : (
            <></>
          )}

          <Board board={board} handlePieceClick={handlePieceClick} />

          <ChessForm
            startSq={startSq}
            endSq={endSq}
            handleStartSqChange={handleStartSqChange}
            handleEndSqChange={handleEndSqChange}
            handleSubmit={handleSubmit}
          />
          {/* {/* <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">About me →</h3>
            <div className="text-lg">Learn more about me</div>
          </Link> */}
          <a href="https://github.com/Varjovaras/chess-app">
            <Image
              src={"./github-mark.svg"}
              alt="Github link to repository"
              width={40}
              height={40}
            />
          </a>
          <p className="w-full max-w-xs text-center text-xs text-gray-500">
            &copy;2023 Kristjan Rajaniemi
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
