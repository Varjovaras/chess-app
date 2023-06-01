import { type NextPage } from "next";
import Head from "next/head";
import { FormEventHandler, useState } from "react";
import Chess from "~/chess/chess";
import Board from "~/components/Board";
import ChessForm from "~/components/ChessForm";

const chess = new Chess();
chess.startingPosition();
// chess.move("f2", "f3");
// chess.move("e7", "e5");
// chess.move("g2", "g4");
// chess.move("d8", "h4");
// chess.move("a2", "a4");

const Home: NextPage = () => {
  const [board, setBoard] = useState(chess.getBoard.getBoard);
  const [startSq, setStartSq] = useState("");
  const [endSq, setEndSq] = useState("");

  board.reverse();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    chess.move(startSq, endSq);
  };
  return (
    <>
      <Head>
        <title>Chess App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-10 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-cyan-400">Chess app</span>
          </h1>
          {chess.getCheckmate ? (
            <h1 className="text-red-500">game over</h1>
          ) : (
            <></>
          )}

          <Board board={board} />

          <ChessForm chess={chess} />
          {/* <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">About me →</h3>
            <div className="text-lg">Learn more about me</div>
          </Link> */}
        </div>
      </main>
    </>
  );
};

export default Home;
