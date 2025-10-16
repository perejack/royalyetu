import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { OffersButton } from './components/common/OffersButton';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from './utils/animations';

// Wrap your routes with this component to get page transition animations
const AnimatedRoutes = () => {
  const location = useLocation();
  useScrollAnimation(); // Initialize scroll animation
  
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </AnimatePresence>
  );
};

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AnimatedRoutes />
        <Footer />
        <OffersButton />
        <WhatsAppButton phoneNumber="+254755139294" />
      </div>
    </Router>
  );
}

export default App;