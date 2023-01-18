import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import style from './style.module.css'
import {
    FormControl,
    Input
} from '@chakra-ui/react'

export default function AddUser() {
    const [isOpen, setIsOpen] = useState(true)
    const [value, setValue] = useState('')
    const [users, setUsers] = useState([])
    const [attention, setAttention] = useState('')
    const { id } = useParams();
    useEffect(() => {
        fetch(`/api/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
            .catch(console.log)
    }, [])
    function getUsers(e) {
        setValue(e.target.value)
        setAttention('')
         console.log(users)

        // console.log(filteredUsers)
    }
    const filteredUsers = users.filter(user => {
        return user.login.toLowerCase().includes(value.toLowerCase())
    })

    const itemClickHandler = (e) => {
        setValue(e.target.textContent)
        setIsOpen(!isOpen)
    }

    const inputClickHandler = () => {
        setIsOpen(true)
    }
    const onFocusHandler = () => {
        setIsOpen(false)
    }
    const addUserHandler = (e) => {
        e.preventDefault()
        console.log(e.target[0].value)
        const newUser = filteredUsers.find((el) => el.login === e.target[0].value)
        if (newUser) {
            console.log(id)
            fetch(`/api/users/${newUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ id })
            })
                .then(res => {
                    if (res.status === 300) return setAttention('Пользователь уже является участником')
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data) {
                        setAttention(`Пользователь ${e.target[0].value} успешно добавлен`)
                    }
                })
                
    return setAttention('')
}
return setAttention('Такого пользователя не существует') 
    }
return (

    <form
        onSubmit={addUserHandler}
    >
        <Input type='login' className={style.input}
            placeholder="Добавить участника"
            onChange={(e) => getUsers(e)}
            value={value}
            onClick={inputClickHandler}

        />
        <ul className={style.autocomplete}>
            {value && isOpen ? filteredUsers.map((user) => {
                return (
                    <li
                        className={style.autocomplete_item}
                        onClick={itemClickHandler}
                    >
                        {user.login}
                    </li>
                )
            })
                : ''
            }
            {attention ? <li>{attention}</li> : ''}

        </ul>
    </form>
)
}
