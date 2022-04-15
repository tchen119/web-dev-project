import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./components/home-screen";
import SearchScreen from "./components/search-screen";
import ProfileScreen from "./components/profile-screen";
import DetailsScreen from "./components/details-screen";
import SignUpScreen from "./components/signup-screen";
import LoginScreen from "./components/login-screen";
import PrivacyScreen from "./components/privacy-screen";
import Restaurant from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="signup" element={<SignUpScreen/>}/>
          <Route path="login" element={<LoginScreen/>}/>
          <Route path="privacy" element={<PrivacyScreen/>}/>
          <Route path="/" element={<Restaurant/>}>
            <Route index element={<HomeScreen/>}/>
              <Route path="profile" element={<ProfileScreen/>}/>
              <Route path="search" element={<SearchScreen/>}/>
              <Route path="search/:term/:location" element={<SearchScreen/>}/>
              <Route path="search/details/:id" element={<DetailsScreen/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
