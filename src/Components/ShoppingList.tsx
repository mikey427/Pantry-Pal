import React, { useState } from 'react'

type Props = {}

interface ListItem {
    id: number; label: string; key: any
}

interface List extends Array<ListItem> { }

export default function ShoppingList({ }: Props) {
    const [list, setList] = useState<List>([]);

    return (
        <div className='flex flex-col'>
            <form>
                <input className='border border-black' />
                <button className=''>Add</button>
            </form>
        </div>
    )
}