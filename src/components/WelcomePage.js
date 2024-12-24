import React from 'react';
import Logo from '../assets/images/logo.png';

function WelcomePage({ startCamera }) {
    return (
        <div className="page" id="welcome-page">
            <div id="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <h1> ! مرحبًا بك </h1>
            <h2>شقلبنا الطعم على كيفك</h2>
            <br/>
            <button id="start-btn" onClick={startCamera}>ابدأ</button>
        </div>
    );
}

export default WelcomePage;
