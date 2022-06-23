const PlusMinus = ({ decrement, increment, quantity }) => {
  return (
    <div className="flex w-full items-center text-sm">
      <button
        className="grow bg-slate-800 text-white border-y-2 border-slate-800"
        onClick={decrement}
      >
        -
      </button>
      <span className="grow border-y-2 border-slate-800 text-center">
        {quantity}
      </span>
      <button
        className="grow text-white bg-slate-800 border-y-2 border-slate-800"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default PlusMinus;
