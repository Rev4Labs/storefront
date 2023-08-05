import React, { Component } from 'react';
import Login from './Login';
import Cart from './Cart';
import NavBar from './Navbar';
import ProductAll from './ProductAll';
import ProductSingle from './ProductSingle';
import ProductLanding from './ProductLanding';
import User from './User';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.loginWithToken();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.auth.id && this.props.auth.id) {
      this.props.fetchCart();
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<ProductLanding />} />
            <Route path="/home" element={<ProductLanding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductAll />} />
            <Route path="/products/:id" element={<ProductSingle />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginWithToken: () => dispatch(loginWithToken()),
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
