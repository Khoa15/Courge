import { useCallback, useEffect, useState } from "react"
import {Container, Grid, Alert} from '@mui/material'
import {DataGrid, GridRowsProp, GridColDef, GridCellEditCommitParams} from '@mui/x-data-grid'
import axios from 'axios'
export default function User(props){
    const nameRes = props.nameRes
    const [users, setUsers] = useState(null)
    const token = localStorage.getItem('token')
    const [editRowsModel, setEditRowsModel] = useState({});
    const saveUsers = async(e)=>{
        try {
            const option = {
                method: 'post',
                url: nameRes.server+'/api/v1/auth/users/'+e.id,
                headers:{
                    Authorization: `Bearer ${token}`
                },
                data:{
                    [e.field]:e.value
                }
            }
            const res = await axios(option)
        } catch (error) {
            console.log(error)
        }
    }
    const handleEditCommit = (e)=>{
        setEditRowsModel(e)
        console.log(e)
        const array = users.map(r=>{
            if(r._id ===e.id){
                return {...r, [e.field]:e.value}
            }else{
                return {...r}
            }
        })
        setUsers(array)
    }
    useEffect(()=>{
        saveUsers(editRowsModel)
    }, [editRowsModel])
    const getAllUsers = useCallback(async()=>{
        try {
            const option = {
                method: 'get',
                url: nameRes.server+'/api/v1/auth/users',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            const res = await axios(option)
            setUsers(res.data.users)
        } catch (error) {
            console.log(error)
        }
    })
    useEffect(()=>{
        getAllUsers()
    }, [])
    const columns = [
        {field: 'name', headerName: 'Name', editable: true},
        {field: 'email', headerName:'Email', width: 200, editable: true},
        {field: 'createdAt', headerName:'Created At'}
    ]
    return(
        <>
        <Grid item sm={9} xs={12}>
            {users && (<DataGrid initialState={{sorting:{sortModel:[{field:'createdAt', sort:'desc'}]}}} autoHeight getRowId={(row) => row._id} columns={columns} rows={users} columnBuffer={3} rowsPerPageOptions={[10]} pageSize={10} onCellEditCommit={handleEditCommit} />)}
        </Grid>
        {/* <Grid item sm={12}>
        <Alert severity="info" style={{ marginBottom: 8 }}>
            <code>editRowsModel: {JSON.stringify(users)}</code>
        </Alert>
        </Grid> */}
        </>
    )
}