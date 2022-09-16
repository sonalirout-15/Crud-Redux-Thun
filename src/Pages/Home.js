import React, {useEffect} from "react";
import { styled} from '@mui/material/styles';  
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch, useSelector} from "react-redux";
import {deleteUser, loadUsers} from '../redux/actions';
import {useHistory} from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

const Home = () => {
    let dispatch = useDispatch();
    const {users} = useSelector(state => state.data)
    let history = useHistory()

useEffect(() => {
    dispatch(loadUsers())
}, [])

const handleDelete = (id) => {
    if(window.confirm('Are you sure wanted to delete the user ?')){
        dispatch(deleteUser(id))
    }
}
    return(
        <div>
            <div>
                <Button variant="contained" color="primary" onClick={() => history.push("/addUser")}>Add User</Button>
            </div>
            <h1>Crud Using React Redux Thunk</h1>
             <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.contact}</StyledTableCell>
              <StyledTableCell align="center">{user.address}</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button 
                    style={{marginRight:"5px"}} 
                    color="secondary"
                    variant="contained"
                    onClick={() => handleDelete(user.id)}
                    >Delete</Button>
                <Button 
                    color="primary" 
                    variant="contained"
                    onClick={() => history.push(`/editUser/${user.id}`)}
                    >Edit</Button>
             </ButtonGroup>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default Home;