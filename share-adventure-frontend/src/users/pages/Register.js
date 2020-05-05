import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Register extends Component {
    
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

        console.log(newUser);
    }

    render() {
        return (

            <div class="register">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 m-auto">
                            <h1 class="display-4 text-center">Sign Up</h1>
                            <p class="lead text-center">Create your Account</p>
                            <form onSubmit={this.formSubmitHandler}>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" onChange={this.formChangeHandler} value={this.state.name} placeholder="Name" name="name"
                                        required />
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg" required onChange={this.formChangeHandler} value={this.state.email} placeholder="Email Address" name="email" />

                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg" required onChange={this.formChangeHandler} value={this.state.password} placeholder="Password" name="password" />
                                </div>
                                <input type="submit" value="Sign up" class="btn btn-danger btn-block mt-4" />
                                <Link to="/login"><button type="button"  className="btn btn-outline-danger btn-block mt-4">Login</button></Link>
                             
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
