import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/lib/ThemeContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Regions from '@/pages/Regions'
import Experiences from '@/pages/Experiences'
import Favorites from '@/pages/Favorites'
import TravelTips from '@/pages/TravelTips'
import DestinationDetail from '@/pages/DestinationDetail'
import NotFound from '@/pages/NotFound'

import { FavoritesProvider } from '@/context/FavoritesContext'
import { DataProvider } from '@/context/DataContext'

function AppContent() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 page-offset">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/travel-tips" element={<TravelTips />} />
          <Route path="/destinations/:id" element={<DestinationDetail />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {location.pathname === '/' && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <FavoritesProvider>
          <Router>
            <AppContent />
          </Router>
        </FavoritesProvider>
      </DataProvider>
    </ThemeProvider>
  )
}
