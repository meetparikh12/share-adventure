import React from 'react';
import './NewPlace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { connect } from 'react-redux';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackPromise } from 'react-promise-tracker';

toast.configure();
class NewPlace extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            title : '',
            description: '',
            image: '',
            address:'',
            creator:'',
            id:''
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);  
        this.formSubmitHandler = this.formSubmitHandler.bind(this);

    }
    
    formChangeHandler(event){
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    formSubmitHandler(event) {
        event.preventDefault();
        const placeData = {
            title: this.state.title,
            description: this.state.description,
            //image: `${this.fileInput.current.files[0].name}`,
            address: this.state.address,
            creator: this.props.user._id
        }
        console.log(placeData);
        trackPromise(
        axios.post('http://localhost:5000/api/places', placeData)
        .then((res)=> {
            console.log(res.data);
            toast.success('Place Added!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000
            });
            console.log(res.data.place.creator);
           this.props.history.push('/')
        })
        .catch((err)=> {
            console.log(err.response.data);
            toast.error(err.response.data.message[0].msg || err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000
            });
        }));
    }

    render(){
        return (
           <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            {/* <a href="#" className="btn btn-light">
                                Back to Project Board
                            </a> */}
                            <h4 className="display-4 text-center">Add New Place</h4>
                            <form onSubmit={this.formSubmitHandler}>
                                <div className="form-group">
                                    <input type="text" required className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.title} name="title" placeholder="Place Name" />
                                </div>
                                <div className="form-group">
                                    <textarea required className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.description} placeholder="Place Description" name="description"></textarea>
                                </div>
                                <div className="form-group">
                                    <input required className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.address} placeholder="Address" name="address"/>
                                </div>
                                <h6>Upload Image:</h6>
                                <div className="form-group">
                                    <input type="file" ref={this.fileInput} className="form-control form-control-lg" name="image" />
                                </div>
                                <input type="submit" className="btn btn-danger btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    };
}
const mapStateToProps = state => {
    return {
        user: state.user.loginUserInfo
    }
}
export default connect(mapStateToProps,null)(NewPlace);
