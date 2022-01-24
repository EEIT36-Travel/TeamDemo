import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

function Test1() {
    //heroku proxy網址
    const proxy = `https://secret-ocean-49799.herokuapp.com/`;
    const [data, setData] = useState([]);
    const [data2, setData2] = useState("");
    const [value, setValue] = useState("");
    const inputref = useRef("");
    const [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue(() => e.target[0].value)

    }

    useEffect(() => {
        const axiosdata = async () => {
            const axiosgoogle = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyA1A_ajOEo-A7Mpuhm000U4zK-sGAvlTQc&language=zh-TW&query=${value}`);
            const axiosresult = await axiosgoogle.data.results;

            setData(() => axiosresult);
            console.log(axiosresult)

        }




        axiosdata();

    }, [value])
    useEffect(() => {
        const axiosdata2 = async () => {
            const axiosdata = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
            const axiosresult2 = await axiosdata.data;
            setData2(() => axiosresult2);
            console.log(axiosresult2);
        }
        axiosdata2();

    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        setShow(() => !show)

    }


    return <div>
        <form onSubmit={handleSubmit}>
            <h2>輸入框：</h2>
            <input type="text" name="" id="" ref={inputref} />
            <button>查詢</button>
        </form>


        {data.map((item, index) => {
            return <ul style={{ backgroundColor: 'green', color: 'white', border: '4mm ridge rgba(255, 0, 220, .6)' }} key={index}><h2>{item.name}</h2><li key={index}>{item.formatted_address}</li></ul>
        })}
        <button onClick={handleClick}>Show</button>
        <h1 style={{ display: (show ? "" : "none") }}>{JSON.stringify(data2)}</h1>
    </div>;
}

export default Test1;
