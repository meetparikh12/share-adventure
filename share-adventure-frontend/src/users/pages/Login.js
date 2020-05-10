import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUserInfo } from '../../actions/actions';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackPromise } from 'react-promise-tracker';
import setJwtToken from '../../security-utils/setJwtToken';
import jwt_decode from 'jwt-decode';

toast.configure();

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }

    formChangeHandler(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    formSubmitHandler(event){
        event.preventDefault();
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        }
        trackPromise(
        axios.post('http://localhost:5000/api/users/login', loginUser)
            .then((res) => {
                const { token } = res.data;
                localStorage.setItem("jwtToken", token);
                setJwtToken(token);
                const decodedToken = jwt_decode(token);
                this.props.setUserInfo(decodedToken,this.props.history);
                toast.success('Logged in Successfully', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000
                });
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000
                });
            }));
            
        }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.formSubmitHandler}>
                                <div className="form-group">
                                    <input type="email" required className="form-control form-control-lg" onChange={this.formChangeHandler} value={this.state.email} placeholder="Email Address" name="email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" required className="form-control form-control-lg" onChange={this.formChangeHandler} value={this.state.password} placeholder="Password" name="password" />
                                </div>
                                <input type="submit" value="Login" className="btn btn-danger btn-block mt-4" />
                                <Link to="/register"><button type="button"  className="btn btn-outline-danger btn-block mt-4">Sign up</button></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Auth.propTypes = {
    userInfo: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        userInfo : state.user.loginUserInfo
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        setUserInfo: (userInfo, history) => {
                dispatchEvent(setUserInfo(userInfo));
                history.push('/');
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
