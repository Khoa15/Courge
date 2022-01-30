import React, { useCallback, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import axios from 'axios'
import {Container} from '@mui/material'
import AppContext from '../AppContext'
import Appbar from './Appbar'


export default function Dashboard(){
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const checkPermission = useCallback(async()=>{
        try{
            const option = {
                method: 'get',
                url: '/api/v1/auth',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const res = await axios(option)
            if(res.data.data.user.permission < 2){
                navigate('/')
            }
        }catch(error){
            console.log(error)
            navigate('/')
        }
    }, [])
    useEffect(()=>{
        if(token===undefined){
            navigate('/')
        }
        checkPermission()
    }, [])
    return(
        <Container>
            <Appbar />
        </Container>
    )
}