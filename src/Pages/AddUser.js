import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useHistory} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";

const AddUser =() => {
    const [state , setState] = useState({
        name:"",
        email:"",
        contact:"",
        address:""
    });
    let history = useHistory();
    let dispatch = useDispatch();
    const {name , email , contact, address} = state;
    const [error , setError] = useState("")

    const handleInputChange = (e) => {
        let {name , value} = e.target;
        setState({...state, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !address || !email || !contact) {
            setError('Please input all the input field')
        }else{
            dispatch(addUser(state));
            history.push("/");
            setError("")
        }
    }
    return(
        <div>
             <Button style={{width: "100px" , marginTop:"20px"}} variant="contained" color="secondary" onClick={() => history.push("/")}>Go Back</Button>
            <h1>Add User</h1>
            {error && <h3 style={{color:"red"}}>{error}</h3>}
            <form onSubmit={handleSubmit}>
            <TextField id="standard-basic" label="Name" variant="standard" name="name" value={name} type="text" onChange={handleInputChange} />
            <br />
            <TextField id="standard-basic" label="Email" variant="standard" name="email" value={email} type="email" onChange={handleInputChange}/>
            <br />
            <TextField id="standard-basic" label="Contact" variant="standard" name="contact" value={contact} type="number" onChange={handleInputChange}/>
            <br />
            <TextField id="standard-basic" label="Address" variant="standard" value={address} name="address" type="text" onChange={handleInputChange}/>
            <br />
            <Button style={{width: "100px" , marginTop:"10px"}} variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default AddUser;