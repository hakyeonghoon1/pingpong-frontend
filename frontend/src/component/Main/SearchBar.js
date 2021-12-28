import React,{useState} from 'react';

const SearchBar = ({keyword,callback}) => {
    const style={ 
        float: 'left',
        width: '80%',
        borderRadius: '10px 10px 6px 6px',
        margin : '1em'
    }
    const style2={
        width:'100%',
        boarder: 'none',
        borderRight:'0px',
        borderTop:'0px',
        borderLeft:'0px', 
        boderBottom:'0px',
        fontSize:'25px'
        
    }
    return (
        <div style={style}>
            <input style={style2} type='text' placeholder='search' value={keyword} onChange={(e) => callback(e.target.value) }/>
        </div>
    );
};

export default SearchBar;