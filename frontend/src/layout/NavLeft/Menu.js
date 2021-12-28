import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton'
const Menu = (props) => {
    
    return (
        
        <li className = 'Menu'  ><NavLink to={`/${props.menuTitle}/main/${props.id}`}>
           {props.Menu}
           </NavLink>
           <CloseButton onClick={(e) => notifyMemu.partDel({ part_id: part.part_id })}/>
        </li>
    )
}

export default Menu;