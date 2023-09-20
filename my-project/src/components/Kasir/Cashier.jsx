import React, {useEffect, useState } from 'react'
import NewItem from '../Items/NewItem';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

const Cashier = () => {
    const [kasir, setKasir] = useState([]);
    const [pay, setPay] = useState([]);
    const [qty, setQty] = useState([1]);

    const handleSubmit = (newitems) => {
        setKasir([...kasir, newitems])
    }
    
    useEffect (() => {
        kasir.map(() => setQty([...qty, 1]))
    }, [kasir]);

    let total = 0;
    kasir.forEach((item, index) =>{
        total += item.price * qty[index];
    });

    const handleDelete = (id) => {
        const newList = kasir.filter((i) => { return i.id !== id })
        setKasir(newList)
        const deletedItem = kasir.find((i) => { return i.id === id })
        console.log(deletedItem)
    }

    
  return (
    <div>
        <NewItem onAdd = {handleSubmit}/>
        { kasir && kasir.length > 0 
        ? <table className='table-fixed border border-black border-collapse'>
            <thead>
                <tr>
                    <th className='border border-black px-4 py-2 w-[60px]'>No</th>
                    <th className='border border-black px-4 py-2 w-[200px]'>Nama Barang</th>
                    <th className='border border-black px-4 py-2 w-[200px]'>Jumlah</th>
                    <th className='border border-black px-4 py-2 w-[200px]'>Harga</th>
                    <th className='border border-black px-4 py-2 w-[200px]'>SubTotal</th>
                    <th className='border border-black px-4 py-2 '>Action</th>
                </tr>
            </thead>
            {kasir.map((item, index) => {
            return (
                <>
                <tbody>
                    <tr>
                        <td className='border border-black px-7 py-2'>{index + 1}</td>
                        <td className='border border-black px-4 py-2'>{item.name}</td>
                        <td className='border border-black px-4 py-2'>
                            <input type="number"
                            value={qty[index]} 
                            className='px-3 py-1 border border-black w-full'
                            onChange={(e)=> {
                                let quantity = [...qty];
                                quantity[index] = e.target.value;
                                setQty(quantity);
                            }}/>
                        </td>
                        <td className='border border-black px-4 py-2'>Rp. {item.price}</td>
                        <td className='border border-black px-4 py-2'>Rp. {item.price * qty[index]}</td>
                        <td className='px-7 border border-black'><FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(item.id)}/></td>
                    </tr>
                </tbody>
                </>
            )
        }

        )}
        <tr>
            <td>Total: </td>
            <td>Rp. {total}</td>
        </tr>
        <tr>
            <td>Tunai :</td>
            <td><input className='border border-black' onChange={(e) => setPay(e.target.value)} value={pay}/></td>
        </tr>
        <tr>
            <td>Kembalian:</td>
            <td>Rp. {pay - total}</td>
        </tr>
        </table>
         : <div className='flex flex-col items-center gap-2 p-4'>
                <span>Kosong</span>
            </div>
        }
        
        
    </div>
  )
}

export default Cashier;