import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import validateGender from './ValidateGender';
import '../styles/users.css';
import IsLoading from './IsLoading';

const Users = () => {
    const [loading, setLoading] = useState(true); // pantalla de carga
    const [users, setUsers] = useState([]); // estado de users 
    const [gender, setGender] = useState('Gender'); //estado de gender 

    const baseUrl = 'https://randomuser.me/api/'
    useEffect(() => {
        setLoading(true)
        // console.log("Me ejecute", gender)
        if (gender === 'male') {
            axios.get(`${baseUrl}?results=20&gender=${gender}`)
               .then(res => {
                    const ageUsers = res.data.results.sort((a, b) => a.dob.age - b.dob.age) //me ordena los usuarios Hombres de menor a mayor
                    console.log(ageUsers);
                    setUsers(ageUsers)
                })
                .catch((error) => console.log(error))
                .finally(()=> {
                   setLoading(false)
                })
        }
        else if (gender === 'female') {
            axios.get(`${baseUrl}?results=20&gender=${gender}`)
                .then(res => {
                    const ageUsers = res.data.results.sort((a, b) => b.email.localeCompare(a.email)) // me ordena usuarios que sean mujeres  Z --> A de manera desencdente
                    console.log(ageUsers);
                    setUsers(ageUsers)
                })
                .finally(()=> {
                    setLoading(false)
                 })
                .catch((error) => console.log(error))
        } else {
            console.log("Me ejecute")
            axios.get('https://randomuser.me/api/?results=24') //  me trae usuarios random ya sean mujeres y hombres de edad cualquiera
                .then((res) => {
                    setUsers(res.data.results)
                })
                .finally(()=> {
                    setLoading(false)
                 })
                .catch((error) => console.log(error))
        }
    }, [gender])
    if(loading){
        return <IsLoading />
    }

    return (
        <div className='container mb-5'>
            <div className='background'>
                <h1 className='text-center mt-4'>Users from all over the world</h1>
                <div className='inputs-users'>
                    <select onChange={(e) => setGender(e.target.value)} value={gender}>
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
                                <p className='card-title'><i class='bx bx-location-plus' ></i> {user.nat}</p>
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