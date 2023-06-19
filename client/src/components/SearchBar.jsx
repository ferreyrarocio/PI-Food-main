import style from './SearchBar.module.css'
import { useState } from 'react';


const SearchBar = ({onSearch}) => {
  const [title, setTitle] = useState('');

  const handleChange = (event) => {
   setTitle(event.target.value)
  };

  return (
     <div className={style.contenedor}>
        <input className={style.blanco} type='search' onChange={handleChange} value={title}/> 
        <button className={style.buscar} onClick={()=> {onSearch(title)}}> 🔍 </button> 
     </div>
  );
};

export default SearchBar;