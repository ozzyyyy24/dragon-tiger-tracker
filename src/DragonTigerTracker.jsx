import { useState } from "react";
import { Card, CardContent } from "./components/ui/card"; // ❌ Remove this line
import { Button } from "./components/ui/button"; // ✅ Keep this

export default function DragonTigerTracker() {
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [bankroll, setBankroll] = useState(0);

  const addResult = (dragonCard, tigerCard, dragonColor, tigerColor, outcome) => {
    const newEntry = { dragonCard, tigerCard, dragonColor, tigerColor, outcome };
    const newHistory = [...history, newEntry];
    setHistory(newHistory);
    calculateNextBet(newHistory);

    if (outcome === "win") {
      setBankroll(bankroll + 1);
    } else if (outcome === "loss") {
      setBankroll(bankroll - 1);
    }
  };

  const calculateNextBet = (results) => {
    if (results.length < 1) {
      setPrediction("Waiting for more data");
      return;
    }

    const last = results[results.length - 1];
    const dragonVal = parseInt(last.dragonCard);
    const tigerVal = parseInt(last.tigerCard);

    // Strategy 1: Card Value-Based
    if (dragonVal <= 5) {
      setPrediction("Bet on Tiger (Dragon card is low)");
      return;
    } else if (dragonVal >= 6) {
      setPrediction("Bet on Dragon (Dragon card is high)");
      return;
    }

    // Strategy 2: Sum Parity
    const sum = dragonVal + tigerVal;
    if (sum % 2 === 0) {
      setPrediction("Bet on Tiger (Sum is even)");
    } else {
      setPrediction("Bet on Dragon (Sum is odd)");
    }

    // Strategy 3: Higher Card Color
    if (dragonVal > tigerVal && last.dragonColor === "black") {
      setPrediction("Bet on Dragon (High black card)");
    } else if (tigerVal > dragonVal && last.tigerColor === "red") {
      setPrediction("Bet on Tiger (High red card)");
    }
  };

  const handleAdd = () => {
    const dragonCard = prompt("Enter Dragon card (1-13):");
    const tigerCard = prompt("Enter Tiger card (1-13):");
    const dragonColor = prompt("Enter Dragon color (red/black):");
    const tigerColor = prompt("Enter Tiger color (red/black):");
    const outcome = prompt("Did you win or lose this round? (win/loss):");
    addResult(dragonCard, tigerCard, dragonColor, tigerColor, outcome);
  };

  const quickAdd = (dragonCard, tigerCard, dragonColor, tigerColor, outcome) => {
    addResult(dragonCard, tigerCard, dragonColor, tigerColor, outcome);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Dragon Tiger Tracker</h2>
          <p className="mb-2">Bankroll: <span className="font-semibold">{bankroll}</span></p>
          <ul className="text-sm mb-2">
            {history.map((entry, i) => (
              <li key={i}>
                Round {i + 1}: D-{entry.dragonCard}({entry.dragonColor}), T-{entry.tigerCard}({entry.tigerColor}) — <span className={entry.outcome === "win" ? "text-green-600" : "text-red-600"}>{entry.outcome}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold">Next Bet: {prediction}</p>
        </CardContent>
      </Card>
      <div className="flex gap-2 flex-wrap mb-4">
        <Button onClick={handleAdd} variant="outline">Add Round</Button>
        <Button onClick={() => {
          setHistory([]);
          setPrediction("");
          setBankroll(0);
        }} variant="destructive">Reset</Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={() => quickAdd(7, 3, "black", "red", "win")}>Dragon Win</Button>
        <Button onClick={() => quickAdd(3, 10, "red", "black", "loss")}>Tiger Win</Button>
      </div>
    </div>
  );
}
