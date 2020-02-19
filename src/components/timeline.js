import React from 'react'
import '../stylesheets/timeline.css';

const Timeline = (props) => (
        <ul className="timeline">
            <li className="timeline-item">
                <span>{props.scanStat}</span>
                <span>{props.scanDate}</span>
                <span>{props.scanTime}</span>
            </li>                
        </ul>
)

export default Timeline;
