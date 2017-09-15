import React, { Component } from 'react'
import { render } from 'react-dom'
import CounterComp from '../../../common/h5-ui/counter-comp-mix.jsx'

/*class Child extends Component {
    constructor (props) {
        super(props)
        this.exap = null
        this.element = ''
    }
    componentWillMount () {
        this.exap = new CounterComp({
            initVal: 1,
            addOnCall: this.addOnCall,
            redOnCall: this.redOnCall
        })
        this.element = this.exap.useReact()
    }
    componentWillUpdate (nextProps, nextState) {
        console.log('childNextProps:', nextProps, 'childNextState:', nextState)
    }
    addOnCall (val) {
        console.log('React child-middle add-on-call:' + val)
    }
    redOnCall (val) {
        console.log('React child-middle red-on-call:' + val)
    }
    render () {
        console.log('c update')
        return (
            <div>{this.element}</div>
        )
    }
}*/

class Main extends Component {
    constructor (props) {
        super(props)
        this.exap = null
        this.parentNum = 0
        this.element = ''
        this.state = {
            parentVal: 0
        }
    }
    componentWillMount () {
        this.exap = new CounterComp({
            initVal: 1,
            addOnCall: this.addOnCall,
            redOnCall: this.redOnCall
        })
        this.element = this.exap.useReact()
    }
    componentDidMount () {
        // _counterreact.test().call(this.element)
    }
    addOnCall (val) {
        console.log('React parent add-on-call:' + val)
    }
    redOnCall (val) {
        console.log('React parent red-on-call:' + val)
    }
    getVal () {
        console.log('React实例里面的值:' + this.exap.getVal())
    }
    onChange (e) {
        this.parentNum = Number(e.target.value)
    }
    submit () {
        const val = this.exap.changeVal(this.parentNum)
        // this.element.forceUpdate()
        console.log('this.element:', this.element)
        /*this.setState({
            parentVal: val
        })*/
       /* this.element.setState({
            value: this.exap.getVal()
        })*/
    }
    render () {
        console.log('parent update:', this.element)
        return (
            <div>
               <p>The element below is react component</p>
                {this.element}
                {/*<Child val={this.state.parentVal} />*/}
                <button className={'getval'} style={{display: 'block'}} onClick={(e) => this.getVal(e)}>获取reactapp实例里面的值</button>
                <input type="text" className={'changeinput'} placeholder="从父组件改变子组件的值" onChange={(e) => this.onChange(e)} /><button className={'changeval'} onClick={(e) => this.submit(e)}>提交</button>
            </div>
        )
    }
}

function reactRender () {
    render(
        <Main />,
        document.getElementById('reactapp')
    )
}

export default reactRender