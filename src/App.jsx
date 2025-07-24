import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  Select, MenuItem, FormControl, InputLabel, TextField, Box, TableSortLabel
} from "@mui/material";

const mockRankings = [
  { average: 1, name: "Christian McCaffrey", position: "RB", team: "SF", bye: 9, cbs: 1, espn: 1, fantasypros: 1, pff: 1, yahoo: 1 },
  { average: 2.33, name: "Justin Jefferson", position: "WR", team: "MIN", bye: 13, cbs: 2, espn: 2, fantasypros: 3, pff: 2, yahoo: 2 },
  { average: 2.67, name: "Ja'Marr Chase", position: "WR", team: "CIN", bye: 12, cbs: 3, espn: 3, fantasypros: 2, pff: 3, yahoo: 3 },
  { average: 4, name: "Bijan Robinson", position: "RB", team: "ATL", bye: 11, cbs: 4, espn: 4, fantasypros: 4, pff: 4, yahoo: 4 },
  { average: 5, name: "Tyreek Hill", position: "WR", team: "MIA", bye: 10, cbs: 5, espn: 5, fantasypros: 5, pff: 5, yahoo: 5 },
];

const positions = ["All", ...Array.from(new Set(mockRankings.map(p => p.position)))];

function descendingComparator(a, b, orderBy) {
  if (typeof a[orderBy] === "number" && typeof b[orderBy] === "number") {
    return b[orderBy] - a[orderBy];
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
  const [orderBy, setOrderBy] = useState("average");

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
      <Box sx={{ display: "flex", gap: 2, mb: 2, maxWidth: 1100, mx: "auto" }}>
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
      <TableContainer component={Paper} elevation={3} sx={{ maxWidth: 1100, margin: "0 auto", mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { id: "average", label: "Average" },
                { id: "name", label: "Player" },
                { id: "position", label: "Position" },
                { id: "team", label: "Team" },
                { id: "bye", label: "Bye" },
                { id: "cbs", label: "CBS" },
                { id: "espn", label: "ESPN" },
                { id: "fantasypros", label: "Fantasy Pros" },
                { id: "pff", label: "PFF" },
                { id: "yahoo", label: "Yahoo" },
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
                <TableCell sx={{ color: "#1a202c" }}>{player.average}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.name}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.position}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.team}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.bye}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.cbs}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.espn}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.fantasypros}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.pff}</TableCell>
                <TableCell sx={{ color: "#1a202c" }}>{player.yahoo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
