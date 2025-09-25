import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ComboSection from './components/ComboSection';
import CommentsSection from './components/CommentsSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <ComboSection />
      <CommentsSection />
      <Footer />
    </>
  );
}

export default App;