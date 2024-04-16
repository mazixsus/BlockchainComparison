import Image from "next/image";
import { MainPage } from "../components/MainPage";
import { CssBaseline } from "@mui/material";

export default function Home() {
  return (
    <main>
      <CssBaseline/>
      <MainPage/>
    </main>
  );
}
