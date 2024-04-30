import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faClipboardList, faHeart } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';

const User: React.FC = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        localStorage.removeItem('isLoggedIn');
        navigate("/");
    };

    return (
        <div className="user-page-container">
            <div className="header">
                <div className="date-time">
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                </div>
                <div className="profile">
                    <FontAwesomeIcon icon={faUser} className="profile-icon" />
                    <div className="user-details">
                        <h2>User Name</h2>
                        <p>User Email</p>
                    </div>
                </div>
            </div>
            <div className="functions">
                <h2>Functions:</h2>
                <ul>
                    <li><button className="function-btn"><FontAwesomeIcon icon={faUser} /> View Profile</button></li>
                    <li><button className="function-btn"><FontAwesomeIcon icon={faCog} /> Edit Profile</button></li>
                    <li><button className="function-btn"><FontAwesomeIcon icon={faClipboardList} /> View Orders</button></li>
                    <li><button className="function-btn"><FontAwesomeIcon icon={faHeart} /> View Wishlist</button></li>
                    <li><button className="logout-btn" onClick={handleLogout}><FontAwesomeIcon icon={faUser} /> Logout</button></li>
                </ul>
            </div>
            <div className="calendar">
                <h2>Calendar</h2>
                <Calendar />
            </div>
        </div>
    );
}

export default User;
