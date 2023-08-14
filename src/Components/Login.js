import React, { useState, Fragment } from 'react';
import { attemptLogin, logout, attemptRegistration } from '../store';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { withRouter } from '../utils/withRouter';
import * as formik from 'formik';
import * as yup from 'yup';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
  })
  const [login, setLogin] = useState(true)
  const [register, setRegister] = useState(false)
  const [show, setShow] = useState(true)

  // onChange(ev) {
  //   this.setState({
  //     credentials: {
  //       ...this.state.credentials,
  //       [ev.target.name]: ev.target.value,
  //     },
  //   });
  // }

  const onChangeRegister = (ev) => {
    setNewUser({
        ...newUser,
        [ev.target.name]: ev.target.value,
    });
  }

  const toggleLogin = () => {
    setLogin(true);
    setRegister(false);
  }

  const toggleRegister = () => {
    setLogin(false);
    setRegister(true);
  }

  const loginSubmitHandler = (ev) => {
    ev.preventDefault();
    attemptLogin(credentials);
  }

  const registerSubmitHandler = (ev) => {
    ev.preventDefault();
    attemptRegistration(credentials);
    setNewUser({
      username: '',
      password: '',
    })
  };

  const { Formik } = formik;

  const loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required,
  })

  const registerSchema = yup.object().shape({
    username: yup.string().email("Invalid email").required('Required'),
    password: yup.string().required('Required'),
  });

  return (
    <Container>
        {this.props.auth.id ? (
          <Container className="mt-5">
            <h2 className="mb-3">Welcome {this.props.auth.username}!</h2>
            <Button onClick={this.props.logout}>Logout</Button>
          </Container>
        ) : (
          <Modal show={this.state.show}>
            <Modal.Header className="d-flex justify-content-center">
              {this.state.login ? (
                <div className="flex-column">
                  <Modal.Title className="text-center">Log In</Modal.Title>
                  <Button
                    className="text-decoration-none"
                    variant="link"
                    onClick={() => this.toggleRegister()}
                  >
                    or sign up
                  </Button>
                </div>
              ) : (
                <div className="flex-column justify-content-center">
                  <Modal.Title className="text-center">Sign Up</Modal.Title>
                  <span>
                    <Button
                      className="text-decoration-none"
                      variant="link"
                      onClick={() => this.toggleLogin()}
                    >
                      or log in
                    </Button>
                  </span>
                </div>
              )}
            </Modal.Header>

            {this.state.login ? (
              <Form onSubmit={login}>
                <Modal.Body>
                  <Form.Label
                    htmlFor="SignIn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <span className="mb-3"> Enter email and password.</span>
                  </Form.Label>
                  <FloatingLabel controlId="floatingUsername" label="Email">
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      value={credentials.username}
                      name="username"
                      onChange={onChange}
                    />
                    <br />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={credentials.password}
                      name="password"
                      onChange={onChange}
                      className="mb-3"
                    />
                  </FloatingLabel>
                </Modal.Body>
                <Modal.Footer className="d-flex">
                  <Button
                    onClick={() => this.props.router.navigate(-1)}
                    title="Go Back"
                  >
                    <i className="bi bi-arrow-left h4"></i>
                  </Button>
                  <Button type="submit" title="Sign Up" className="h4">
                    Log In
                  </Button>
                </Modal.Footer>
              </Form>
            ) : (
              <Form onSubmit={(e) => this.register(e)}>
                <Modal.Body>
                  <Form.Label
                    htmlFor="SignUp"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <span className="mb-3"> Enter email and password.</span>
                  </Form.Label>
                  <FloatingLabel controlId="floatingUsername" label="Email">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="username"
                      value={newUser.username}
                      onChange={this.onChangeRegister}
                    />
                    <br />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={newUser.password}
                      onChange={this.onChangeRegister}
                      className="mb-3"
                    />
                  </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => this.props.router.navigate(-1)}
                    title="Go Back"
                  >
                    <i className="bi bi-arrow-left h4"></i>
                  </Button>
                  <Button
                    onClick={(e) => this.register(e)}
                    type="submit"
                    title="Sign Up"
                    className="h4"
                  >
                    Sign Up
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Modal>
        )}
    </Container>
  ) 
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials)),
    logout: () => dispatch(logout()),
    attemptRegistration: (user) => dispatch(attemptRegistration(user)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
