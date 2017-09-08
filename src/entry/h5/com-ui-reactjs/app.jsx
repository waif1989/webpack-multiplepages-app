import React, { Component } from 'react'
import { render } from 'react-dom'
import AlertComponent from '../../../common/h5-ui/alert-component-purely'

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
            text: '初始化标题',
            content: '初始化内容',
            styleCustom: {
                acStyle: {
                    backgroundColor: 'red'
                }
            }
        })
        return alertBox.createEle()
    }
    dynamicInsert (text) {
        /*const alertBox = new AlertComponent({
            reactRender: true,
            rootId: 'header',
            styleCustom: {
                acStyle: {
                    backgroundColor: 'grey'
                }
            },
            text: text
        })
        alertBox.render(this.sureFun.bind(this), this.cancelFun.bind(this))*/
    }
    componentDidMount () {

    }
    componentWillUpdate (nextProps, nextState) {
        console.log('nextProps', nextProps, 'nextState', nextState)
    }
    render () {
        return (
            <div>
                <div id="header2" dangerouslySetInnerHTML = {{__html: this.staticInsert()}} />
                <br />
                <div id="header"></div>
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