import React from 'react';

const Card = () => {
    return(
        <div className="card text-white bg-primary mb-3 mt-5"
            style={{
                "width": "10rem",
                "border-radius": "0.50rem",
            }}
        >
            <div className="card-body">
                 <h5 className="card-title text-left"> DEL </h5>
                 <p className="card-text text-center"
                    style={{
                        "font-size": "2em",
                        "font-weight": "lighter",
                    }}
                 > 
                    916
                </p>
            </div>
        </div>
    )
};

export default Card;
