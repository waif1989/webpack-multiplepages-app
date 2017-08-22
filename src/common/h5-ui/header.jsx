import React, { Component } from 'react'
import { render } from 'react-dom'
import jsxToString from 'jsx-to-string'
import reactElementToJSXString from 'react-element-to-jsx-string'

class Header extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div>
                This is JSX Header
            </div>
        )
    }
}

/*import React from 'react'
import jsxToString from 'jsx-to-string'

let Basic = React.createClass({
    render() {
        return (
            <div />
        );
    }
})*/

function header () {
    // jsxToString(<Basic test1="test" />)
    // return 'llk'
    render(
        <Header/>,
        document.getElementById('app')
    )
    return reactElementToJSXString(<Header/>)
}

// module.exports = { header }
export default header