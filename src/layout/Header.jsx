import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { getCategories } from '../services/categories';

export const AccountLoggedIn = () => {
    const { user, logout } = useAuth0();

    return (
        <div>
            <div className="d-flex flex-row align-items-center">
                <img src={user.picture} alt="" width="32px" height="32px" className="mr-2 rounded-circle" />
                <span className="mx-1">{user.name}</span>
                <span onClick={logout}>(Logout)</span>
            </div>
        </div>
    );
}

export const AccountLogout = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <div>
            <span className="btn btn-info" onClick={loginWithRedirect} >Login</span>
        </div>
    );
}

export const Header = () => {
    const { isAuthenticated } = useAuth0();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        
        const loadCategories = async () => {
            setCategories( await getCategories() );
            
        }

        loadCategories();
        
    }, []);

    return (
        
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">My Blog App</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active mr-3">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                {
                                    categories.map( (e) => {
                                        return (
                                                <li className="nav-item" key={e.id}>
                                                    <NavLink className="nav-link" activeClassName="active" to={`/categories/${e.id}`}>{e.name}</NavLink>
                                                </li>
                                            );
                                        } 
                                    )
                                }
                            </ul>

                            <div className="ms-auto">
                                <span className="navbar-text">
                                    {isAuthenticated ? <AccountLoggedIn /> : <AccountLogout />}
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        
    );
}