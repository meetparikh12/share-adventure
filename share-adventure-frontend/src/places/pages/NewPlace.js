import React from 'react';

// import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
            image: `${this.fileInput.current.files[0].name}`,
            address: this.state.address
        }
        console.log(placeData);
        alert('Your data has been submitted');
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
                                    <input type="text" className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.topic} name="title" placeholder="Place Name" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.description} placeholder="Place Description" name="description"></textarea>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.address} placeholder="Address" name="address"/>
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

export default NewPlace;
