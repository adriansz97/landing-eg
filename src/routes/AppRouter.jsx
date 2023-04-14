import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Home } from "../components/Home/Home";
import { SearchGrievance } from "../screens/SearchGrievance/SearchGrievance";
import { Home } from '../screens/Home/Home'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={ <Home /> } /> */}
        <Route path="/" element={ <Home /> } />
        <Route path="/search_grievance" element={ <SearchGrievance /> } />
      </Routes>
    </BrowserRouter>
  )
}
