import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Box} from "@mui/material";
import Dashboard from "./components/Dashboard/Dashboard";

export default function Home() {
  return (
    <Box>
      <Header />
      <main style={{ background: "#fff9eb" }}>
       <Dashboard/>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
}
