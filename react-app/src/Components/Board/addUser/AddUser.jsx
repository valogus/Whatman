import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import style from './style.module.css'
import {
    FormControl,
    Input,
    Tag,
    TagLabel,
    HStack,
    TagCloseButton,
} from '@chakra-ui/react'

export default function AddUser() {
    const ref = useRef(null);
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
    }
    let filteredUsers = users.filter(user => {
        return user.login.toLowerCase().includes(value.toLowerCase())
    })

    const itemClickHandler = (e) => {
        setValue(e.target.textContent)
        setIsOpen(!isOpen)
        ref.current.focus();
    }

    const inputClickHandler = () => {
        setIsOpen(true)
    }
    const addUserHandler = (e) => {
        e.preventDefault()
        const newUser = filteredUsers.find((el) => el.login === e.target[0].value)
        if (newUser) {
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
                    if (data) {
                        setAttention(`Пользователь ${e.target[0].value} успешно добавлен`)
                        setValue('')
                    }
                })

            return setAttention('')
        }
        return setAttention('Такого пользователя не существует')
    }
    return (
        <div className={style.all}>
        <form
            onSubmit={addUserHandler}
        >
            <Input type='login' className={style.input}
                placeholder="Добавить участника"
                onChange={(e) => getUsers(e)}
                value={value}
                onClick={inputClickHandler}
                ref={ref}
                onBlur={()=> {
                setTimeout(() => {
                setAttention('')
            }, 200); }}
            />
            <ul className={style.autocomplete}>
                {value && isOpen ? filteredUsers.map((user) => {
                    return (
                        <li
                            key={user.id}
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
        {/* <HStack spacing={4}>
        {['lg', 'lg', 'lg'].map((size) => (
          <Tag
            size={size}
            key={size}
            borderRadius='full'
            variant='solid'
            colorScheme='facebook'
          >
            <TagLabel>Green</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}
      </HStack> */}
      </div>
    )
}
