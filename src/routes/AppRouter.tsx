import { BrowserRouter, Route, Routes } from "react-router-dom"
import FeaturedPage from "@/pages/FeaturedPage"
import MoviePage from "@/pages/MoviePage"

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="*" Component={FeaturedPage} />
            <Route path="/movie" Component={MoviePage} />    
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter