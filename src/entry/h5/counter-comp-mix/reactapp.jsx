import React, { Component } from 'react'
import { render } from 'react-dom'
import CounterComp from '../../../common/h5-ui/counter-comp-mix.jsx'

class Main extends Component {
    constructor (props) {
        super(props)
        this.element = ''
    }
    componentWillMount () {
        const tem = new CounterComp({
            initVal: 1,
            addOnCall: this.addOnCall,
            redOnCall: this.redOnCall
        })
        this.element = tem.useReact()
    }
    addOnCall () {
        console.log('React add-on-call:')
    }
    redOnCall () {
        console.log('React red-on-call:')
    }
    render () {
        return (
            <div>
               <p>The element below is react component</p>
                {this.element}
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