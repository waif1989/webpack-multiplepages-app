import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactDOMServer from 'react-dom/server'

let text1Style = {
    color: 'blue'
}
let text2Style = {
    color: 'red'
}

let d1Style = {
    width: '200px',
    height: '200px',
    backgroundColor: '#EEE'
}

let initProps = 4

class Header extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount () {
        // console.log('--------//', this.props.someProperty)
    }
    render () {
        return (
            <div className="d1" id="d1" style={d1Style}>
                {this.props.someProperty > 1 ? <p style={text1Style} id="text">text1</p> : <p style={text2Style} id="text">text2</p>}
            </div>
        )
    }
}

function header (options /* @param options {Object} */) {
    /* @param options
     * -- @property styleCustom {Object}
     * -- @property componProps {Object}
     * -- @property rootId {String}
     * -- @property reactRender {Boolean}
     * */
    if (!options) {
        return ReactDOMServer.renderToStaticMarkup(<Header someProperty={initProps} />)
    } else {
        if (options.styleCustom) {
            d1Style = options.styleCustom.d1Style ? Object.assign({}, d1Style, options.styleCustom.d1Style) : d1Style
            text1Style = options.styleCustom.text1Style ? Object.assign({}, text1Style, options.styleCustom.text1Style) : text1Style
            text2Style = options.styleCustom.text2Style ? Object.assign({}, text2Style, options.styleCustom.text2Style) : text2Style
        }
        if (options.componProps) {
            initProps = options.componProps.initProps ? options.componProps.initProps : initProps
        }
        if (options.reactRender) {
            render(
                <Header someProperty={initProps} />,
                options.rootId ? document.getElementById(options.rootId) : document.getElementById('app')
            )
        }
        return ReactDOMServer.renderToStaticMarkup(<Header someProperty={initProps} />)
    }
}


export default header