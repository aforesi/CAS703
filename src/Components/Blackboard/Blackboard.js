 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
 import FacialAuthenticator from './FacialAuthenticator/FacialAuthenticator';
 import FingerprintAuthenticator from './FingerprintAuthenticator/FingerprintAuthenticator';
 import PasswordAuthenticator from './PasswordAuthenticator/PasswordAuthenticator';
 import Loading from '../Loading/Loading';
 import { Link } from "react-router-dom";


 class Blackboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            authenticationConfidence: 0,
            currentComponent: 'password',
            loading: false,
            facialscan: false,
            fingerprintscan: false,
            passwordauth: false
        }
    }


    writeToBlackboard(key, value, currentAuthMethod) {
        this.setState({
            [key]: value,
            loading: true,
            [currentAuthMethod]: true
        }, () => {
            this.controller();
        })
    }

    controller() {
        var nextComponent;
        var randomAuthDecision = Math.floor(Math.random() * 2) + 1 ;

        if (this.props.location.state.userInfo[0].fingerprint && !this.state.fingerprintscan) {
            nextComponent = "FingerprintRecord";
        } else if (this.props.location.state.userInfo[0].facialscan && !this.state.facialscan) {
            nextComponent = "FacialRecord";
        } else if (randomAuthDecision === 1) {
            nextComponent = "Authenticated";
        } else if (randomAuthDecision === 2) {
            nextComponent = "NotAuthenticated";
        }
        
        setTimeout(() => {
            this.setState({
                currentComponent: nextComponent,
                loading: false
            })
        }, 1000);
    }

    
    render () {

        switch(this.state.currentComponent) {
            case 'password':
              return this.state.loading ? <Loading /> : <PasswordAuthenticator userInfo={this.props.location.state.userInfo[0]} writeToBlackboard={this.writeToBlackboard.bind(this)} />;
            case 'FingerprintRecord':
              return this.state.loading ? <Loading /> : <FingerprintAuthenticator userInfo={this.props.location.state.userInfo[0]} writeToBlackboard={this.writeToBlackboard.bind(this)}/>;
            case 'FacialRecord':
              return this.state.loading ? <Loading /> : <FacialAuthenticator userInfo={this.props.location.state.userInfo[0]} writeToBlackboard={this.writeToBlackboard.bind(this)}/>;
            case 'Authenticated':
                return (
                    <div>
                        <h1>Authenticated</h1>
                        <Link to="/login">
                            <button className="btn btn-primary" type="button">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn btn-primary" type="button">
                                Sign-Up
                            </button>
                        </Link>
                    </div>)
            case 'NotAuthenticated':
              return (
                  <div>
                    <h1>Not Authenticated</h1>
                    <Link to="/login">
                        <button className="btn btn-primary" type="button">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn btn-primary" type="button">
                            Sign-Up
                        </button>
                    </Link>
                  </div>)
            default:
              return null;
        }
    }
  };

  export default Blackboard;