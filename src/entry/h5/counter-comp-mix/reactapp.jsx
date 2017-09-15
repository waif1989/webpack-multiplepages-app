import React, { Component } from 'react'
import { render } from 'react-dom'
import CounterComp from '../../../common/h5-ui/counter-comp-mix.jsx'

class Main extends Component {
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
    addOnCall (val) {
        console.log('React parent add-on-call:' + val)
    }
    redOnCall (val) {
        console.log('React parent red-on-call:' + val)
    }
    getVal () {
        console.log('React实例里面的值:')
    }
    render () {
        return (
            <div>
               <p>The element below is react component</p>
                {this.element}
                <button className={'getval'} style={{display: 'block'}} onClick={(e) => this.getVal(e)}>获取reactapp实例里面的值</button>
                <input type="text" className={'changeinput'} placeholder="从父组件改变子组件的值" /><button className={'changeval'}>提交</button>
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