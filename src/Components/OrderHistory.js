import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setUserOrders, resetUserOrders } from '../store/ordersSingleUser';
import { withRouter } from '../utils/withRouter';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import OrderSingle from './OrderSingle';

export class OrderHistory extends Component {
  componentDidMount() {
    this.props.setUserOrders(this.props.router.params.id);
  }

  render() {
    return (
      <Container className="mt-5">
        <h1>Order History</h1>
        {this.props.isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : this.props.orders.length ? (
          <Fragment>
            {this.props.orders.map((order) => (
              <OrderSingle key={order.id} order={order} />
            ))}
          </Fragment>
        ) : (
          <h3>No orders on record yet!</h3>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.ordersSingleUser.orders,
    isLoading: state.ordersSingleUser.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserOrders: (id) => dispatch(setUserOrders(id)),
    resetUserOrders: (id) => dispatch(resetUserOrders(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
);
