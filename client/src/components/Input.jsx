import React from 'react'
import {TextField } from '@material-ui/core';

export default function Input(props) {
    const {id,label,type,style,onChange} = props;
    return (
        <>
         <TextField id = {id} variant='outlined' onChange={onChange} style={style} label={label} type={type} />
        </>
    )
}
