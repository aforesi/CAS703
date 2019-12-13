
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
 import "./PasswordAuthenticator.css";
 import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
 import axios from 'axios';
 
 
 class PasswordAuthenticator extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    validatePassword(useremail, password) {
        axios
        .get("http://localhost:5000/users/validatepassword", 
            {
                params: {
                    email: useremail,
                    password: password
                }
            } 
        )
        .then(response => {
          if (response.data) {
            this.props.writeToBlackboard("passwordConfidence", 100, "passwordauth");
          } else {
            this.props.writeToBlackboard("passwordConfidence", 0, "passwordauth");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    submitForm = (e) => {
        e.preventDefault();

        this.validatePassword(this.props.userInfo.email, e.target.password.value);

    }

    render () {

    return(
        <Form className="login-form" onSubmit={ (e) => this.submitForm(e) }>
            <h3>
                <span className="font-weight-bold">Password Recorder</span>
            </h3>
            <FormGroup>
                <Label>Enter Password</Label>
                <Input type="password" placeholder="Password" name="password" />
            </FormGroup>
            <Button className="btn-lg btn-dark btn-block">
                Submit
            </Button>
        </Form>

    )
    }
    
  };

  export default PasswordAuthenticator;