import React from 'react'
import Navbar from '../components/Navbar'
import '../components/style.css'
import Container from '../components/Container'
import Section from '../components/Section'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import Stats from '../components/stat/stat'


const Home = () => {

  return (
    <div className='home'>
        <Navbar/>
        <Container/>
        <Stats/>
        <Section/>
        <Testimonials/>
    </div>
  )
}

export default Home