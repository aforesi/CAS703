 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
 import { Redirect } from "react-router-dom";
 import "./Login.css";
 import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
 import axios from "axios";


 class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          redirect: false,
          userInfo: {}
        }
    }

    submitForm (e) {
      e.preventDefault();
      this.findUser(e.target.email.value);
    }


    findUser(email) {
      axios
        .get("http://localhost:5000/users/", {
        params: {
          email: email,
        }})
        .then(response => {
          if (response.data[0]) {
            this.setState({
              redirect: true,
              userInfo: response.data
            })
          } else if (response.data[0] === undefined) {
            alert("No user with that email");
          }
        })
        .catch(error => {
          console.log(error);
        });
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
      const { redirect, userInfo } = this.state;

      if (redirect) {
        return <Redirect to={{
          pathname: '/blackboard',
          state: { userInfo: userInfo }
      }}
/>;
      }
      return (  
        <Form className="login-form" onSubmit={ (e) => this.submitForm(e) } >
          <h3>
              <span className="font-weight-bold">Enter Email</span>
          </h3>
          <FormGroup>
              <Label>Email</Label>
              <Input type="email" name="email" placeholder="Email" onChange={ (e) => this.handleChange(e) } />
          </FormGroup>
          <Button className="btn-lg btn-dark btn-block">
              Next
          </Button>
        </Form>
      )
    }
  };

  export default Login;