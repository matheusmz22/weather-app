function StatCard({title, content}) {
  return (
    <div className="w-full  min-w-[8.5rem] max-w-[12rem] h-28 bg-neutral-700 border-2 border-neutral-600 rounded-2xl mx-auto flex flex-col items-start px-3 gap-2 justify-center ">
      <header className="text-xl text-neutral-300">{title}</header>
      <p className="text-2xl text-neutral-200">{content}</p>
    </div>
  );
}

export default StatCard;
