import React,{useState, useEffect} from 'react'

const Navbar = () => {
    const [showNav, setShowNav] = useState(false)

    useEffect (() => {
        const innernav = document.querySelector('.inner-nav')
        if(showNav === true){
            innernav.style.left = '0px'
        }
        else{
            innernav.style.left = '-300px'
        }
    }, [showNav])

    const handleClick = () => {
        setShowNav(!showNav)
    }
  return (
    <div className='navbar'>
        <div onClick={handleClick} className={`${showNav ? "hamburger1":"hamburger"}`}></div>
        <div className='logo'>
        <img
            src="Ourlogo.png"
            alt="InternConnect Logo"
            style={{ width: '200px', height: '200px' }}
        />
            <nav className='menu'>
                <ul className='inner-nav'>
                    <li><a href="/about">About US</a></li>
                    <li><a href="/Guildeline">Guildeline</a></li>
                    <li><a href="/">Companies</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </nav>
        </div>
        <div className='button' style={{ fontSize: '20px', padding: '30px 40px' , fontWeight: 'bold'}}>
    <a href="/login">Login</a>
</div>

    </div>
  )
}

export default Navbar