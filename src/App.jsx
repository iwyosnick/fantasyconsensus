import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  Select, MenuItem, FormControl, InputLabel, TextField, Box, TableSortLabel
} from "@mui/material";

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1FUOJ-iw0rLbzpprE706bevnhSBHmmdFw2IOUQm2z0Ssk3AzQ9nD-loudBNoQj5fSrBj7JACYA6qW/pub?output=csv";

const columns = [
  { id: "Average", label: "Average" },
  { id: "Player", label: "Player" },
  { id: "Position", label: "Position" },
  { id: "Team", label: "Team" },
  { id: "Bye", label: "Bye" },
  { id: "CBS", label: "CBS" },
  { id: "ESPN", label: "ESPN" },
  { id: "Fantasy Pros", label: "Fantasy Pros" },
  { id: "PFF", label: "PFF" },
  { id: "Yahoo", label: "Yahoo" },
];

function descendingComparator(a, b, orderBy) {
  // Try to compare as numbers, fallback to string
  const aVal = a[orderBy];
  const bVal = b[orderBy];
  if (!isNaN(parseFloat(aVal)) && !isNaN(parseFloat(bVal))) {
    return parseFloat(bVal) - parseFloat(aVal);
  }
  if (bVal < aVal) return -1;
  if (bVal > aVal) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function App() {
  const [rankings, setRankings] = useState([]);
  const [position, setPosition] = useState("All");
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Average");

  useEffect(() => {
    Papa.parse(GOOGLE_SHEET_CSV_URL, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // Filter out empty rows (no Player name)
        setRankings(results.data.filter(row => row.Player && row.Player.trim() !== ""));
      }
    });
  }, []);

  const positions = ["All", ...Array.from(new Set(rankings.map(p => p.Position).filter(Boolean)))];

  const filtered = rankings.filter(player =>
    (position === "All" || player.Position === position) &&
    (player.Player || "").toLowerCase().includes(search.toLowerCase())
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
              {columns.map(col => (
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
                {columns.map(col => (
                  <TableCell sx={{ color: "#1a202c" }} key={col.id}>
                    {player[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
