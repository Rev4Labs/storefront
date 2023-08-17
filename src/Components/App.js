import React, { Component, Fragment } from 'react';
import Login from './Login';
import Cart from './Cart';
import NavBar from './Navbar';
import ProductAll from './ProductAll';
import ProductSingle from './ProductSingle';
import ProductLanding from './ProductLanding';
import AdminDashboard from './AdminDashboard';
import OrderHistory from './OrderHistory';
import User from './User';
import { loginWithToken, fetchCart } from '../store';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ThankYou from './ThankYou';
import AboutStars from './AboutStars';

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
      <Fragment>
        <NavBar />
        <Fragment>
          <Routes>
            <Route path="/" element={<ProductLanding />} />
            <Route path="/home" element={<ProductLanding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductAll />} />
            <Route path="/products/:id" element={<ProductSingle />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users/:id/orders" element={<OrderHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/aboutstars" element={<AboutStars />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Fragment>
      </Fragment>
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
