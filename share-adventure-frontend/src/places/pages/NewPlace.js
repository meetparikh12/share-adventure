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

    render(){
        return (
           <div class="add-PBI">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 m-auto">
                            {/* <a href="#" class="btn btn-light">
                                Back to Project Board
                            </a> */}
                            <h4 class="display-4 text-center">Add New Place</h4>
                            <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.topic} name="title" placeholder="Place Name" />
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.description} placeholder="Place Description" name="description"></textarea>
                                </div>
                                <div class="form-group">
                                    <input class="form-control form-control-lg" onChange = {this.formChangeHandler} value={this.state.address} placeholder="Address" name="address"/>
                                </div>
                                <h6>Upload Image:</h6>
                                <div class="form-group">
                                    <input type="file" ref={this.fileInput} class="form-control form-control-lg" name="image" />
                                </div>
                                <input type="submit" class="btn btn-danger btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    };
}

export default NewPlace;
