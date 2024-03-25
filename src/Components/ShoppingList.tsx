// import React, { useState, useEffect } from 'react'
// import { retrieveLocalData, updateLocalData } from '../utils';

// type Props = {}

// interface ListItem {
//     "name": string;
//     "quantity": number;
// }

// interface List extends Array<ListItem> { }



// export default function ShoppingList({ }: Props) {
//     const [list, setList] = useState<List>([]);
//     const [input, setInput] = useState("");
//     const [quantity, setQuantity] = useState(1);

//     function addListing(event: any): void {
//         event.preventDefault();
//         let temp: List = [...list];
//         let tempObj: ListItem = {
//             "name": input,
//             "quantity": quantity,
//         }

//         temp.push(tempObj);
//         console.log(temp)
//         setList([...temp]);
//         setInput("");
//         setQuantity(1);
//         updateLocalData("shoppingList", list);
//     }

//     useEffect(() => {
//         setList(retrieveLocalData("shoppingList"))
//     }, [])


//     return (
//         <div className='flex flex-col'>
//             {list.map((item: ListItem, idx: number) => {
//                 return (<div key={idx}>{item.name}: {item.quantity}</div>)
//             })}
//             <form className='flex'>
//                 <input value={input} className='border border-black' onChange={(event) => {
//                     setInput(event.target.value)
//                 }} />
//                 <select id="amount" name="quantity" value={quantity} onChange={(event) => {
//                     setQuantity(Number(event.target.value));
//                     console.log(quantity);
//                 }}>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                     <option value="6">6</option>
//                     <option value="7">7</option>
//                     <option value="8">8</option>
//                     <option value="9">9</option>
//                     <option value="10">10</option>
//                 </select>
//                 <div>
//                     <button type="submit" className='' onClick={(event) => { addListing(event) }}>Add</button>
//                     <button className='' onClick={(event) => {
//                         updateLocalData("shoppingList", JSON.stringify(list))
//                     }}></button>
//                 </div>

//             </form>
//         </div>
//     )
// }

import React, { useState, useEffect } from 'react';
import { retrieveLocalData, updateLocalData } from '../utils';
import { ListItem } from '../types';

// interface ListItem {
//     name: string;
//     quantity: number;
// }

const ShoppingList: React.FC = () => {
    const [list, setList] = useState<ListItem[]>([]);
    const [input, setInput] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const savedList = retrieveLocalData("shoppingList");
        if (savedList) {
            setList(savedList);
        }
    }, []);

    const addListing = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (input.trim() !== "") {
            const newItem: ListItem = {
                name: input.trim(),
                quantity: quantity,
            };
            setList(prevList => [...prevList, newItem]);
            setInput("");
            setQuantity(1);
            updateLocalData("shoppingList", [...list, newItem]);
        }
    };

    const removeItem = (index: number): void => {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
        updateLocalData("shoppingList", newList);
    };

    const clearList = (): void => {
        setList([]);
        updateLocalData("shoppingList", []);
    };

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col items-center'>
            <div className='bg-white shadow-md rounded-md p-8 mt-24'>
                <h1 className='text-3xl font-bold mb-6'>Shopping List</h1>
                <form onSubmit={addListing} className='flex mb-4'>
                    <input
                        type='text'
                        value={input}
                        className='flex-grow mr-2 border border-gray-300 p-2 rounded'
                        onChange={(event) => setInput(event.target.value)}
                        placeholder='Add new item'
                    />
                    <select
                        id='amount'
                        name='quantity'
                        value={quantity}
                        onChange={(event) => setQuantity(Number(event.target.value))}
                        className='border border-gray-300 p-2 rounded'
                    >
                        {[...Array(10)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Add</button>
                </form>
                <button onClick={clearList} className='bg-red-500 text-white px-4 py-2 rounded'>Clear List</button>
                <ul className='mt-6'>
                    {list.map((item, idx) => (
                        <li key={idx} className='flex justify-between items-center py-2'>
                            <span>{item.name}: {item.quantity}</span>
                            <button onClick={() => removeItem(idx)} className='text-red-500'>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShoppingList;
