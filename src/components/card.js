import React from 'react';
import '../stylesheets/card.css';

const Card = (props) => {
    return(
        <div className="card mb-5 mt-5 ml-2"
            style={{
                "width": "8rem",
                "border-radius": "0.50rem",
            }}
        >
            <div className="card-body">
                 <h5 className="card-title text-left">{props.type}</h5>
                 <p className="card-text text-center"
                    style={{
                        "font-size": "2em",
                        "font-weight": "lighter",
                    }}
                 > 
                    {props.num}
                </p>
            </div>
        </div>
    )
};

export default Card;
