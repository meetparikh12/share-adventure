import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userCreationError} from '../../actions/actions';

toast.configure()
class Register extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    formChangeHandler(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    formSubmitHandler(event){
        event.preventDefault();  

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        
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
            axios.post('http://localhost:5000/api/users/signup', user)
                .then((res) => {
                    history.push('/login');
                    toast.success('Registered Successfully', {position: toast.POSITION.BOTTOM_RIGHT});
                    dispatchEvent(userCreationError([]));
                })
                .catch((err) => {
                    toast.error(err.response.data.message[0].msg, {position: toast.POSITION.BOTTOM_RIGHT});
                    dispatchEvent(userCreationError(err.response.data.message))
                });
        }
    }
}
export default connect(null,mapDispatchToProps)(Register);