import { Meteor } from "meteor/meteor"
import React, { useState } from 'react'

export const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = e => {
        e.preventDefault()
    }

    const handleLogin = async e => {
        e.preventDefault()
        Meteor.loginWithPassword(username,password)
    }

    const handleRegister = async e => {
        e.preventDefault()
        Accounts.createUser({username,password})
    }

    return (
        <form onSubmit={submit} className="login-form">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                placeholder="username"
                name="username"
                required
                onChange={e => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                type="text"
                placeholder="password"
                name="password"
                required
                onChange={e => setPassword(e.target.value)}
            />

            <button type="submit" onClick={handleLogin}>Log</button>
        <button type="submit" onClick={handleRegister}>Register</button>
        </form>
    )
}
