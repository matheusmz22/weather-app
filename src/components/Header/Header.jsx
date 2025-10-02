import Dropdown from "./Dropdown";

function Header({isMetric, setIsMetric}) {
  return (
    <header className="sm:p-4 lg:mx-10 flex items-center justify-between p-4">
      <img src="/logo.svg" className="w-40" />
      <Dropdown isMetric={isMetric} setIsMetric={setIsMetric} />
    </header>
  );
}

export default Header;
