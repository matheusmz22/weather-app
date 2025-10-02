import {useState} from "react";
import Header from "./components/Header/Header";
import WeatherDashboard from "./components/Weather/WeatherDashboard";
import SearchBar from "./SearchBar/SearchBar";

function App() {
  const [isMetric, setIsMetric] = useState(true);

  return (
    <div>
      <Header isMetric={isMetric} setIsMetric={setIsMetric} />
      <SearchBar />
      <WeatherDashboard isMetric={isMetric} setIsMetric={setIsMetric} />
    </div>
  );
}

export default App;
