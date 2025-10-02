import Header from "./components/Header/Header";
import WeatherDashboard from "./components/Weather/WeatherDashboard";
import SearchBar from "./SearchBar/SearchBar";

function App() {
  return (
    <div>
      <Header />
      <SearchBar />
      <WeatherDashboard />
    </div>
  );
}

export default App;
