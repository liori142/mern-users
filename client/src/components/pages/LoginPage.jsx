import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { userContext } from '../../RoutePages'
import Input from '../Input'
import Btn from '../Btn'
import { findUser } from '../services/apiService'

export default function LoginPage() {
    const [message, setMessage] = useState('')
    const { setLoginNLogout } = useContext(userContext);
    const history = useHistory();
    const txtNBtnStyle = { margin: '10px', width: '200px' }

    function checkIdAndPassword() {
        let password = document.getElementById('passwordId')
        let id = document.getElementById('userNameId')

        findUser(id.value, password.value).then((res) => {
            if (res) {
                localStorage.setItem('selectedUser', id.value)
                localStorage.setItem('isLogged', 'true')
                setLoginNLogout('Logout')
                history.push('/users')
            } else {
                setMessage('Failed, Please Try Again!')
            }
        })
    }
    return (
        <div className="min-vh-100">
            <div style={{ float: 'right', margin: '20px 20px' }}>
                <img src="./login.svg" alt="" width='700px' />
            </div>
            <div style={{ display: 'block', padding: '350px 0 0 200px' }}>
                <div style={{ marginLeft: '100px' }}>
                    <Input id='userNameId' style={txtNBtnStyle} label="Enter UserName" type="text" /><br />
                    <Input id='passwordId' style={txtNBtnStyle} label="Enter Password" type="text" placeholder="Enter Password" />
                    <h3 style={{ color: 'red' }}>{message}</h3>
                </div>
                <div style={{}}>
                    <Btn style={txtNBtnStyle} clickHandler={checkIdAndPassword} text='Log In' />
                    <Btn style={txtNBtnStyle} clickHandler={() => { history.push('/register') }} text='Sign Up' />
                </div>
            </div>
        </div>

    )
}
