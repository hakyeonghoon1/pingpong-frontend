import React, { Fragment, useState } from 'react';
import Menu from './Menu';

const MenuList = (props) => {
    const [showAddedMenu, setshowAddedMenu]= useState('');
    const [addedMenu, setAddedMenu]= useState('');

     const AddMenu=(e)=> {                                  
            e.preventDefault();     
            setAddedMenu(e.target.MenuInput.value);

                if(e.target.MenuInput.value ===''){
                    throw `${input.placeholder} is empty`;
                }
                return {name : addedMenu};
                    
            
                     
                 return <Menu key={id} menuTitle={props.menuTitle} Menu={name}  />;
                 }
    return (
        <div className="MenuList">
            <h2>[{props.menuTitle}]</h2>
            <button >➕</button>
           
            <ul>
                {props.menus.map((menu, index)=> <Menu 
                                                key={index} 
                                                id={menu.id} 
                                                menuTitle={props.menuTitle} 
                                                Menu={menu.name} 
                                                
                                            />
                            )
                }
             
            </ul> 
            <form  
                className="MenuAdd"
                onSubmit= {AddMenu}>
                <input 
                type='text'  
                name="MenuInput"  
                placeholder={props.menuTitle +' 추가'} 
                autoComplete={'off'}
                />
                <input 
                type='submit' 
                value="추가"/>
            </form>
        </div>
    );
}
export default MenuList;