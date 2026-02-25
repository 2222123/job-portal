import React from 'react'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'

const Home = ({ setShowRecruiterLogin }) => {
  return (
    <div className='min-h-screen'>
      {/* Navbar ikkada nundi remove chesa */}
      <Hero />
      <JobListing />
      <AppDownload />
      <Footer />
    </div>
  )
}

export default Home