import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactDOMServer from 'react-dom/server'

class AlertBox extends Component {
    constructor (props) {
        super(props)
        this.state = {
            val: ''
        }
    }
    getInputValue (e) {
        this.state.val = e.target.value
    }
    sureBtnFun () {
        this.props.sureBtnFun(this.state.val)
    }
    cancelBtnFun () {
        this.props.cancelBtnFun(this.state.val)
    }
    render () {
        return (
            <div className="alert-container" style={this.props.styleObj.acStyle}>
                <div className="text-content" style={this.props.styleObj.actextStyle}>{this.props.text}</div>
                <div><input type="text" className="alert-input" onKeyUp={(e) => this.getInputValue(e)}/></div>
                <div className="btn-content" style={this.props.styleObj.btnContentStyle}>
                    <button className="sure-btn" id="sureBtn" style={this.props.styleObj.sureBtnStyle} onClick={(e) => this.sureBtnFun(e)}>Sure</button>
                    <button className="cancel-btn" id="cancelBtn" style={this.props.styleObj.cancelBtnStyle} onClick={(e) => this.cancelBtnFun(e)}>Cancel</button>
                </div>
                <div className="clear" style={this.props.styleObj.clearStyle}></div>
            </div>
        )
    }
}

function SuperAlert (options) {
    this.styleObj = {
        acStyle: {
            width: '320px',
            height: '200px',
            backgroundColor: '#eeeeee',
            textAlign: 'center',
            position: 'relative'
        },
        actextStyle: {
            textAlign: 'center',
            color: '#333333',
            fontSize: '16px',
            width: '100%'
        },
        btnContentStyle: {
            position: 'absolute',
            width: '100%',
            bottom: '0'
        },
        clearStyle: {
            clear: 'both'
        },
        sureBtnStyle: {
            width: '50%',
            textAlign: 'center',
            color: '#333333',
            fontSize: '16px',
            float: 'left'
        },
        cancelBtnStyle: {
            width: '50%',
            textAlign: 'center',
            color: '#333333',
            fontSize: '16px',
            float: 'right'
        }
    }
    this.options = options
}

function SubAlert (options /* @param options {Object} */) {
    /* @param options
    * -- @property styleCustom {Object}
    * -- @property text {String}
    * -- @property rootId {String}
    * -- @property reactRender {Boolean}
    * */
    SuperAlert.call(this, options)
}

SubAlert.prototype.render = function (fn1, fn2) {
    if (this.options && this.options.styleCustom) {
        this.styleObj.acStyle = this.options.styleCustom.acStyle ? Object.assign({}, this.styleObj.acStyle, this.options.styleCustom.acStyle) : this.styleObj.acStyle
    }
    if (this.options && this.options.reactRender) {
        render (
            <AlertBox text={this.options ? this.options.text ? this.options.text : '温馨提示' : '温馨提示'} styleObj={this.styleObj} sureBtnFun={fn1} cancelBtnFun={fn2} />,
            this.options && this.options.rootId ? document.getElementById(this.options.rootId) : document.getElementById('app')
        )
    }
    return ReactDOMServer.renderToStaticMarkup(<AlertBox text={this.options ? this.options.text ? this.options.text : '温馨提示' : '温馨提示'} styleObj={this.styleObj} />)
}

export default SubAlert