import React, { Component } from 'react'
import { render } from 'react-dom'
import styletoobject from '../../../utils/style-to-object'
import ReactHtmlParser from 'react-html-parser'
import AlertComponent from '../../../common/h5-ui/alert-component-purely'

class DynamicAlert extends React.Component {
    constructor (props) {
        super(props)
        this.htmlString = ''
        this.state = {
            text: '这是子组件state属性文案'
        }
    }
    componentWillMount () {
        this.htmlString = this.newTemplate()
    }
    componentWillUpdate (nextProps, nextState) {
        console.log('childNextProps:', nextProps, 'childNextState:', nextState)
    }
    getInputValue (e) {
        this.setState({
            text: e.target.value
        })
    }
    sureBtnFun () {
        console.log('这是react子组件sure按钮抛出：' + this.state.text)
        this.props.sureBtnFun(this.state.text)
    }
    cancelBtnFun () {
        console.log('这是react子组件cancel按钮抛出：' + this.state.text)
        this.props.cancelBtnFun(this.state.text)
    }
    newTemplate () {
        const that = this
        const alertBox = new AlertComponent({
            // text: that.props.title || '动态注册标题',
            // content: that.props.content || '动态注册内容',
            styleCustom: {
                acStyle: {
                    backgroundColor: 'gray'
                }
            }
        })
         return alertBox.createEle()
    }
    render () {
        console.log('child update')
        const html = this.htmlString
        const that = this
        const tem = ReactHtmlParser(html, {
            decodeEntities: true,
            transform (node, index) {
                if (!node.attribs) return
                if (node.attribs['data-inputname'] === 'common-alert-input') {
                    return <input  key="a1" className={node.attribs.class} style={styletoobject(node.attribs.style)} type="text" onKeyUp={(e) => that.getInputValue(e)} placeholder={that.props.placeholder} />
                }
                if (node.attribs['data-alerttitle'] === 'alerttitle') {
                    return <div  key="a5" className={node.attribs.class} style={styletoobject(node.attribs.style)}>{that.props.title}</div>
                }
                if (node.attribs['data-alertcontent'] === 'alertcontent') {
                    return <div  key="a2" className={node.attribs.class} style={styletoobject(node.attribs.style)}>{that.state.text}</div>
                }
                if (node.attribs['data-btnname'] === 'sure-btn') {
                    return <button  key="a3" className={node.attribs.class} style={styletoobject(node.attribs.style)} onClick={(e) => that.sureBtnFun(e)}>Sure</button>
                }
                if (node.attribs['data-btnname'] === 'cancel-btn') {
                    return <button  key="a4" className={node.attribs.class} style={styletoobject(node.attribs.style)} onClick={(e) => that.cancelBtnFun(e)}>Cancel</button>
                }
            }
        })
        return <div>{ tem }</div>
    }
}

class Main extends Component {
    constructor (props) {
        super(props)
        this.state = {
            text: '这是父组件state属性文案，作为子组件的prop文案传入'
        }
    }
    sureFun (data) {
        console.log('这是react父组件sure按钮抛出：' + data)
    }
    cancelFun (data) {
        console.log('这是react父组件cancel按钮抛出：' + data)
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
    getInputValue (e) {
        this.setState({
            text: e.target.value
        })
    }
    componentDidMount () {

    }
    componentWillUpdate (nextProps, nextState) {
        console.log('parentNextProps:', nextProps, 'parentNextState:', nextState)
    }
    render () {
        console.log('parent update')
        return (
            <div>
                <p>These elements below is in the reactElement</p>
                <div id="header2" dangerouslySetInnerHTML = {{__html: this.staticInsert()}} />
                <br />
                <div id="header">
                    <DynamicAlert placeholder={'从父中设置静态props传入的placeholder'} title={this.state.text} sureBtnFun={(e) => this.sureFun(e)} cancelBtnFun={(e) => this.cancelFun(e)} />
                </div>
                <br />
                <input type="text" placeholder="父组件的输入框，输入便可以改变父state" onKeyUp={(e) => this.getInputValue(e)} />
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