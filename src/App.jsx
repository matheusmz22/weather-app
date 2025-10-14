import {useState} from "react";
import Header from "./components/Header/Header";
import WeatherDashboard from "./components/Weather/WeatherDashboard";
import SearchBar from "./SearchBar/SearchBar";

function App() {
  const [isMetric, setIsMetric] = useState(true);
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [selectedSearch, setSelectedSearch] = useState(null);

  return (
    <div>
      <Header isMetric={isMetric} setIsMetric={setIsMetric} />
      <SearchBar
        setSelectedCoords={setSelectedCoords}
        setSelectedSearch={setSelectedSearch}
      />
      <WeatherDashboard
        isMetric={isMetric}
        setIsMetric={setIsMetric}
        selectedCoords={selectedCoords}
        selectedSearch={selectedSearch}
      />
    </div>
  );
}

export default App;
