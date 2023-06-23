import React, {useState} from 'react';

import {useHistory} from 'react-router-dom';

import {Spinner} from "react-bootstrap";
import './style.css';

import {MdAlternateEmail} from 'react-icons/md';
import {RiLockPasswordFill} from 'react-icons/ri';
import SammyDashboard from '../../Assets/img/sammy-dashboard.png';

import api from '../../Utils/ApiEndpoint';
import {useAuth} from "../../Utils/AuthContext";

function LoginPage() {

    const [loginInformation, setLoginInformation] = useState({
        email: '', password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const {login} = useAuth();
    const history = useHistory();

    const loginAction = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let response = await api.post('user/login', loginInformation);
            setIsLoading(false);
            login(response.data.token, response.data.dataUser);
            history.push('/');
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            setErrorMessage(error.response.data.message);
        }

    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginInformation({
            ...loginInformation, [name]: value,
        });
    };

    return (<div className="login-page-wrapper">
        <div className="login-page">
            <div className="row">
                <div className="login-form-wrapper col-6">
                    <h2>Selamat Datang Kembali</h2>
                    <p>Silahkan masuk untuk mengakses Dashboard trijaya</p>
                    <form action="" className="login-form text-center">
                        <div className="mb-3">
                            <div className="form-input-login d-flex align-items-center">
                                <MdAlternateEmail/>
                                <input
                                    value={loginInformation.email}
                                    name="email"
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="email@example"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-input-login d-flex align-items-center">
                                <RiLockPasswordFill/>
                                <input
                                    name="password"
                                    onChange={handleChange}
                                    value={loginInformation.password}
                                    type="password"
                                    placeholder="password"
                                />
                            </div>
                        </div>
                        {isError ? <div className="alert-section">
                            <h6 className="text-danger">{errorMessage}</h6>
                        </div> : <></>}
                        <div className="mb-3">
                            {isLoading ? <button
                                type="submit"
                                className="btn btn-login btn-disabled-custom"
                                onClick={(e) => loginAction(e)}
                                disabled
                            >
                                <Spinner animation="border" size="sm"/>
                            </button> : <button
                                type="submit"
                                className="btn btn-login"
                                onClick={(e) => loginAction(e)}
                            >
                                Login
                            </button>}
                        </div>
                    </form>
                </div>
                <div className="login-page-image-wrapper col-6">
                    <img src={SammyDashboard} alt=""/>
                </div>
            </div>
        </div>
        <div className="login-page-footer text-center w-100">
            <footer className="fs-7">Trijaya Dashboard V0.1 @ CopyRight</footer>
        </div>
    </div>);
}

export default LoginPage;
