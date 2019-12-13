 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
 import UserInfo from './UserInfo/UserInfo'
 import PasswordRecord from './PasswordRecord/PasswordRecord'
 import FingerprintRecord from './FingerprintRecord/FingerprintRecord'
 import FacialRecord from './FacialRecord/FacialRecord'
 import Loading from '../Loading/Loading'
 import axios from "axios";
 import { Link } from "react-router-dom";



 class Signup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentComponent: "UserInfo",
            loading: false,
            registerUser: false,
            userData: {
            },
            firstname: '',
            email: ''
        }
    }

    setUserInfo(data, finished) {

      var tempObj = {
        ...this.state.userData,
        ...data
      }
      this.setState({
        userData: tempObj
      }, () => {
        if (finished) {
          this.registerUser();
        } else {
          return;
        }
      })

      

    }

    nextComponent(nextComponent) {
        this.setState({
            currentComponent: nextComponent,
            loading: true
        })

        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1500);
    }

    registerUser() {
      axios
        .post("http://localhost:5000/users/register", 
          this.state.userData 
        )
        .then(response => {
          console.log("Completed");
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

    }

    
    render () {
            
        switch(this.state.currentComponent) {
            case 'UserInfo':
              return this.state.loading ? <Loading /> : <UserInfo nextComponent={this.nextComponent.bind(this)} setUserInfo={this.setUserInfo.bind(this)} />;
            case 'PasswordRecord':
              return this.state.loading ? <Loading /> : <PasswordRecord nextComponent={this.nextComponent.bind(this)} setUserInfo={this.setUserInfo.bind(this)}/>;
            case 'FingerprintRecord':
              return this.state.loading ? <Loading /> : <FingerprintRecord nextComponent={this.nextComponent.bind(this)} setUserInfo={this.setUserInfo.bind(this)}/>;
            case 'FacialRecord':
              return this.state.loading ? <Loading /> : <FacialRecord nextComponent={this.nextComponent.bind(this)} setUserInfo={this.setUserInfo.bind(this)}/>;
            case 'Completed':
              return this.state.loading ? <Loading /> : (
                <div>
                  <div>Finished</div>
                  <Link to="/login">
                    <button className="btn btn-primary" type="button">
                        Login
                    </button>
                  </Link>
              </div>);
            default:
              return null;
        }
    }
  };

  export default Signup;