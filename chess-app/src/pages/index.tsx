import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Chess from "~/chess/chess";
import Piece from "~/components/Piece";

const chess = new Chess();
chess.startingPosition();

const Home: NextPage = () => {
  const [board, setBoard] = useState(chess.getBoard.getBoard);
  console.log(chess.getBoard.printBoardWhite());
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
          <div className="grid grid-cols-8  sm:grid-cols-8">
            {board.map((sq) =>
              sq.getColor === "WHITE" ? (
                <div
                  className="h-14 w-14 bg-gray-500 text-center hover:text-base"
                  key={sq.getId}
                >
                  <Piece sq={sq} key={sq.getId} />
                </div>
              ) : (
                <div className="h-14 w-14 bg-gray-300" key={sq.getId}>
                  <Piece sq={sq} key={sq.getId} />
                </div>
              )
            )}
          </div>
          {/* <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link> */}
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">About me →</h3>
            <div className="text-lg">Learn more about me</div>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
