import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import NotificationWrapper from "./component/NotificationWrapper";
import MainRoute from "./route/MainRoute";

function App() {
  return (
    <RecoilRoot>
      <CssBaseline />
      <NotificationWrapper>
        <BrowserRouter>
          <MainRoute />
        </BrowserRouter>
      </NotificationWrapper>
    </RecoilRoot>
  );
}

export default App;
