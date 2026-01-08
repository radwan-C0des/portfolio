import dayjs from 'dayjs'

import { useState, useEffect } from 'react';

import { navLinks,navIcons } from '#constants'
import React from 'react'

function Navbar() {
    const [time, setTime] = useState(dayjs().format("ddd MMM D h:mm A"));

     useEffect(() => {
    
    const timer = setInterval(() => {
      
      setTime(dayjs().format("ddd MMM D h:mm A")); 
    }, 1000);

    return () => clearInterval(timer);
  }, []);
    
  return (
    <nav>
        <div>
            <img src='/images/logo.svg' alt='logo' />
            <p className='font-bold'>Radwan's Portfolio</p>
            <ul>
            {navLinks.map((item) => (
                <li key={item.id} >
                    <p>{item.name}</p>
                </li>
            ) )}
            </ul>
        </div>
        
        <div>
            <ul>
            {
                navIcons.map((item) => (
                    <li key={item.id}>
                        <img src={item.img} className='icon-hover' alt={`icon-${item.id}`}  />
                    </li>
                ))
            }
            </ul>
            <time className='mr-10'>{time}</time>
        </div>
        
    </nav>
  )
}

export default Navbar