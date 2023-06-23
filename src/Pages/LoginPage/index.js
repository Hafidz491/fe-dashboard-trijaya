import React, {useState} from 'react';

import './style.css';

import {MdAlternateEmail} from 'react-icons/md';
import {RiLockPasswordFill} from 'react-icons/ri';
import SammyDashboard from '../../Assets/img/sammy-dashboard.png';

import api from '../../Utils/ApiEndpoint';

function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [loginInformation, setLoginInformation] = useState({
        email: '', password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const loginAction = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let response = await api.post('user/login', loginInformation);
            setIsLoading(false);
            console.log(response.status);
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            console.log(error.status);
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
                        <div className="alert-section">
                            <h6 className="text-danger">Salah Username atau Password</h6>
                        </div>
                        <div className="mb-3">
                            <button
                                type="submit"
                                className="btn btn-login"
                                onClick={(e) => loginAction(e)}
                            >
                                Login
                                {/* <Spinner animation="border" /> */}
                            </button>
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
