import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  AppBar, Toolbar, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Select, MenuItem, FormControl, InputLabel, TextField, TableSortLabel, Container
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

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

function DraftPage() {
  // This is the former RankingsPage
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
    <Container maxWidth={false} disableGutters sx={{ background: '#f4f6fa', minHeight: '100vh', width: '100vw', pt: { xs: 7, sm: 8 } }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight={800}
        color="#1a202c"
        gutterBottom
        sx={{ pt: 3, fontSize: { xs: 22, sm: 32 } }}
      >
        Fantasy Football Consensus Draft Rankings
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 2 },
          mb: 2,
          maxWidth: 1100,
          mx: "auto"
        }}
      >
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
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ maxWidth: 1100, margin: "0 auto", mt: 2, overflowX: "auto" }}
      >
        <Table sx={{ width: "100%", minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ minHeight: { xs: 36, sm: 48 } }}>
              {columns.map(col => (
                <TableCell
                  key={col.id}
                  sortDirection={orderBy === col.id ? order : false}
                  sx={{
                    color: "#1a202c",
                    fontWeight: 700,
                    background: "#f7f7f7",
                    p: { xs: 0.5, sm: 1.5 },
                    fontSize: { xs: 12, sm: 16 },
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    verticalAlign: 'middle',
                  }}
                  align={col.id === "Player" ? "left" : "center"}
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
                sx={{ backgroundColor: idx % 2 === 0 ? "#fff" : "#f1f5f9", minHeight: { xs: 36, sm: 48 } }}
              >
                {columns.map(col => (
                  <TableCell
                    sx={{
                      color: "#1a202c",
                      p: { xs: 0.5, sm: 1.5 },
                      fontSize: { xs: 12, sm: 16 },
                      verticalAlign: 'middle',
                    }}
                    key={col.id}
                    align={col.id === "Player" ? "left" : "center"}
                  >
                    {player[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

function WeeklyPage() {
  return (
    <Container maxWidth="md" sx={{ pt: { xs: 10, sm: 12 } }}>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        Weekly Rankings
      </Typography>
      <Typography align="center" sx={{ fontSize: { xs: 16, sm: 20 } }}>
        Weekly fantasy football rankings and projections will appear here.
      </Typography>
    </Container>
  );
}

function WaiversPage() {
  return (
    <Container maxWidth="md" sx={{ pt: { xs: 10, sm: 12 } }}>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        Waivers
      </Typography>
      <Typography align="center" sx={{ fontSize: { xs: 16, sm: 20 } }}>
        Waiver wire pickups, advice, and analysis will appear here.
      </Typography>
    </Container>
  );
}

function TradesPage() {
  return (
    <Container maxWidth="md" sx={{ pt: { xs: 10, sm: 12 } }}>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        Trades
      </Typography>
      <Typography align="center" sx={{ fontSize: { xs: 16, sm: 20 } }}>
        Trade analyzer and recommendations will appear here.
      </Typography>
    </Container>
  );
}

function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ pt: { xs: 10, sm: 12 } }}>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        About
      </Typography>
      <Typography align="center" sx={{ fontSize: { xs: 16, sm: 20 } }}>
        This site provides consensus fantasy football rankings, aggregating data from multiple sources. Built with React, Material UI, and Google Sheets for easy updates.
      </Typography>
    </Container>
  );
}

function NavBar() {
  const location = useLocation();
  return (
    <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>
          Fantasy Consensus
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ fontWeight: location.pathname === "/" ? 700 : 400 }}
          >
            Draft
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/weekly"
            sx={{ fontWeight: location.pathname === "/weekly" ? 700 : 400 }}
          >
            Weekly
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/waivers"
            sx={{ fontWeight: location.pathname === "/waivers" ? 700 : 400 }}
          >
            Waivers
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/trades"
            sx={{ fontWeight: location.pathname === "/trades" ? 700 : 400 }}
          >
            Trades
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/about"
            sx={{ fontWeight: location.pathname === "/about" ? 700 : 400 }}
          >
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<DraftPage />} />
        <Route path="/weekly" element={<WeeklyPage />} />
        <Route path="/waivers" element={<WaiversPage />} />
        <Route path="/trades" element={<TradesPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
