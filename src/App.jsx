import React from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className='App'>
        <Sidebar />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
