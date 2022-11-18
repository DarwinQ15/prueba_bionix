import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import validateGender from './ValidateGender';
import '../styles/users.css';
import isLoading from './isLoading';

const Users = () => {


    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('https://randomuser.me/api/?results=24')
            .then((res) => {
                setUsers(res.data.results)
            })
            .catch((error) => console.log(error))
    }, []);

    const baseUrl = 'https://randomuser.me/api/'
    const getByGender = (gender) => {
        if (gender === 'male') {
            setLoading(true)
            axios.get(`${baseUrl}?results=20&gender=${gender}`)
               .then(res => {
                    setUsers(res.data.results)
                    const ageUsers = users.sort((a, b) => a.dob.age - b.dob.age).filter(e => e.gender === gender)
                    console.log(ageUsers);
                    setUsers(ageUsers)

                })
                .catch((error) => console.log(error))
                .finally(()=> {
                    setTimeout(() => {
                        setLoading(false)
                    }, 1000);
                })
        }
        else if (gender === 'female') {
            axios.get(`${baseUrl}?results=20&gender=${gender}`)
                .then(res => {
                    setUsers(res.data.results)
                    const ageUsers = users.filter(e => e.gender === gender).sort((a, b) => b.email.localeCompare(a.email))
                    console.log(ageUsers);
                    setUsers(ageUsers)
                })
                .catch((error) => console.log(error))
        } else {
            axios.get('https://randomuser.me/api/?results=24')
                .then((res) => {
                    setUsers(res.data.results)
                })
                .catch((error) => console.log(error))
        }
    }

    return (
        <div className='container mb-5'>
            <div className='background'>
                <h1 className='text-center mt-4'>Users from all over the world</h1>
                <div className='inputs-users'>
                    <select onChange={(e) => getByGender(e.target.value)}>
                        <option key={users.email} value="gender">Gender</option>
                        <option key={users.email} value='male'>Male</option>
                        <option key={users.email} value='female'>Female</option>
                    </select>
                </div>
            </div>
            <div className='row'>
                {users.map((user) => (
                    <div className='col-md-3 mt-5' key={user.email}>
                        <div className='character' style={{ color: validateGender(user.gender) }}>
                            <img src={user.picture.large} className="card-img-top mb-3" alt={user.name.title} />
                            <div className='card-body'>
                                <p className='card-title'>{user.nat}</p>
                                <h5 className='card-title'>{user.name.first} {user.name.lastname}</h5>
                                <p className="card-title">{user.gender}</p>
                                <p className='card-title'>{user.dob.age}</p>
                                <p className='cart-title email'>{user.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Users;