import React from 'react'
import { Button} from '@material-ui/core';


export default function Btn(props) {
    const {text,clickHandler,style} = props
    return (
        <>
        <Button style = {style} variant="contained" color="primary" onClick={clickHandler} >{text}</Button>
        </>
    )
}
