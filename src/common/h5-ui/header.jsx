import React, { Component } from 'react'
import { render, findDOMNode } from 'react-dom'
import ReactDOMServer from 'react-dom/server'


class Header extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount () {
        const el = findDOMNode(this)
        console.log('====', el.outerHTML)
    }
    render () {
        return (
            <div className="d1">
                <p className="text1">This is JSX Header</p>
            </div>
        )
    }
}

/*const Header = (
    <div className="d1">
        <p className="text1">heeel</p>
    </div>
)*/

function header () {
   /* render(
        <Header />,
        document.getElementById('app')
    )*/
    return ReactDOMServer.renderToString(<Header />)
}

export default header