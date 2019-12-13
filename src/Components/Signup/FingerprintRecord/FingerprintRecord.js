
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
 import "./FingerprintRecord.css";
 import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
 import Loading from '../../Loading/Loading';
 import Approved from '../../../img/approved.png';

 class FingerprintRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            begun: false,
            optOut: false,
            userInfo: {
                fingerprint: false
            }
        }
    }

    toggleCheckBox() {
        var currentState = this.state.optOut;
        var tempObj = {
            fingerprint: currentState
        }
        this.setState({
            optOut: !currentState,
            userInfo: tempObj
        })
    }

    setUserInfo(data) {
        this.props.setUserInfo(data);
    }

    nextComponent() {
        this.props.nextComponent('FacialRecord');
    }

    recordFinger() {
        this.setState({
            loading: true,
            begun: true
        });
        setTimeout(() => {
            var tempObj = {
                fingerprint: true
            }
            this.setState({
                loading: false,
                userInfo: tempObj
            })
        }, 1500);


    }

    submitForm = (e) => {
        e.preventDefault();
        if (this.state.userInfo.fingerprint || this.state.optOut) {
            this.nextComponent();
            this.setUserInfo(this.state.userInfo);
        } else {
            alert("You must record you finger print first");
        }
        
    }

    render () {

        return(
            <Form className="login-form" onSubmit={ (e) => this.submitForm(e) }>
                <h3>
                    <span className="font-weight-bold">Fingerprint Recorder</span>
                </h3>
                {this.state.begun ? 
                    (this.state.loading ? 
                        <Loading /> : <img src={Approved} height="100px" width="100px" alt="approve"/>) : 
                        <div className="record-finger" onClick={ () => this.recordFinger()}>Click to Scan Finger</div>
                }
                <FormGroup check>
                    <Label check>
                    <Input type="checkbox" onClick={ () => this.toggleCheckBox()} />{' '}
                    No Fingerprint Scanner
                    </Label>
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block">
                    Next
                </Button>
            </Form>

        )
    }    
  };

  export default FingerprintRecord;