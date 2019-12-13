
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
 import "./PasswordRecord.css";
 import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
 import Approved from '../../../img/approved.png';
 import Rejected from '../../../img/rejected.png';
 
 
 class PasswordRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            approve: false,
            begun: false,
            userInfo: {
                minpasswordtime: 0,
                maxpasswordtime: 0
            }
        }
    }

    nextComponent() {
        this.props.nextComponent('FingerprintRecord');
    }

    setUserInfo(data) {
        this.props.setUserInfo(data);
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setUserInfo(this.state.userInfo);
        this.nextComponent();
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });

        if (name === "validationPassword") {
            if (value.length > 5) {
                var tempObj = {
                    ...this.state.userInfo,
                    password: value
                }
                this.setState({
                    approve: true,
                    begun: true,
                    userInfo: tempObj
                })
            } else {
                this.setState({
                    approve: false,
                    begun: true
                })
            }
        }
        

    }

    render () {
        

    return(
        <Form className="login-form" onSubmit={ (e) => this.submitForm(e) }>
            <h3>
                <span className="font-weight-bold">Password Recorder</span>
            </h3>
            <FormGroup>
                <Label>Choose Password</Label>
                <Input type="password" placeholder="Password" name="validationPassword" onChange={this.handleChange} />
                {this.state.begun ? (this.state.approve ? <img src={Approved} height="20px" width="20px" alt="approve"/> : <img src={Rejected} height="20px" width="20px" alt="reject"/>) : undefined}
            </FormGroup>
            <FormGroup>
                <Label>Attempt #1</Label>
                <Input type="password" placeholder="Password Attempt #1" name="attempt1" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label>Attempt #2</Label>
                <Input type="password" placeholder="Password Attempt #2" name="attempt2" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label>Attempt #3</Label>
                <Input type="password" placeholder="Password Attempt #3" name="attempt3" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label>Attempt #4</Label>
                <Input type="password" placeholder="Password Attempt #4" name="attempt4" onChange={this.handleChange}/>
            </FormGroup>
            <Button className="btn-lg btn-dark btn-block">
                Submit
            </Button>
        </Form>

    )
    }

  };

  export default PasswordRecord;