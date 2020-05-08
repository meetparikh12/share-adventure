import React from 'react';
import './NewPlace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
toast.configure();

class UpdatePlace extends React.Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            title : '',
            description: '',
            placeId : props.match.params.placeId
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
         //   image: `${this.fileInput.current.files[0].name}`,
        }
        
        axios.patch(`http://localhost:5000/api/places/${this.state.placeId}`, placeData)
        .then((res)=> {
            console.log(res.data.place);
            this.props.history.push(`/${this.props.userInfo._id}/places`)
        })
        .catch((err)=> {
            console.log(err.response.data);
            toast.error(err.response.data.message[0].msg || err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        });
    }

    componentDidMount(){
        const {placeId} = this.props.match.params;
        axios.get(`http://localhost:5000/api/places/${placeId}`)
        .then((res)=> {
            const { title, description } = res.data.place;
            this.setState({
                title, description
            })
        })
        .catch((err)=> {
            toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT});
        })
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
                            <h4 className="display-4 text-center">Update Place</h4>
                            <form onSubmit={this.formSubmitHandler}>
                                <div className="form-group">
                                    <input required type="text" className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.title} name="title" placeholder="Place Name" />
                                </div>
                                <div className="form-group">
                                    <textarea required className="form-control form-control-lg"  onChange = {this.formChangeHandler} value={this.state.description} placeholder="Place Description" name="description"></textarea>
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
        userInfo: state.user.loginUserInfo
    }
}

export default connect(mapStateToProps,null)(UpdatePlace);
