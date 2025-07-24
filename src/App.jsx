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

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  fontSize: 18,
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  marginTop: 24,
};
const thStyle = {
  border: '1px solid #e0e0e0',
  padding: 12,
  background: '#f7f7f7',
  fontWeight: 600,
  textAlign: 'left',
};
const tdStyle = {
  border: '1px solid #e0e0e0',
  padding: 12,
};
const trHover = {
  transition: 'background 0.2s',
};

function App() {
  return (
    <div style={{ padding: 24, fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', background: '#f4f6fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 800, letterSpacing: -1, color: '#1a202c', marginBottom: 32 }}>Fantasy Football Consensus Rankings</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Player</th>
            <th style={thStyle}>Team</th>
            <th style={thStyle}>Position</th>
            <th style={thStyle}>ESPN</th>
            <th style={thStyle}>Yahoo</th>
            <th style={thStyle}>FantasyPros</th>
            <th style={thStyle}>Average</th>
          </tr>
        </thead>
        <tbody>
          {mockRankings.map((player, idx) => (
            <tr
              key={idx}
              style={{
                ...trHover,
                background: idx % 2 === 0 ? '#fff' : '#f1f5f9',
                cursor: 'pointer',
              }}
              onMouseOver={e => (e.currentTarget.style.background = '#e3e8ef')}
              onMouseOut={e => (e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#f1f5f9')}
            >
              <td style={tdStyle}>{player.name}</td>
              <td style={tdStyle}>{player.team}</td>
              <td style={tdStyle}>{player.position}</td>
              <td style={tdStyle}>{player.espn}</td>
              <td style={tdStyle}>{player.yahoo}</td>
              <td style={tdStyle}>{player.fantasypros}</td>
              <td style={tdStyle}>
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
