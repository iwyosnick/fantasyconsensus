import React from "react";

const mockRankings = [
  { name: "Christian McCaffrey", team: "SF", position: "RB", espn: 1, yahoo: 1, fantasypros: 1 },
  { name: "Justin Jefferson", team: "MIN", position: "WR", espn: 2, yahoo: 2, fantasypros: 3 },
  { name: "Ja'Marr Chase", team: "CIN", position: "WR", espn: 3, yahoo: 3, fantasypros: 2 },
  { name: "Bijan Robinson", team: "ATL", position: "RB", espn: 4, yahoo: 4, fantasypros: 4 },
  { name: "Tyreek Hill", team: "MIA", position: "WR", espn: 5, yahoo: 5, fantasypros: 5 },
];

function average(...nums) {
  return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
}

function App() {
  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Fantasy Football Consensus Rankings</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Player</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Team</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Position</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>ESPN</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Yahoo</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>FantasyPros</th>
            <th style={{ border: '1px solid #ccc', padding: 8 }}>Average</th>
          </tr>
        </thead>
        <tbody>
          {mockRankings.map((player, idx) => (
            <tr key={idx}>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{player.name}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{player.team}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{player.position}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{player.espn}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{player.yahoo}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>{player.fantasypros}</td>
              <td style={{ border: '1px solid #ccc', padding: 8 }}>
                {average(player.espn, player.yahoo, player.fantasypros)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
