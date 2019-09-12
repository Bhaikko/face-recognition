import React from 'react';

// import './Rank.css'

const Rank = (props) => {
    return (
        <div>
            <div className="white f3">
                {`${props.user.name}, your current entries are...`}
            </div>
            <div className="white f3">
                {`${props.user.entries}`}
            </div>
        </div>
    )
}

export default Rank;