import React,{PropTypes}  from 'react';
import TextInput from '../common/TextInput';
import map from 'lodash/map';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as signupActions from '../../actions/signupActions';
import toastr from 'toastr';

const countries = ['India', 'Nepal', 'China', 'Srilanka'];

class SignupPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmpassword: '',
      email: '',
      country: '',
      gender: '',
      errors: {},
      registering: false,

    };
    this.updateSignupState = this.updateSignupState.bind(this);
    this.register = this.register.bind(this);
    this.comparePasswords = this.comparePasswords.bind(this);
    this.checkUserExists=this.checkUserExists.bind(this);
  };

  register(event) {
    event.preventDefault();
    this.setState({registering:true})
    if(!this.signupFormIsValid()){
      console.log('this.signupFormIsValid() ', this.signupFormIsValid());
      return;
    } else if (!this.comparePasswords()){
      return;
    }

      this.props.actions.initiateSignup(this.state)
        .then(()=> this.redirect())
        .catch(error => {
          console.log(error);
          toastr.error(error);
          this.setState({registering:false});
        });
  }

  checkUserExists(event) {
    const field = event.target.name;
    const val = event.target.value;
    if (val !== '') {
      this.props.actions.doesUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        console.log(res.data);
        if (res.data) {
          errors[field] = 'We already have a user with this '  + field;
        } else {
          errors[field] = '';
        }
        this.setState({ errors });
      });
    }
  }
  comparePasswords(){
   let formIsValid=true;
   let errors={};
   if(this.state.password !== this.state.confirmpassword) {
     errors.confirmpassword = 'Passwords do not match.';
     formIsValid=false;
   }
   this.setState({errors: errors});
   return formIsValid;
  }

  signupFormIsValid (){
    let formIsValid=true;
    let errors={};
    if(this.state.username.length === 0) {
      errors.username = 'Username can not be empty.';
      formIsValid=false;
    }
    if(this.state.password.length === 0) {
      errors.password = 'Password can not be empty.';
      formIsValid=false;
    }
    if(this.state.confirmpassword.length === 0) {
      errors.confirmpassword = 'Confirm Password can not be empty.';
      formIsValid=false;
    }
    if(this.state.firstname.length === 0) {
      errors.firstname = 'First Name can not be empty.';
      formIsValid=false;
    }
    if(this.state.lastname.length === 0) {
      errors.lastname = 'Last Name can not be empty.';
      formIsValid=false;
    }
    if(this.state.email.length === 0) {
      errors.email = 'Email can not be empty.';
      formIsValid=false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }


  updateSignupState(event){
    return this.setState({[event.target.name]: event.target.value});
  };

  redirect(){
      this.setState({registering:false});
      toastr.success('Sign up successfull');
      this.context.router.push('/');
    }
  render() {
    const options = map(countries, (val, key) =>
       <option key={val} value={val}>{val}</option>
    );
    return (
      <form>
      <h1>Sign up page</h1>
      <div className="col-md-4">
        <TextInput name="firstname" label="First Name"
          value={this.state.firstname} onChange={this.updateSignupState}
          error={this.state.errors.firstname} />
        <TextInput name="lastname" label="Last Name"
          value={this.state.lastname} onChange={this.updateSignupState}
          error={this.state.errors.lastname} />
        <TextInput name="username" label="Username"
          value={this.state.username} onChange={this.updateSignupState}
          error={this.state.errors.username} checkUserExists={this.checkUserExists}/>
        <TextInput name="password" label="Password"
           value={this.state.password} onChange={this.updateSignupState} type="password"
           error={this.state.errors.password} />
        <TextInput name="confirmpassword" label="Confirm Password"
           value={this.state.confirmpassword} onChange={this.updateSignupState} type="password"
           error={this.state.errors.confirmpassword} />
        <TextInput name="email" label="Email"
           value={this.state.email} onChange={this.updateSignupState} type="email"
           error={this.state.errors.email} checkUserExists={this.checkUserExists}/>
        <input type="submit" disabled={this.state.registering}
            value={this.state.registering ? 'Signing Up...' : 'Sign Up'}
            className= "btn btn-primary"
            onClick={this.register}/>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
    console.log('SignupPage MapStatetoProps');

  return {
    actions: bindActionCreators(signupActions, dispatch)
  }
}

SignupPage.contextTypes={
  router: PropTypes.object
};

export default connect((state=> {return {}}), mapDispatchToProps)(SignupPage);