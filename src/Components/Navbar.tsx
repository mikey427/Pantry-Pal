import React from 'react'
import { Link } from 'react-router-dom';
import Home from '../Pages/Home';
import Calendar from './Calendar';


type Props = {}

export default function Navbar({ }: Props) {
    return (
        <div className='flex mx-auto w-1/2 items-center top-0 h-12 mt-4'>
            <Link className=' flex items-center m-auto bg bg-red-500 w-48 h-full rounded-2xl hover:bg-red-700 hover:shadow-lg' to="/" >
                <p className='mx-auto'>Home</p>
            </Link>
            <Link className=' flex items-center justify-center bg bg-orange-500 w-48 h-full rounded-2xl hover:bg-orange-700 hover:shadow-lg' to="/meal_planner" >
                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" /></svg>
                <p className=''>Meal Planner</p>
            </Link>
            <Link className=' flex items-center justify-center bg bg-yellow-300 w-48 h-full rounded-2xl hover:bg-yellow-500 hover:shadow-lg' to="/ingredients" >
                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M640-80q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170T640-80Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-480 0q-33 0-56.5-23.5T80-240v-304q0-8 1.5-16t4.5-16l80-184h-6q-17 0-28.5-11.5T120-800v-40q0-17 11.5-28.5T160-880h280q17 0 28.5 11.5T480-840v40q0 17-11.5 28.5T440-760h-6l66 152q-19 10-36 21t-32 25l-84-198h-96l-92 216v304h170q5 21 13.5 41.5T364-160H160Zm480-440q-42 0-71-29t-29-71q0-42 29-71t71-29v200q0-42 29-71t71-29q42 0 71 29t29 71H640Z" /></svg>
                <p className=''>Ingredients</p>
            </Link>
            <Link className=' flex items-center m-auto bg bg-green-500 w-48 h-full rounded-2xl hover:bg-green-700 hover:shadow-lg' to="/shopping_list" >
                <p className='mx-auto'>Shopping List</p>
            </Link>
            <Link className=' flex items-center m-auto bg bg-blue-500 w-48 h-full rounded-2xl hover:bg-blue-700 hover:shadow-lg' to="/saved_meals" >
                <p className='mx-auto'>Saved Meals</p>
            </Link>
            {/* <Link className=' flex items-center m-auto bg bg-purple-500 w-48 h-full rounded-2xl hover:bg-purple-700 hover:shadow-lg' to="/" >
                <p className='mx-auto'>Settings</p>
            </Link>
            <Link className=' flex items-center m-auto bg bg-pink-500 w-48 h-full rounded-2xl hover:bg-pink-700 hover:shadow-lg' to="/" >
                <p className='mx-auto'>About</p>
            </Link> */}
        </div>
    )
}