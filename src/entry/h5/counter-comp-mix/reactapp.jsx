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
    shouldComponentUpdate (nextProps, nextState) {
        this.exap.changeVal(Number(nextState.parentVal))
        const val = this.exap.getValue()
            this.exap.getInstances.setState({
            value: val
        })
        return false
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
        this.setState({
            parentVal: this.parentNum
        })
    }
    render () {
        console.log('parent update:')
        return (
            <div>
               <p>The element below is react component</p>
                {this.element}
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