import React from 'react';
import './NewPlace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { connect } from 'react-redux';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackPromise } from 'react-promise-tracker';
import PropTypes from 'prop-types';

toast.configure();
class NewPlace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : '',
            description: '',
            image: '',
            address:'',
            creator:'',
            id:'',
            placePhoto: null,
            isBtnDisabled: false
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);  
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    fileSelectedHandler(event) {
        this.setState({
            placePhoto: event.target.files[0]
        })
    }
    formChangeHandler(event){
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    formSubmitHandler(event) {
        event.preventDefault();
        const newPlace = new FormData();
        newPlace.set('title', this.state.title)
        newPlace.set('description', this.state.description)
        newPlace.set('address', this.state.address)
        newPlace.append('image', this.state.placePhoto)
        this.setState({
            isBtnDisabled: !this.state.isBtnDisabled
        })
        trackPromise(
        axios.post('http://localhost:5000/api/places', newPlace)
        .then((res)=> {
            toast.success('Place Added!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000
            });
            this.props.history.push('/')
        })
        .catch((err)=> {
            toast.error(err.response.data.message[0].msg || err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000
            });
            this.setState({
                isBtnDisabled: !this.state.isBtnDisabled
            })
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
                                <h6>Upload Photo:</h6>
                                <div className="form-group">
                                    <input required type="file" accept='.jpg,.png,.jpeg' placeholder = "Upload Photos" onChange={this.fileSelectedHandler} className="form-control form-control-lg" name="image" />
                                </div>
                                {/* <div>
                                    <img src="data:image/jpeg;base64,"
                                </div> */}
                                <input type="submit" disabled={this.state.isBtnDisabled} value="Add New Place" className="btn btn-danger btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    };
}

NewPlace.propTypes = {
    userInfo: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.loginUserInfo
    }
}
export default connect(mapStateToProps,null)(NewPlace);
