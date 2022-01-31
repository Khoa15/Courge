import React, { useCallback, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import axios from 'axios'
import {Container} from '@mui/material'
import AppContext from '../AppContext'
import Appbar from './Appbar'


export default function Dashboard(props){
    const navigate = useNavigate()
    const {name, server} = props.nameRes
    const token = localStorage.getItem("token")
    const checkPermission = useCallback(async()=>{
        try{
            const option = {
                method: 'get',
                url: server+'/api/v1/auth',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const res = await axios(option)
            if(res.data.data.user.permission < 2){
                navigate(name)
            }
        }catch(error){
            console.log(error)
            navigate(name)
        }
    }, [])
    useEffect(()=>{
        if(token===undefined){
            navigate(name)
        }
        checkPermission()
    }, [])
    return(
        <Container>
            <Appbar nameRes={props.nameRes} />
        </Container>
    )
}