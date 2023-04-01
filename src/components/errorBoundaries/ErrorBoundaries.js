import { Component } from "react";

class ErrorBoundaries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }

    componentDidCatch(error, info) {
        this.setState({error: true});
    }

    render() {
        if (this.state.error) {
            return (
                <h2> Error! </h2>
            )  
        }  
        return this.props.children;
    }

}

export default ErrorBoundaries