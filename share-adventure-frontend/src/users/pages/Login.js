import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Auth extends Component {
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

        console.log(loginUser);
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
