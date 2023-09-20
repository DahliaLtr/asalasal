import React from 'react'
import Products from '../Product/Product.json'

const NewItem = (props) => {
    const {onAdd} = props;
  return (
    <select className="bg-sky-500 rounded-lg" onChange={(e) =>{
        const selected = Products.find(p => p.name === e.target.value);
        onAdd (selected);}}>
            { Products.map((Products, index)=>{
                return(
                <option value={Products.name} key={index}>{Products.name}</option>
                ) 
            })}
    </select>
    

    
  )
}

export default NewItem