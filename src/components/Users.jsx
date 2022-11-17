import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import validateGender from './ValidateGender';
import '../styles/users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get('https://randomuser.me/api/?results=20')
        .then((res)=> setUsers(res.data.results))
        .catch((error)=> console.log(error))

    }, []);
    console.log(users);


const baseUrl = 'https://randomuser.me/api/'
const getByGender = (gender) => {
    axios.get(`${baseUrl}?gender=${gender}`)
    .then(res=> setUsers(res.data.results))
    .catch((error) => console.log(error))
    console.log(gender);
}

    return (
        <div className='container mb-5'>
        <h1 className='text-center mt-4'>Users from all over the world</h1>
        <select onChange={(e)=> getByGender(e.target.value)} id="">
            <option value="gender">gender</option>
            <option value={users.gender}>male</option>
            <option value={users.gender}>female</option>
        </select>
        <div className='row'>
            {users.map((user) => (
                <div className='col-md-3 mt-5' key={user.email}>
                    <div className='character' style={{color: validateGender(user.gender)}}>
                        <img src={user.picture.large} className="card-img-top mb-3" alt="" />
                        <div className='card-body'>
                            <h5 className='card-title'>{user.name.first} {user.name.lastname}</h5>
                            <p className="card-title">Gender: {user.gender}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default Users;