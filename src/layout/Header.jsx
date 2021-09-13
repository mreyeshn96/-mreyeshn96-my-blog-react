import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export const AccountLoggedIn = () => {
    const { user, logout } = useAuth0();

    return (
        <div>
            <div className="d-flex flex-row align-items-center">
                <img src={user.picture} alt="" width="32px" height="32px" className="mr-2 rounded-circle" />
                <span className="mx-1">{user.name}</span>
                <Link onClick={logout}>(Logout)</Link>
            </div>
        </div>
    );
}

export const AccountLogout = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <div>
            <Link className="btn btn-info" onClick={loginWithRedirect} >Login</Link>
        </div>
    );
}

export const Header = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <BrowserRouter>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a class="navbar-brand" href="#">My Blog App</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item active">
                                    <Link class="nav-link" href="#">Home</Link>
                                </li>

                            </ul>

                            <div className="ms-auto">
                                <span class="navbar-text">
                                    {isAuthenticated ? <AccountLoggedIn /> : <AccountLogout />}
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </BrowserRouter>
    );
}