import React from 'react'
import { Link } from 'react-router-dom';
import Home from './Pages/Home';
import Calendar from './Components/Calendar';


type Props = {}

export default function Navbar({ }: Props) {
    return (
        <div className='flex items-center top-0 h-12 mt-4'>
            <Link className=' flex items-center m-auto bg bg-red-500 w-48 h-full rounded-2xl hover:bg-red-700 hover:shadow-lg' to="/" >
                <p className='mx-auto'>Home</p>
            </Link>
            <Link className=' flex items-center m-auto bg bg-orange-500 w-48 h-full rounded-2xl hover:bg-orange-700 hover:shadow-lg' to="/meal_planner" >
                <p className='mx-auto'>Meal Planner</p>
            </Link>
            <Link className=' flex items-center m-auto bg bg-yellow-300 w-48 h-full rounded-2xl hover:bg-yellow-500 hover:shadow-lg' to="/ingredients" >
                <p className='mx-auto'>Ingredients</p>
            </Link>
            <Link className=' flex items-center m-auto bg bg-green-500 w-48 h-full rounded-2xl hover:bg-green-700 hover:shadow-lg' to="/shopping_list" >
                <p className='mx-auto'>Shopping List</p>
            </Link>
            <Link className=' flex items-center m-auto bg bg-blue-500 w-48 h-full rounded-2xl hover:bg-blue-700 hover:shadow-lg' to="/" >
                <p className='mx-auto'>Saved Meals</p>
            </Link>
            <Link className=' flex items-center m-auto bg bg-purple-500 w-48 h-full rounded-2xl hover:bg-purple-700 hover:shadow-lg' to="/" >
                <p className='mx-auto'>Settings</p>
            </Link>
            <Link className=' flex items-center m-auto bg bg-pink-500 w-48 h-full rounded-2xl hover:bg-pink-700 hover:shadow-lg' to="/" >
                <p className='mx-auto'>About</p>
            </Link>
        </div>
    )
}