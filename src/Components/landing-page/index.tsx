import React from 'react'
import Container from '../containers/main-container';
import Navbar from './nav-bar';
import HeroSection from './hero-section';
import FeatureSection from './features-section';
import CTASection from './cta-section';
import Footer from './footer';

const LandingPage = () => {
        return (
                <>
                        <Container className="min-h-screen bg-gradient-to-b from-white to-indigo-50 overflow-y-scroll">
                                <Navbar />
                                <HeroSection />
                                <FeatureSection />
                                <CTASection />
                                <Footer />
                        </Container>
                </>
        )
}

export default LandingPage