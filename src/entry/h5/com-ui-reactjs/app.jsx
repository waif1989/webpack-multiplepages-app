import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactHtmlParser from 'react-html-parser'
import AlertComponent from '../../../common/h5-ui/alert-component-purely'

class DynamicAlert extends React.Component {
    sureBtnFun () {
        alert('999')
    }
    newTemplate () {
        const alertBox = new AlertComponent({
            text: '动态注册标题',
            content: '动态注册内容',
            styleCustom: {
                acStyle: {
                    backgroundColor: 'gray'
                }
            }
        })
         return alertBox.createEle()
    }
    render () {
        const html = this.newTemplate()
        const that = this
        const tem = ReactHtmlParser(html, {
            decodeEntities: true,
            transform (node, index) {
                if (!node.attribs) return
                if (!node.attribs['data-btnname']) return
                console.log(node.attribs['data-btnname'])
                if (node.attribs['data-btnname'] === 'sure-btn') return <button key="0" onClick={(e) => that.sureBtnFun(e)}>Sure</button>
            }
        })
        console.log('--------', tem)
        return <div>{ tem }</div>
    }
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
                <div id="header">
                    <DynamicAlert />
                </div>
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