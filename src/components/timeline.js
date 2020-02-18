import React from 'react'
import '../stylesheets/timeline.css';

const Timeline = (props) => (
        <div className="timeline">
            <div className="timeline-item">
                <span>{props.scanStat}</span>
                <span>{props.scanDate}</span>
                <span>{props.scanTime}</span>
            </div>                
        </div>
)

export default Timeline;
