import React,{PropTypes}  from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../../actions/loginActions';
class Header extends React.Component {
  
   logout(e) {
      e.preventDefault();
      this.props.logout();
    }
  render(){
  const {isAuthenticated} =this.props.username;

  const logoutLink = (
    <ul className="nav navbar-nav navbar-right">
      <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
    </ul>
  );
  
  const loginLinks = (
    <ul className="nav navbar-nav navbar-right">
      <li><Link to="/signup">Sign up</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
  return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Home</Link>
          </div>
          <div className="collapse navbar-collapse">
              { isAuthenticated ? logoutLink : loginLinks }
           </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes= {
  username: React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    username: state.username
  }
}

export default connect(mapStateToProps,{logout})(Header);