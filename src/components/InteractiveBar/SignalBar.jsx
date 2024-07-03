const SignalBar = () => {
  return (
    <div className=" flex gap-1 max-w-[70px] h-full items-end">
      <div className="w-[15px] border h-full bg-green-600"></div>
      <div className="w-[15px] border h-3/4 bg-green-600"></div>
      <div className="w-[15px] border h-1/2 bg-green-600"></div>
      <div className="w-[15px] border h-1/3 bg-green-600"></div>
    </div>
  );
};

export default SignalBar;
