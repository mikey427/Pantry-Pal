import React, { useState, useEffect } from 'react';

type Props = {};

interface PlannedMonth {
    [key: string]: string,
}

export default function Calendar({ }: Props) {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState<string | null>();
    const [input, setInput] = useState("");    
    const [plannedMeals, setPlannedMeals] = useState<PlannedMonth>({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
        10: '',
        11: '',
        12: '',
        13: '',
        14: '',
        15: '',
        16: '',
        17: '',
        18: '',
        19: '',
        20: '',
        21: '',
        22: '',
        23: '',
        24: '',
        25: '',
        26: '',
        27: '',
        28: '',
        29: '',
        30: '',
        31: '',
    })
    // let data: any = localStorage.getItem("data");
    // // console.log(data);
    // if(!data) {
    //     localStorage.setItem("data", JSON.stringify(plannedMeals));
    // } else {
    //     setPlannedMeals(data);
    //     console.log(plannedMeals);
    // }

    // localStorage.setItem("myCat", "Tom");

    const retrieveLocalData = (): void => {
        let data: any = localStorage.getItem(getMonthName(currentMonthIndex));
        // console.log(data);
        console.log('data', data)
        if(!data) {
            localStorage.setItem(getMonthName(currentMonthIndex), JSON.stringify({
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
                9: '',
                10: '',
                11: '',
                12: '',
                13: '',
                14: '',
                15: '',
                16: '',
                17: '',
                18: '',
                19: '',
                20: '',
                21: '',
                22: '',
                23: '',
                24: '',
                25: '',
                26: '',
                27: '',
                28: '',
                29: '',
                30: '',
                31: '',
            }));
            setPlannedMeals({
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: '',
                9: '',
                10: '',
                11: '',
                12: '',
                13: '',
                14: '',
                15: '',
                16: '',
                17: '',
                18: '',
                19: '',
                20: '',
                21: '',
                22: '',
                23: '',
                24: '',
                25: '',
                26: '',
                27: '',
                28: '',
                29: '',
                30: '',
                31: '',
            })
        } else {
            setPlannedMeals(JSON.parse(data));
        }
    }

    const updateLocalData = (): void => {
        localStorage.setItem(getMonthName(currentMonthIndex), JSON.stringify(plannedMeals));
    }

    
    const selectDay = (day: string): void => {
        if (!day) {
            return; // Do nothing if day is empty
        }
        setInput(plannedMeals[day]);
        setSelectedDay(day);
    }
    
    const handleSubmit = (event: any, day: string): void => {
        event.stopPropagation();
        // Update plannedMeals with the input value for the selected day
        let temp: any = plannedMeals;
        temp[Number(day)] = input;
        // setPlannedMeals({...plannedMeals, [Number(day)]: input});

        
        // Set selectedDay to "10" and hide the input field
        
        setInput(""); // Clear the input field
        setSelectedDay(null);
        updateLocalData();
    }

    const daysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getDaysForMonth = (year: number, month: number) => {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const firstDayOfMonth = new Date(year, month, 1);
        const startDay = daysOfWeek[firstDayOfMonth.getDay()];
        const daysInThisMonth = daysInMonth(year, month);
        const emptyCells = Array.from({ length: daysOfWeek.indexOf(startDay) }, (_, i) => '');
        const daysOfMonth = Array.from({ length: daysInThisMonth }, (_, i) => (i + 1).toString());
        const allDays = [...emptyCells, ...daysOfMonth];
        const weeks: string[][] = [];
        while (allDays.length > 0) {
            weeks.push(allDays.splice(0, 7));
        }
        return weeks;
    };

    const handlePrevMonth = () => {
        setCurrentMonthIndex((prevIndex) => (prevIndex === 0 ? 11 : prevIndex - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonthIndex((prevIndex) => (prevIndex === 11 ? 0 : prevIndex + 1));
    };

    const getMonthName = (index: number) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[index];
    };

    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    
    useEffect(() => {
        retrieveLocalData();
        console.log("rerender");
      }, [currentMonthIndex]);

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={handlePrevMonth}>Previous Month</button>
                <h2 className="text-xl font-bold">{getMonthName(currentMonthIndex)}</h2>
                <button className="px-4 py-2 bg-gray-200 rounded-md" onClick={handleNextMonth}>Next Month</button>
            </div>
            <table className="table-fixed w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-1/7 p-2 border border-gray-400">Sun</th>
                        <th className="w-1/7 p-2 border border-gray-400">Mon</th>
                        <th className="w-1/7 p-2 border border-gray-400">Tue</th>
                        <th className="w-1/7 p-2 border border-gray-400">Wed</th>
                        <th className="w-1/7 p-2 border border-gray-400">Thu</th>
                        <th className="w-1/7 p-2 border border-gray-400">Fri</th>
                        <th className="w-1/7 p-2 border border-gray-400">Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {getDaysForMonth(currentYear, currentMonthIndex).map((week, weekIndex) => (
                        <tr key={weekIndex}>
                            {week.map((day, dayIndex) => (
                                <td key={dayIndex} className={`relative h-36 p-2 border border-gray-400 ${day ? '' : 'bg-gray-200'} ${parseInt(day) === currentDay && currentMonthIndex === currentMonth ? "border-2 border-pink-600" : ""} ${selectedDay === day ? 'bg-blue-200' : ''}`} onClick={() => {
                                    selectDay(day)
                                }}>
                                    <p className='m-auto'>{plannedMeals[day]}</p>
                                    {day && <span className="absolute top-0 right-2">{day}</span>}
                                    {selectedDay === day ? <form><input placeholder='test' value={input} autoFocus onChange={(event) => {
                                        setInput(event.target.value);
                                    }}></input>
                                    <button type="submit" className='w-4 h-4 bg-green-400' onClick={(event) => {
                                        handleSubmit(event, day);
                                    }}></button></form> : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
