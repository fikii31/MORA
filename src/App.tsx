import { Routes, Route, useLocation } from 'react-router-dom'
import Hero from './component/Hero'
import Navbar from './component/Navbar'
import Menu from './component/Menu'
import Story from './component/Story'
import VisitMe from './component/VisitMe'
import Rating from './component/Rating'
import OurMenu from './component/OurMenu'
import './App.css'

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/menu';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="Home" id="Home">
                <Hero />
              </section>
              <section className="Menu" id="Menu">
                <Menu />
              </section>
              <section className="Story" id="Story">
                <Story />
              </section>
              <section className="Rating" id="Rating">
                <Rating />
              </section>
              <footer className="Visit-footer" id="visit-me">
                <VisitMe />
              </footer>
            </>
          }
        />
        <Route path="/menu" element={<OurMenu />} />
      </Routes>
    </>
  )
}

export default App;
