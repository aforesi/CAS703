 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
 import "./UserInfo.css";
 import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

 class UserInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phone: ''
        }

    }

    nextComponent() {
        this.props.nextComponent('PasswordRecord');
    }

    setUserInfo(data) {
        this.props.setUserInfo(data);
    }


    submitForm = (e) => {
        //make a post request to the backend with the information in this.state
        e.preventDefault();
        if (this.state.firstname === '') {
            alert("Please enter a first name");
        } else if (this.state.lastname === '') {
            alert("Please enter a last name");
        } else if (this.state.email === '') {
            alert("please enter an email");
        } else if (this.state.phone === '') {
            alert("please enter a phone number");
        } else {
            this.setUserInfo(this.state);
            this.nextComponent();
        }

    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });
      }

    render () {
        return(
            <Form className="login-form" onSubmit={ (e) => this.submitForm(e) } >
                <h3>
                    <span className="font-weight-bold">Enrollment Page</span>
                </h3>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input type="text" name="firstname" placeholder="First Name" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input type="text" name="lastname" placeholder="Last Name" onChange={ (e) => this.handleChange(e) } />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email" placeholder="Email" onChange={ (e) => this.handleChange(e) } />
                </FormGroup>
                <FormGroup>
                    <Label>Phone</Label>
                    <Input type="telephone" name="phone" placeholder="905-555-5555" onChange={ (e) => this.handleChange(e) } />
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block">
                    Next
                </Button>
            </Form>

        )
        }
  };

  export default UserInfo;