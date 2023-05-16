import React from "react"
const Notification = ({message, number}) => {
    if (number===0) 
        return null
    
    else if (number === 1)
        return (
        <div className="error">
            {message}
        </div>
    )
    else 
    return (
        <div className="notification">
            {message}
        </div>)
    
}

export default Notification