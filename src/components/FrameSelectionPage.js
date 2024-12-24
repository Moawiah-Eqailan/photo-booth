import React from 'react';
import frame1 from '../assets/images/frame1.png';
import frame2 from '../assets/images/frame2.png';
import frame3 from '../assets/images/frame3.png';
import frame4 from '../assets/images/frame4.png';
import frame5 from '../assets/images/frame5.png';

function FrameSelectionPage({ selectFrame, imagePath }) {
    return (
        <div className="page" id="frame-selection-page">
            <h2>: اختر الإطار المفضل لديك</h2>
            <br/>
            <div className="frames">
                <img src={frame1} className="frame" onClick={() => selectFrame(1)} alt="Frame 1" />
                <img src={frame2} className="frame" onClick={() => selectFrame(2)} alt="Frame 2" />
                <img src={frame3} className="frame" onClick={() => selectFrame(3)} alt="Frame 3" />
                <img src={frame4} className="frame" onClick={() => selectFrame(4)} alt="Frame 4" />
                <img src={frame5} className="frame" onClick={() => selectFrame(5)} alt="Frame 5" />
            </div>

        </div>
    );
}

export default FrameSelectionPage;
