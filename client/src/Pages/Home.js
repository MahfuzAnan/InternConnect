import React from 'react'
import Navbar from '../components/Navbar'
import '../components/style.css'
import Container from '../components/Container'
import Section from '../components/Section'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Container/>
        <Section/>
        <Testimonials/>
        <FAQ/>
        <Footer/>
    </div>
  )
}

export default Home