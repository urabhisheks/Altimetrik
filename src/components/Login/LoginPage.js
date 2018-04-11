import React,{PropTypes}  from 'react';
import TextInput from '../common/TextInput';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import toastr from 'toastr';

export class LoginPage extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.state={
        username: '',
        password: '',
        errors: {},
        logging: false,
      };
      this.updateLoginState = this.updateLoginState.bind(this);
      this.login = this.login.bind(this);
    }

  updateLoginState(event){
      return this.setState({[event.target.name]: event.target.value});
    }

  loginFormIsValid (){
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
    this.setState({errors: errors});
    return formIsValid;
  }

  login(event) {
    event.preventDefault();
    if(!this.loginFormIsValid()){
      console.log('this.loginFormIsValid() ', this.loginFormIsValid());
      return;
    }
    this.setState({logging:true});
    this.props.actions.initiateLogin(this.state.username, this.state.password)
      .then((data)=> {console.log(data);this.redirect()})
      .catch(error => {
        toastr.error(error.response.data.message);
        this.setState({logging:false});
      });
  }
  redirect(){
      this.setState({logging:false});
      toastr.success('Logged In');
      this.context.router.push('/');
    }
  render() {
    return(
       <form>
         <h1>Login Page</h1>
         <div className="col-md-4">
         <TextInput name="username" label="Username"
           value={this.state.username} onChange={this.updateLoginState}
           error={this.state.errors.username} />
         <TextInput name="password" label="Password"
           value={this.state.password} onChange={this.updateLoginState} type="password"
           error={this.state.errors.password} />
         <input type="submit" disabled={this.state.logging}
            value={this.state.logging ? 'Logging...' : 'Log In'}
            className= "btn btn-primary"
            onClick={this.login}/>
        </div>
        </form>
      );
  }
};

function mapStateToProps(state){
  const {username} = state;
  return {
    username
  };
}

function mapDispatchToProps(dispatch) {
    console.log('Loginpage MapStatetoProps');

  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}

LoginPage.contextTypes={
  router: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
