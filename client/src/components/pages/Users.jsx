import React, { useEffect, useState ,useContext} from 'react'
import Card from '../Card'
import {userContext} from '../../RoutePages'


export default function Users(props) {
    const {myObjects} = useContext(userContext);
    const [isLoggedIn,setIsLoggedIn] = useState('')
    const [object, setObject] = useState(null);
    
    useEffect(() => {
        myObjects.then(res => {setObject(res.results)})
        setIsLoggedIn(localStorage.getItem('isLogged'))
    }, [])
    
    return (
        <div className="row d-flex justify-content-center min-vh-100">
            {isLoggedIn? 
            object && object.map((item, index) => <Card key={index} name={item.name.first +" "+ item.name.last} age = {item.dob.age} email = {item.email} picture = {item.picture.large} obj ={item} />)
            : <h3 className="mt-5">Log in to see users!</h3>}
        </div>
    )
}
