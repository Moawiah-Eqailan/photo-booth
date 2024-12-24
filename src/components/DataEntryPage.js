import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DataEntryPage({ imagePath }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageBase64, setImageBase64] = useState('');
    
    const navigate = useNavigate();  

    const MAX_TEXT_LENGTH = 32767;

    const truncateText = (text) => {
        return text.length > MAX_TEXT_LENGTH ? text.substring(0, MAX_TEXT_LENGTH) : text;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!name || !email || !phone) {
            setError('جميع الحقول مطلوبة');
            setIsLoading(false);
            return;
        }

        const truncatedName = truncateText(name);
        const truncatedEmail = truncateText(email);
        const truncatedPhone = truncateText(phone);
        const truncatedImagePath = truncateText(imagePath);

        const userData = {
            name: truncatedName,
            email: truncatedEmail,
            phone: truncatedPhone,
            imagePath: truncatedImagePath,
            imageBase64: imageBase64,
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));

        setIsLoading(false);
        
        navigate('/show-qrcode'); 
    };

    return (
        <div className="page" id="data-entry-page">
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                
                <div className="form-group">
                    <label htmlFor="name">: الاسم</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control form-control-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">: البريد الإلكتروني</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">: رقم الهاتف</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control form-control-lg"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isLoading}
                >
                    {isLoading ? 'إرسال...' : 'إرسال'}
                </button>
            </form>
        </div>
    );
}

export default DataEntryPage;
