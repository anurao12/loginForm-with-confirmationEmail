import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import Spinner from './spinner';
import { API_URL } from '../config';

export default class Confirm extends Component {
  
  state = {
    confirming: true
  }

  componentDidMount = () => {
    const { id } = this.props.match.params

    fetch(`${API_URL}/email/confirm/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ confirming: false })
        notify.show(data.msg)
      })
      .catch(err => console.log(err))
  }

  // While the email address is being confirmed on the server a spinner is 
  // shown that gives visual feedback. Once the email has been confirmed the 
  // spinner is stopped and turned into a button that takes the user back to the 
  // <Landing > component so they can confirm another email address.
  render = () =>
    <div className='confirm'>
      {this.state.confirming
        ? <Spinner size='8x' spinning={'spinning'} /> 
        : <Link to='/'>
            <Spinner size='8x' spinning={''} /> 
          </Link>
      }
    </div>
}