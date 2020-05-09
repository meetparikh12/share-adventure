import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userCreationError} from '../../actions/actions';
import { trackPromise } from 'react-promise-tracker';

toast.configure()
class Register extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            profilePhoto: null
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    fileSelectedHandler(event) {
        this.setState({
            profilePhoto: event.target.files[0]
        })
    }

    formChangeHandler(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    formSubmitHandler(event){
        event.preventDefault();  

        const newUser = new FormData();
        newUser.set('name', this.state.name)
        newUser.set('email', this.state.email)
        newUser.set('password', this.state.password)
        newUser.append('image', this.state.profilePhoto)

        this.props.createNewUser(newUser,this.props.history);
        
    }

    render() {
        return (

            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form onSubmit={this.formSubmitHandler}>
                                <h6>Select your Profile Photo:</h6>
                                <div className="form-group">
                                    <input type="file" required accept='.jpg,.png,.jpeg' onChange={this.fileSelectedHandler} className="form-control form-control-lg" name="image" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" onChange={this.formChangeHandler} value={this.state.name} placeholder="Name" name="name"
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg" required onChange={this.formChangeHandler} value={this.state.email} placeholder="Email Address" name="email" />

                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" required onChange={this.formChangeHandler} value={this.state.password} placeholder="Password" name="password" />
                                </div>

                                <input type="submit" value="Sign up" className="btn btn-danger btn-block mt-4" />
                                <Link to="/login"><button type="button"  className="btn btn-outline-danger btn-block mt-4">Login</button></Link>
                             
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


const mapDispatchToProps = dispatchEvent => {
    return {
        createNewUser : (user,history) => {
            trackPromise(
            axios.post('http://localhost:5000/api/users/signup', user)
                .then((res) => {
                    history.push('/login');
                    toast.success('Registered Successfully', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1000
                    });
                    dispatchEvent(userCreationError([]));
                })
                .catch((err) => {
                    toast.error(err.response.data.message[0].msg || err.response.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1000
                    });
                    dispatchEvent(userCreationError(err.response.data.message))
                }));
        }
    }
}
export default connect(null,mapDispatchToProps)(Register);