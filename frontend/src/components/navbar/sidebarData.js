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
        title: 'Query 1',
        path: '/query1',
        icon: <AiIcons.AiOutlineFileSearch />,
        cName: 'nav-text'
    }, 

    {
        title: 'Query 2',
        path: '/query2',
        icon: <AiIcons.AiOutlineFileSearch />,
        cName: 'nav-text'
    }, 

    {
        title: 'Query 3',
        path: '/query3',
        icon: <AiIcons.AiOutlineFileSearch />,
        cName: 'nav-text'
    }, 

    {
        title: 'Query 4',
        path: '/query4',
        icon: <AiIcons.AiOutlineFileSearch />,
        cName: 'nav-text'
    }, 


    {
        title: 'Trend View',
        path: '/trends',
        icon: <BsIcons.BsGraphUp />,
        cName: 'nav-text'
    },  

    {
        title: 'Query Tool',
        path: '/querytool',
        icon: <AiIcons.AiOutlineFileSearch />,
        cName: 'nav-text'
    },  

    {
        title: 'Table View',
        path: '/tables',
        icon: <BsIcons.BsTable />,
        cName: 'nav-text'
    },  

    {
        title: 'About',
        path: '/about',
        icon: <AiIcons.AiFillInfoCircle />,
        cName: 'nav-text'
    },  
];