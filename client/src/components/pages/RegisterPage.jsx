import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import Input from '../Input'
import Btn from '../Btn'
import {saveUser,isExists} from '../services/apiService'

export default function RegisterPage() {
    const history = useHistory();
    const [user, setUser] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isStrong, setIsStrong] = useState('')
    const [isSame, setIsSame] = useState(false)
    const [isValidUserName, setIsValidUserName] = useState(false);
    const [color, setColor] = useState('red')
    const [userImg, setUserImg] = useState('');
    const [pass1Img, setPass1Img] = useState('');
    const [pass2Img, setPass2Img] = useState('');
    const DivStyle = { display: "flex", alignItems: 'center' }
    const InputStyle = {  margin: '10px', width: '250px' }

    async function checkUserName(e) {
        let input = e.target.value
        setUser(input);
        let isUserExists = await isExists(input).then(res => res)
        console.log(isUserExists);
        if ((input.length > 6) && !isUserExists && (asciiChecker(97, 122, input))) {
            setIsValidUserName(true);
            setUserImg('✅');
        } else if (input === '') { setUserImg('') }
        else {
            setIsValidUserName(false);
            setUserImg('❌');
        }
    }

    function isStrongPassword(e) {
        let pass = e.target.value;
        setPassword1(pass)
        if ((pass.length > 7) && //length
            (asciiChecker(33, 47, pass) || asciiChecker(58, 64, pass) || asciiChecker(91, 96, pass)) && //Special chars
            (asciiChecker(48, 57, pass)) && //Numbers
            (asciiChecker(65, 90, pass)) && (asciiChecker(97, 122, pass))) //a-z A-Z
        {
            setPass1Img('✅')
            setColor('green')
        } else {
            if (pass == '') { setIsStrong('') }
            else {
                setPass1Img('❌');
                setColor('red')
            }
        }
        checkAfterFilled(pass)
    }

    function asciiChecker(min, max, password) {
        for (let i = 0; i < password.length; i++) {
            if (min <= password.charCodeAt(i) && password.charCodeAt(i) <= max) {
                return true;
            }
        }
        return false;
    }

    // check if passwords same
    function isSamePasswords(e) {
        let pass2 = e.target.value
        setPassword2(pass2)
        if (password1 == pass2 && pass1Img =='✅') {
            setIsSame(true);
            setPass2Img('✅')
        }
        else {
            setIsSame(false)
            setPass2Img('❌')}
    }

    function checkAfterFilled(pass1){
        if(pass1 !== password2 && password2 !== ''){
            setPass2Img('❌')
        }else if(pass1 === password2){setPass2Img('✅')}
        
    }
    //Register Handler
    function registerHandler() {
        if (isSame == true && isValidUserName == true) {
            // localStorage.setItem(user, password1)
            saveUser(user,password1)
            history.push('/login');
            
        } else {
            setColor('red')
            setIsStrong('Failed, Try Again Please')
        }
    }

    return (<div>
        {/* SVG div */}
        <div style={{float:'right', padding:'250px 50px 0 0'}}>
            <img src="./login-svg.svg" alt="" width='700px'/>
        </div>
        {/* Register div */}
        <div style={{ padding:'200px 300px' }}>
            <div>
                <div style={DivStyle}><Input style = {InputStyle} label="Enter User Name" onChange={(e) => { checkUserName(e) }} type="text"/><span>{userImg} </span><br /></div>
                <div style={DivStyle}><Input style = {InputStyle} label="Enter Password" onChange={(e) => { isStrongPassword(e) }} type="text"/><span>{pass1Img} </span><br /></div>
                <div style={DivStyle}><Input style = {InputStyle} label="Confirm Password" onChange={(e) => { isSamePasswords(e) }} type="password"/><span>{pass2Img} </span><br /></div>
                <h2 style={{ color: color }}>{isStrong}</h2>
            </div>
            <div>
                <Btn style={{ margin: '10px', width: '250px',background:'#8b63b7', color:'white'}} text='Register' clickHandler={registerHandler}/>
            </div>
        </div>
    </div>

    )
}
