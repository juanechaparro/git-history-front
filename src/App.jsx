import "./App.css";
import CommitBubbleChart from "./components/CommitBubbleChart";
import CommitHistory from "./components/CommitHistory";

function App() {
  return (
    <div className="App">
      <CommitHistory />
      <CommitBubbleChart />
    </div>
  );
}

export default App;
