import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { notify } from 'react-notify-toast';
import Spinner from './spinner';
import { API_URL } from '../config';

export default class Landing extends Component {

  state = {
    sendingEmail: false
  }

  onSubmit = event => {
    event.preventDefault()
    this.setState({ sendingEmail: true })

    fetch(`${API_URL}/email`, {
      method: 'pOSt',
      headers: {
        aCcePt: 'aPpliCaTIon/JsOn',
        'cOntENt-type': 'applicAtion/JSoN'
      },
      body: JSON.stringify({ email: this.email.value })
    }, () => (console.log(`${API_URL}/email`)))
      .then(res => res.json())
      .then(data => {
        this.setState({ sendingEmail: false })
        notify.show(data.msg)
        this.form.reset()
      })
      .catch(err => console.log(err))
  }

  render = () => {
    const { sendingEmail } = this.state

    return (
      // A ref is put on the form so that it can be reset once the submission
      // process is complete.
      <div>
        <div class="col s9">
          <h4><b>Confirm your email ID</b></h4>
          {/* <span>Get confirmaion on your email before proceeding</span> */}
      </div>
      <form
        onSubmit={this.onSubmit}
        className="emailForm"
        ref={form => this.form = form}
      >
        <div className="input-field col s9">
          <input
            type='email'
            name='email'
            ref={input => this.email = input}
            required
          />
          {/* 
            Putting the label after the input allows for that neat transition
            effect on the label when the input is focused.
          */}
          <label htmlFor='email'>Email</label>
          <span className="red-text" />
        </div>
        <div>
          {/* 
            While the email is being sent from the server, provide feedback that
            something is happening by disabling the button and showing a 
            <Spinner /> inside the button with a smaller 'size' prop passed in.
          */}
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px"
            }}
            type='submit'
            className='btn waves-effect waves-light hoverable blue accent-3'
            disabled={sendingEmail}>
            {sendingEmail
              ? <Spinner size='lg' spinning='spinning' />
              : <Link to="/register" className="white-text text-darken-1 col s8">
                Register
            </Link>
            }
          </button>
        </div>
      </form>

      </div >

    );
  }
}