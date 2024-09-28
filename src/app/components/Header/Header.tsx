import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { PiAirplaneTiltLight } from "react-icons/pi";
import styles from "../../Ui/Header/Header.module.css";
interface linksData {
  name: string;
  link: string;
}
const links: linksData[] = [
  {
    name: "Deals",
    link: "#",
  },
  {
    name: "Features",
    link: "#",
  },
  {
    name: "Testimonials",
    link: "#",
  },
  {
    name: "Pricing",
    link: "#",
  },
];
const Header = () => {
  return (
    <Grid
      container
      sx={{ p: 2, bgcolor: "#fff9eb", position: "sticky", top: 0, left: 0 }}
    >
      <Grid item xs={6}>
        <Typography
          sx={{
            color: "#FF5D00",
            fontSize:"24px",
            fontWeight:600,
          }}
        >
          <PiAirplaneTiltLight style={{ marginRight: 8 }} />
          AfricanEscapes
        </Typography>
      </Grid>
      <Grid item xs={6} px={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {links.map((item) => (
            <Link
              href={item.link}
              style={{ textDecoration: "none" }}
            >
             <Typography sx={{":hover":{color:"#FF5D00"}, color: "#000", fontWeight: 600,}}>{item.name}</Typography> 
            </Link>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
export default Header;
