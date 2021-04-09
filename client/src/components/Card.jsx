import React from 'react'
import { useHistory } from "react-router-dom";


export default function Card(props) {
    const history = useHistory();
    function clickHandle(){
        history.push(`/user/${props.name}`)
    }
    return (
            <div className = 'cardClass col-3 border border-dark py-5 m-2 text-center' onClick={clickHandle}>
                <h4 className='pt-2'><b>Full name: </b>{props.name}</h4>
                <h5 className='pt-2'><b>age: </b>{props.age}</h5>
                <h6 className='pt-2'><b>email: </b>{props.email}</h6>
                <img className='pt-2' src={props.picture} width="150px" alt=""/>
            </div>
    )
}
