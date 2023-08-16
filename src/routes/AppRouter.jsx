import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchGrievance } from "../screens/SearchGrievance/SearchGrievance";
import { Home } from '../screens/Home/Home'
import { FormPage } from "../screens/Form/FormPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/form" element={ <FormPage /> } />
        <Route path="/search_grievance" element={ <SearchGrievance /> } />
      </Routes>
    </BrowserRouter>
  )
}
