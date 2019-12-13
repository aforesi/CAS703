
 /* eslint-disable jsx-a11y/accessible-emoji */
 import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
 import Loading from '../../Loading/Loading';
 import Approved from '../../../img/approved.png';
 import writeToBlackboard from '../Blackboard';

 class Authenticator extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    blackboardWriter (key, value) {
        writeToBlackboard(key, value);
    }

    render () {

        return 0;

    }    
  };

  export default Authenticator;