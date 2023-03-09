import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Answers from "pages/Answers";
import Forms from "pages/Forms";
import Form from "pages/Form";
import LiveForm from "pages/LiveForm";
import Login from "pages/Login";
import HowItWorks from "pages/HowItWorks";
import { AuthProvider } from "utils/AuthContext";
import { LangProvider } from "utils/LangContext";
import { SettingsProvider } from "utils/SettingsContext";
import { OnlineStatusProvider } from "utils/useOnlineStatus";

const App = () => {
  //Keeps Heroku Dynos awake 24/7
  let http = require("https");
  setInterval(function () {
    http.get("https://ubiquitous-bombolone-37e3ed.netlify.app");
  }, 300000); // every 5 minutes (300000)

  return (
    <AuthProvider>
      <OnlineStatusProvider>
        <LangProvider>
          <SettingsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/howitworks" element={<HowItWorks />} />
                <Route path="/forms" element={<Forms />} />
                {["/form", "/form/:formName"].map((path, index) => {
                  return <Route path={path} element={<Form />} key={index} />;
                })}
                {["/liveform", "/liveform/:formName"].map((path, index) => {
                  return (
                    <Route path={path} element={<LiveForm />} key={index} />
                  );
                })}
                {["/answers", "/answers/:formName"].map((path, index) => {
                  return (
                    <Route path={path} element={<Answers />} key={index} />
                  );
                })}
              </Routes>
            </Router>
          </SettingsProvider>
        </LangProvider>
      </OnlineStatusProvider>
    </AuthProvider>
  );
};

export default App;
