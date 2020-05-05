import React from 'react';

// import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const USER_PLACES = [{
    id: 'p1',
    title: 'Eiffel Tower',
    description: "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
    location: {
        lat: 48.8583701,
        long: 2.2922926
    },
    creator: 'u1',
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipP-NhTcS5og3oV5i9Io6VCI6L9SId9olNJx12iI=w408-h272-k-no"
}, {
    id: 'p2',
    title: 'Castel Cafe',
    description: "Late-night food , Cosy, Casual ",
    address: "5 Avenue de Suffren, 75007 Paris, France",
    location: {
        lat: 48.8583701,
        long: 2.2922926
    },
    creator: 'u2',
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipMMdy3joN1_HlEM-ZwVBkm5-__1ZTrcbUHoIkOE=w408-h256-k-no"
}]

class UpdatePlace extends React.Component {
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

        const {placeId} = this.props.match.params;
        const loadPlace = USER_PLACES.find((place)=> place.id === placeId);
        console.log(loadPlace);
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
                                    <input type="text" className="form-control form-control-lg" onChange = {this.formChangeHandler} value={loadPlace.title} name="title" placeholder="Place Name" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg"  onChange = {this.formChangeHandler} value={loadPlace.description} placeholder="Place Description" name="description"></textarea>
                                </div>
                                <div className="form-group">
                                    <input className="form-control form-control-lg" disabled onChange = {this.formChangeHandler} value={loadPlace.address} placeholder="Address" name="address"/>
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

export default UpdatePlace;
