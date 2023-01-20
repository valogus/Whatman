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
import { useSelector } from 'react-redux';

export default function AddUser() {
    const [usersProject, setUsersProject]=useState([])
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(true)
    const [value, setValue] = useState('')
    const [users, setUsers] = useState([])
    const [attention, setAttention] = useState('')
    const { id } = useParams();
    const { userId } = useSelector((session) => session.auth)
    useEffect(() => {
        fetch(`/api/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
            .catch(console.log)

            fetch(`/api/usersproject/${id}`)
            .then(res => res.json())
            .then(data => {

                setUsersProject(data.filter((user)=> user.junior_id !== +userId ))
            })
            .catch(console.log)
    }, [])
    function getUsers(e) {
        setValue(e.target.value)
        setAttention('')
        setIsOpen(true)
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
            fetch(`/api/usersproject/${newUser.id}`, {
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
                        data["User.login"] = `${e.target[0].value}`
                        setUsersProject((prev) => {
                           const newUsers =  [...prev]
                           newUsers.push(data)
                            return newUsers
                        })
                       
                    }
                })

            return setAttention('')
        }
        return setAttention('Такого пользователя не существует')
    }
const deletUserHandler = (junior_id) =>{
    fetch(`/api/usersproject/${junior_id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({id})
      })
        .then(res => res.json())
        .then(data => {
          if (data.deleted) {
            setUsersProject((prev) => [...prev].filter(user => user.junior_id !== junior_id))
          }
        })
}


console.log(usersProject)
    return (
        <div className={style.all}>
        <form
            onSubmit={addUserHandler}
            className={style.form}
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
                setIsOpen(false)
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
        <HStack spacing={4}>
        {usersProject.map((user) => (
          <Tag
            size='lg'
            key={user.junior_id}
            borderRadius='full'
            variant='solid'
            colorScheme='facebook'
          >
            <TagLabel>{user['User.login']}</TagLabel>
            <TagCloseButton onClick={()=>deletUserHandler(user.junior_id)}/>
          </Tag>
        ))}
      </HStack>
      </div>
    )
}
