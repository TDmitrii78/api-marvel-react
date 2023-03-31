import imgError from "./error.gif";

import "./error.css";

const Error = () => {
    return (
        <div className="divError">
            <img src={imgError} alt="Error pic"/>
        </div>
    )
}

export default Error;