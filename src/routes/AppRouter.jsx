import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { SearchGrievance } from "../screens/SearchGrievance/SearchGrievance";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/search_grievance" element={ <SearchGrievance /> } />
      </Routes>
    </BrowserRouter>
  )
}
