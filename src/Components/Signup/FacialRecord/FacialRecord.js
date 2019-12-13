
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
 import "./FacialRecord.css";
 import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
 import Loading from '../../Loading/Loading';
 import Approved from '../../../img/approved.png';

 class FacialRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            begun: false,
            optOut: false,
            userInfo: {
                facialscan: false
            }
        }
    }

    toggleCheckBox() {
        var currentState = this.state.optOut;
        var tempObj = {
            facialscan: currentState
        }
        this.setState({
            optOut: !currentState,
            userInfo: tempObj
        })
    }

    setUserInfo(data, finished) {
        this.props.setUserInfo(data, finished);
    }

    nextComponent() {
        this.props.nextComponent('Completed');
    }

    recordFace() {
        this.setState({
            loading: true,
            begun: true
        });
        setTimeout(() => {
            var tempObj = {
                facialscan: true
            }
            this.setState({
                loading: false,
                userInfo: tempObj
            })
        }, 1500);


    }

    submitForm = (e) => {
        e.preventDefault();
        if (this.state.userInfo.facialscan || this.state.optOut) {
            this.nextComponent();
            this.setUserInfo(this.state.userInfo, true);
        } else {
            alert("You must scan your face first");
        }
    }

    render () {

        return(
            <Form className="login-form" onSubmit={ (e) => this.submitForm(e) }>
                <h3>
                    <span className="font-weight-bold">Facial Recognition Scanner</span>
                </h3>
                {this.state.begun ? 
                    (this.state.loading ? 
                        <Loading /> : <img src={Approved} height="100px" width="100px" alt="approve"/>) : 
                        <div className="record-finger" onClick={ () => this.recordFace()}>Click to Scan Face</div>
                }
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" onClick={ () => this.toggleCheckBox()} />{' '}
                    No Camera Available
                    </Label>
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block">
                    Next
                </Button>
            </Form>

        )
    }    
  };

  export default FacialRecord;