function Header() {
  return (
    <header className=" p-15 mx-10 flex items-center justify-between">
      <img src="/logo.svg" />
      <div>
        <button className="flex items-center justify-between bg-neutral-700 cursor-pointer gap-2 p-2.5 h-10 w-30 opacity-95 rounded-lg">
          <img src="src/assets/images/icon-units.svg" />
          <p className="text-neutral-0">Units</p>
          <img src="src/assets/images/icon-dropdown.svg" />
        </button>
      </div>
    </header>
  );
}

export default Header;
