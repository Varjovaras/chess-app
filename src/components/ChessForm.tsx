interface Props {
  startSq: string;
  endSq: string;
  handleStartSqChange: React.ChangeEventHandler<HTMLInputElement>;
  handleEndSqChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChessForm = ({
  startSq,
  endSq,
  handleStartSqChange,
  handleEndSqChange,
  handleSubmit,
}: Props) => {
  return (
    <div className="w-full max-w-xs">
      <form
        className="mb-4 rounded  px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-300">
            Starting square
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="startSq"
            name="startSq"
            type="text"
            placeholder="Starting square"
            value={startSq}
            onChange={handleStartSqChange}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-300">
            Ending square
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-red-500 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            name="endSq"
            id="endSq"
            type="text"
            placeholder="Ending square"
            value={endSq}
            onChange={handleEndSqChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="items-venter focus:shadow-outline  w-full  rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Enter move
          </button>
        </div>
      </form>
      {/* <p className="text-center text-xs text-gray-500">
        &copy;2023 Kristjan Rajaniemi
      </p> */}
    </div>
  );
};

export default ChessForm;
