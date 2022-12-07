import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {SidebarData} from './sidebarData';
import './navbar.css';
import {IconContext} from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
    <IconContext.Provider value={{color: '#fff'}}>
    <div className='navbar'>
      <Link to='#' className='menu-bars'>
      <FaIcons.FaBars onClick={showSidebar} />
      </Link>
      
      <center>
      <h5 style={{color: '#fff', align: 'left',margin: '5px 10px 0px 20px'}}>
      Welcome to the New York City Police Complaints Web Application!
      </h5>
      </center>

      <Link to='/about' className='menu-bars'>
      <h6 style={{color: '#fff', align: 'right',margin: '5px 50px 0px 0px'}}>
      About   <AiIcons.AiFillInfoCircle onClick={showSidebar} />
      </h6>
  
      </Link>
      
      
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
    <ul className='nav-menu-items' onClick={showSidebar}>
      <li className='navbar-toggle'>
        <Link to='#' className='menu-bars'>
          <AiIcons.AiOutlineClose/>
          </Link>
        </li>
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
    </ul>
    </nav>
    </IconContext.Provider>
    </>
  );
}


export default Navbar