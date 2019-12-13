
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
 import "./FingerprintAuthenticator.css";
 import { Button, Form } from 'reactstrap';
 import Loading from '../../Loading/Loading';
 import Approved from '../../../img/approved.png';

 class FingerprintAuthenticator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            begun: false
        }
    }

    recordFinger() {
        this.setState({
            loading: true,
            begun: true
        });
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1500);
    }

    submitForm = (e) => {
        e.preventDefault();        
        this.props.writeToBlackboard("fingerprintConfidence", 100, "fingerprintscan");
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
                <Button className="btn-lg btn-dark btn-block">
                    Next
                </Button>
            </Form>

        )
    }    
  };

  export default FingerprintAuthenticator;