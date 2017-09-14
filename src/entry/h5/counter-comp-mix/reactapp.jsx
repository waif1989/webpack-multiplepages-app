import React, { Component } from 'react'
import { render } from 'react-dom'
import CounterComp from '../../../common/h5-ui/counter-comp-mix.jsx'

class Main extends Component {
    constructor (props) {
        super(props)
        this.element = ''
    }
    componentWillMount () {
        const tem = new CounterComp()
        this.element = tem.useReact()
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