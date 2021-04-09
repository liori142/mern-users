import React, { useState, useEffect, useContext } from 'react'
import apiServer from '../services/apiService'
import { userContext } from '../../RoutePages'

export default function User() {
    const [myUsers, setMyUsers] = useState(null)
    const [index, setIndex] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isMale, setIsMale] = useState('blue');
    const { myObjects } = useContext(userContext);
    let stylesOuterBox = { background: '#eaeaea' }
    let stylesInnerBox = { background: '#eaeaea', boxShadow: `0 0 40px 25px ${isMale}`, width: "80%",whiteSpace:'pre' }
    async function getUser() {
        let myUserPath = window.location.pathname.slice(6).split('%20').join('')
        myObjects.then(res => { setMyUsers(res.results) })
        myUsers && myUsers.forEach((element, i) => {
            let selectedFullName = element.name.first + element.name.last;
            selectedFullName.toString() == myUserPath.toString() && setIndex(i);
        })
        if (index !== null) {
            setSelectedUser(myUsers[index])
            if (myUsers[index].gender === 'male') {
                setIsMale('#07689f')
            } else { setIsMale('#fc5185') }
        }
    }

    useEffect(async () => {
        await getUser()
    }, [myUsers, index])

    return (
        <div className="userContainer d-flex justify-content-center py-5" style={stylesOuterBox}>
            <div className="userClass my-5 text-dark rounded-lg p-3" style={stylesInnerBox}>
                {selectedUser != null && <React.Fragment>
                    <div><h3><u>Name</u> :  {selectedUser.name.first} {selectedUser.name.last}</h3>
                    <h3><u>Age</u> :  {+selectedUser.dob.age}</h3>
                    <h3><u>Year of birth</u> :  {selectedUser.dob.date.split('T')[0]}</h3>
                    <h3><u>Gender</u> :  {selectedUser.gender}</h3>
                    <h3><u>Email</u> :  {selectedUser.email}</h3>
                    <h3><u>Phone</u> :  {selectedUser.phone}</h3>
                    <h3><u>Address</u> :  {`${selectedUser.location.city}, ${selectedUser.location.country}`}</h3></div>
                    <div><img className="m-2 rounded-lg" src={selectedUser.picture.large} width="100%" alt="" /></div>
                </React.Fragment>}
            </div>
        </div>
    )
}
