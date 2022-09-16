import React, {useState , useEffect} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useHistory , useParams} from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import {  getSingleUser, updateUser } from "../redux/actions";

const EditUser =() => {
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
    let {id} = useParams()
    const {user} = useSelector(state => state.data)

useEffect(() => {
    dispatch(getSingleUser(id))
}, [])

useEffect(() => {
    if(user){
        setState({...user})
    }
}, [user])
    const handleInputChange = (e) => {
        let {name , value} = e.target;
        setState({...state, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !address || !email || !contact) {
            setError('Please input all the input field')
        }else{
            dispatch(updateUser(state, id));
            history.push("/");
            setError("")
        }
    }
    return(
        <div>
             <Button style={{width: "100px" , marginTop:"20px"}} variant="contained" color="secondary" onClick={() => history.push("/")}>Go Back</Button>
            <h1>Update User</h1>
            {error && <h3 style={{color:"red"}}>{error}</h3>}
            <form onSubmit={handleSubmit}>
            <TextField id="standard-basic" label="Name" variant="standard" name="name" value={name || ""} type="text" onChange={handleInputChange} />
            <br />
            <TextField id="standard-basic" label="Email" variant="standard" name="email" value={email || ""} type="email" onChange={handleInputChange}/>
            <br />
            <TextField id="standard-basic" label="Contact" variant="standard" name="contact" value={contact || ""} type="number" onChange={handleInputChange}/>
            <br />
            <TextField id="standard-basic" label="Address" variant="standard" value={address || ""} name="address" type="text" onChange={handleInputChange}/>
            <br />
            <Button style={{width: "100px" , marginTop:"10px"}} variant="contained" color="primary" type="submit">Update</Button>
            </form>
        </div>
    )
}

export default EditUser;