import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import ReactHtmlParser from 'react-html-parser'
import inheritPrototype from '../../utils/parasitic-inheritance'
import { adaptToVueAttr } from '../../utils/dataattr-adapt-vue'
import regListener from '../../utils/reg-dom-listener'
const toStyleString = require('to-style').string

/**
 * Counter parent constructor.
 * @constructor
 */
function CounterSuper (options) {
    this.style = {
        container: {
            position: 'relative',
            display: 'block'
        },
        btn: {
            textAlign: 'center',
            fontSize: '16px',
            backgroundColor: '#eee',
            display: 'inline-block'
        },
        input: {
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingLeft: '6px',
            paddingRight: '6px',
            textAlign: 'center',
            display: 'inline-block'
        }
    }
    this.options = options
}

/**
 * Counter child constructor.
 * @constructor
 */
function CounterSub (options) {
    /* @param options {Object} */
    CounterSuper.call(this, options)
}

inheritPrototype(CounterSub, CounterSuper)

export default CounterSub

CounterSuper.prototype.createTem = function (doc) {
    if (this.options && doc) {
        this.options.doc = doc
        regListener.addEleList(doc, 'keyup', _keyup, this, false)
    }
    const template = `
        <div class="com-count-container" style="${toStyleString(this.style.container)}">
            <button class="com-count-add" data-countaddbtn="countaddbtn" data-on-click="add" style="${toStyleString(this.style.btn)}">+</button>
            <input class="com-count-input" data-countinput="countinput" data-v-model="countinput" style="${toStyleString(this.style.input)}" type="number" value="${this.options && this.options.initVal ? this.options.initVal : 0}">
            <button class="com-count-red" data-countredbtn="countredbtn" data-on-click="red" style="${toStyleString(this.style.btn)}">-</button>
        </div>
    `
    return template
}

CounterSuper.prototype.useReact = function () {
    const tem = this.createTem()
    return <CounterReact template={tem} context={this} />
}

CounterSuper.prototype.useVue = function () {
    const that = this
    const el = this.createTem()
    const tem = adaptToVueAttr(el)
    const vueComp = {
        props: ['parentVal'],
        template: tem,
        data () {
          return {
              countinput: that.options && typeof that.options.initVal === 'number' ? that.options.initVal : 0
          }
        },
        methods: {
            add () {
                that.add()
                const val = that.getVal()
                console.log('Vue child add-on-call:', val)
                this.$emit('addOnCall', val)
                this.countinput = val
            },
            red () {
                that.red()
                const val = that.getVal()
                console.log('Vue child red-on-call:', val)
                this.$emit('redOnCall', val)
                this.countinput = val
            }
        },
        watch: {
            parentVal () {
                this.countinput = this.parentVal
                that.changeVal(this.parentVal)
            }
        }
    }
    return vueComp
}

CounterSuper.prototype.add = function () {
    if (this.options && typeof this.options.initVal === 'number') {
        this.options.initVal += 1
    }
    if (this.options && this.options.addOnCall) {
        this.options.addOnCall(this.options.initVal)
    }
}

CounterSuper.prototype.red = function () {
    if (this.options && typeof this.options.initVal === 'number' && this.options.initVal > 0) {
        this.options.initVal -= 1
    }
    if (this.options && this.options.redOnCall) {
        this.options.redOnCall(this.options.initVal)
    }
}

CounterSuper.prototype.update = function () {
    if (this.options && this.options.doc) {
        const doc = this.options.doc
        const arr = doc.getElementsByTagName('*')
        const len = arr.length
        let targetNode = ''
        for (var i = 0; i < len; i++) {
            if (!!arr[i].dataset.countinput) {
                targetNode = arr[i]
                break
            }
        }
        targetNode.value = this.options.initVal
        return this.options.initVal
    }
}

CounterSuper.prototype.getVal = function () {
    return this.options.initVal
}

CounterSuper.prototype.changeVal = function (val) {
    this.options.initVal = Number(val)
    return this.options.initVal
}

class CounterReact extends Component {
    constructor (props) {
        super(props)
        this.htmlString = this.props.template
        this.options = this.props.context.options
        this.state = {
            value: this.options && typeof this.options.initVal === 'number' ? this.options.initVal : 0
        }
    }
    componentDidMount () {
        this.props.context.getInstances = this
    }
    addOnCall () {
        this.props.context.add()
        const val = this.props.context.getVal()
        console.log('React child add-on-call:' + val)
        this.setState({
            value: val
        })
    }
    redOnCall () {
        this.props.context.red()
        const val = this.props.context.getVal()
        console.log('React child red-on-call:' + val)
        if (this.state.value > 0) {
            this.setState({
                value: val
            })
        }
    }
    onChange (e) {
        const val = this.props.context.changeVal(Number(e.target.value))
        this.setState({
            value: val
        })
    }
    render () {
        console.log('child update:')
        const that = this
        const tem = ReactHtmlParser(this.htmlString, {
            decodeEntities: true,
            transform (node, index) {
                if (!node.attribs) return
                if (node.attribs['data-countaddbtn'] === 'countaddbtn') {
                    return <button key={'countaddbtn'} className={'com-count-add'} style={that.props.context.style.btn} onClick={(e) => that.addOnCall(e)}>+</button>
                }
                if (node.attribs['data-countredbtn'] === 'countredbtn') {
                    return <button key={'countredbtn'} className={'com-count-red'} style={that.props.context.style.btn} onClick={(e) => that.redOnCall(e)}>-</button>
                }
                if (node.attribs['data-countinput'] === 'countinput') {
                    return <input key={'countinput'} className={'com-count-input'} style={that.props.context.style.input} type="number" value={that.state.value} onChange={(e) => that.onChange(e)} />
                }
            }
        })
        return <div>{ tem }</div>
    }
}

function _keyup (event) {
    var e = event || window.event
    var target = e.target || e.srcElement
    this.options.initVal = target.value
}
