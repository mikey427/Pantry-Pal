import React, { useState, useEffect } from 'react'
import { retrieveLocalData, updateLocalData } from '../utils';

type Props = {}

interface ListItem {
    "name": string;
    "quantity": number;
}

interface List extends Array<ListItem> { }



export default function ShoppingList({ }: Props) {
    const [list, setList] = useState<List>([]);
    const [input, setInput] = useState("");
    const [quantity, setQuantity] = useState(1);

    function addListing(event: any): void {
        event.preventDefault();
        let temp: List = [...list];
        let tempObj: ListItem = {
            "name": input,
            "quantity": quantity,
        }

        temp.push(tempObj);
        console.log(temp)
        setList([...temp]);
        setInput("");
        setQuantity(1);
        updateLocalData("shoppingList", list);
    }

    useEffect(() => {
        setList(retrieveLocalData("shoppingList"))
    }, [])


    return (
        <div className='flex flex-col'>
            {list.map((item: ListItem, idx: number) => {
                return (<div key={idx}>{item.name}: {item.quantity}</div>)
            })}
            <form className='flex'>
                <input value={input} className='border border-black' onChange={(event) => {
                    setInput(event.target.value)
                }} />
                <select id="amount" name="quantity" value={quantity} onChange={(event) => {
                    setQuantity(Number(event.target.value));
                    console.log(quantity);
                }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <div>
                    <button type="submit" className='' onClick={(event) => { addListing(event) }}>Add</button>
                    <button className='' onClick={(event) => {
                        updateLocalData("shoppingList", JSON.stringify(list))
                    }}></button>
                </div>

            </form>
        </div>
    )
}