import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Loader from '../../loader';
import { GetUserLogin } from '../../services';

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleChangeUser = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoaded(true);
        let data = { email: email, password: password };
        let user = await GetUserLogin.getUserLogin(data);
        if (user) {
            GetUserLogin.authenticate(user, () => {
                setRedirectToReferrer(true);
                setIsLoaded(false);
                window.location.reload();
            })
        } else {
            setIsLoaded(false);
            NotificationManager.error("Please! Check Username & Password", "Input Field");
        }
    }

    if (redirectToReferrer || localStorage.getItem('token')) {
        return (<Redirect to={'/admin'} />)
    }

    return (
        <div className="bg-sign">
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            {isLoaded ? <Loader /> : ''}
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header card-sign-header">
                                            <h3 className="text-center font-weight-light my-4">Login</h3>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="inputEmailAddress">Email*</label>
                                                    <input className="form-control py-3" id="inputEmailAddress" type="email" placeholder="Enter email address" name="email" value={email} onChange={handleChangeUser} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="inputPassword">Password*</label>
                                                    <input className="form-control py-3" id="inputPassword" type="password" placeholder="Enter password" name="password" value={password} onChange={handleChangeUser} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox">
                                                        <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                                        <label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember password</label>
                                                    </div>
                                                </div>
                                                <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0" onClick={handleSubmit}>
                                                    <a className="btn btn-sign hover-btn">Login</a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Signin;
