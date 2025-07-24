import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  Select, MenuItem, FormControl, InputLabel, TextField, Box, TableSortLabel
} from "@mui/material";

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

const positions = ["All", ...Array.from(new Set(mockRankings.map(p => p.position)))];

function descendingComparator(a, b, orderBy) {
  if (orderBy === "average") {
    const avgA = parseFloat(average(a.espn, a.yahoo, a.fantasypros));
    const avgB = parseFloat(average(b.espn, b.yahoo, b.fantasypros));
    if (avgB < avgA) return -1;
    if (avgB > avgA) return 1;
    return 0;
  }
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function App() {
  const [position, setPosition] = useState("All");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const filtered = mockRankings.filter(player =>
    (position === "All" || player.position === position) &&
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = filtered.slice().sort(getComparator(order, orderBy));

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div style={{ padding: 24, background: '#f4f6fa', minHeight: '100vh' }}>
      <Typography variant="h3" align="center" fontWeight={800} color="#1a202c" gutterBottom>
        Fantasy Football Consensus Rankings
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 2, maxWidth: 900, mx: "auto" }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="position-label">Position</InputLabel>
          <Select
            labelId="position-label"
            value={position}
            label="Position"
            onChange={e => setPosition(e.target.value)}
          >
            {positions.map(pos => (
              <MenuItem key={pos} value={pos}>{pos}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Search Player"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box>
      <TableContainer component={Paper} elevation={3} sx={{ maxWidth: 900, margin: "0 auto", mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { id: "name", label: "Player" },
                { id: "team", label: "Team" },
                { id: "position", label: "Position" },
                { id: "espn", label: "ESPN" },
                { id: "yahoo", label: "Yahoo" },
                { id: "fantasypros", label: "FantasyPros" },
                { id: "average", label: "Average" }
              ].map(col => (
                <TableCell
                  key={col.id}
                  sortDirection={orderBy === col.id ? order : false}
                  sx={{ color: "#1a202c", fontWeight: 700, background: "#f7f7f7" }}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : "asc"}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((player, idx) => (
              <TableRow
                key={idx}
                hover
                sx={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#f1f5f9" }}
              >
                <TableCell sx={{ color: "#1a202c" }}>{player.name}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.team}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.position}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.espn}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.yahoo}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.fantasypros}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>
                  {average(player.espn, player.yahoo, player.fantasypros)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
