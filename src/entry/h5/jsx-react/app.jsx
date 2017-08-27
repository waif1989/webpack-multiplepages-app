import React, { Component } from 'react'
import { render } from 'react-dom'
import AlertComponent from '../../../common/h5-ui/alert-component.jsx'

function formatName (user) {
    return user.firstName + ' ' + user.lastName
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
}

class Main extends Component {
    constructor (props) {
        super(props)
        this.state = {
            text: '这是默认文案'
        }
    }
    sureFun (data) {
        alert('sure' + data)
    }
    cancelFun (data) {
        alert('cancel' + data)
    }
    staticInsert () {
        const alertBox = new AlertComponent({
            styleCustom: {
                acStyle: {
                    backgroundColor: 'red'
                }
            },
            text: '这是自定义的文案1'
        })
        return alertBox.render()
    }
    dynamicInsert (text) {
        const alertBox = new AlertComponent({
            reactRender: true,
            rootId: 'header',
            styleCustom: {
                acStyle: {
                    backgroundColor: 'grey'
                }
            },
            text: text
        })
        alertBox.render(this.sureFun.bind(this), this.cancelFun.bind(this))
    }
    changeTitle (e) {
        console.log(e.target.value)
        this.setState({
            text: e.target.value
        })
    }
    componentDidMount () {
        this.dynamicInsert(this.state.text)
        /*
        * If you don't use react render to render the dom, You should use these functions below:
        document.getElementById('sureBtn').addEventListener('click', () => {
            alert('sureBtn')
        })
        document.getElementById('cancelBtn').addEventListener('click', () => {
            alert('cancelBtn')
        })
        * */
    }
    componentWillUpdate (nextProps, nextState) {
        console.log('nextProps', nextProps, 'nextState', nextState)
        this.dynamicInsert(nextState.text)
    }
    render () {
        return (
            <div>
                <div id="header2" dangerouslySetInnerHTML = {{__html: this.staticInsert()}} />
                <br />
                <div id="header"></div>
                <div><input type="text" onKeyUp={this.changeTitle.bind(this)} /></div>
                <div>Hello, { formatName(user) }!</div>
            </div>
        )
    }
}

function reactRender () {
    render(
        <Main />,
        document.getElementById('app')
    )
}

export default reactRender