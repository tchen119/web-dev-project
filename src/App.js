import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from "./components/home-screen";
import SearchScreen from "./components/search-screen";
import ProfileScreen from "./components/profile-screen";
import Restaurant from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Restaurant/>}>
            <Route index element={<HomeScreen/>}/>
              <Route path="profile" element={<ProfileScreen/>}/>
              <Route path="search" element={<SearchScreen/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
