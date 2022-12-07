import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Trend View',
        path: '/trends',
        icon: <BsIcons.BsGraphUp />,
        cName: 'nav-text'
    },  

    {
        title: 'Table View',
        path: '/tables',
        icon: <BsIcons.BsTable />,
        cName: 'nav-text'
    },  

    {
        title: 'Query Tool',
        path: '/query',
        icon: <AiIcons.AiOutlineFileSearch />,
        cName: 'nav-text'
    },  
   
    {
        title: 'Dangerous Times',
        path: '/dt',
        icon: <AiIcons.AiOutlineFileSearch />,
        cName: 'nav-text'
    },  

    {
        title: 'About',
        path: '/about',
        icon: <AiIcons.AiFillInfoCircle />,
        cName: 'nav-text'
    },  
];