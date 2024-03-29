import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackPromise } from 'react-promise-tracker';
import config from 'react-global-configuration';
import Card from '../../shared/components/UIElements/Card';

toast.configure()
class Register extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            profilePhoto: null,
            isBtnDisabled: false
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
        this.setState({
            isBtnDisabled: !this.state.isBtnDisabled
        })
        const newUser = new FormData();
        newUser.set('name', this.state.name)
        newUser.set('email', this.state.email)
        newUser.set('password', this.state.password)
        newUser.append('image', this.state.profilePhoto)

        trackPromise(
        axios.post(`${config.get('backend_url')}/users/signup`, newUser)
        .then((res) => {
            this.props.history.push('/login');
            toast.success('Registered Successfully', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000
            });
        })
        .catch((err) => {
            toast.error(err.response.data.message[0].msg || err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            });
            this.setState({
                isBtnDisabled: !this.state.isBtnDisabled
            })
        }));
    }

    render() {
        return (

            <div className="register">
                <div className="container">
                <Card>
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

                                <input type="submit" disabled={this.state.isBtnDisabled} value="Sign up" className="btn btn-danger btn-block mt-4" />
                                <Link to="/login" style={{"textDecoration": "none"}}><button disabled={this.state.isBtnDisabled} type="button"  className="btn btn-outline-danger btn-block mt-4">Login</button></Link>
                             
                            </form>
                        </div>
                    </div>
                </Card>
                </div>
            </div>

        )
    }
}

export default Register;