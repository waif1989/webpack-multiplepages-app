import React, { Component } from 'react'
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
    let privateNum = options && typeof options.initVal === 'number' ? options.initVal : 0
    this._getValue = function () {
        return privateNum
    }
    this._setValue = function (val) {
        privateNum = val
    }
    CounterSuper.call(this, options)
}

inheritPrototype(CounterSub, CounterSuper)

export default CounterSub

CounterSuper.prototype.createTem = function (doc) {
    const num = this._getValue()
    if (this.options && doc) {
        this.options.doc = doc
        regListener.addEleList(doc, 'keyup', _keyup, this, false)
    }
    const template = `
        <div class="com-count-container" style="${toStyleString(this.style.container)}">
            <button class="com-count-add" data-countaddbtn="countaddbtn" data-on-click="add" style="${toStyleString(this.style.btn)}">+</button>
            <input class="com-count-input" data-countinput="countinput" data-v-model="countinput" style="${toStyleString(this.style.input)}" type="number" value="${num}">
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
    const num = this._getValue()
    const that = this
    const el = this.createTem()
    const tem = adaptToVueAttr(el)
    const vueComp = {
        template: tem,
        data () {
          return {
              countinput: num
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
            },
            changeVal (val) {
                const value = Number(val)
                this.countinput = value
                that.changeVal(value)
            },
            getVal () {
                return that.getVal()
            }
        }
    }
    return vueComp
}

CounterSuper.prototype.add = function () {
    let num = this._getValue()
    num += 1
    this._setValue(num)
    if (this.options && this.options.addOnCall) {
        this.options.addOnCall(this._getValue())
    }
}

CounterSuper.prototype.red = function () {
    let num = this._getValue()
    if (num > 0) {
        num -= 1
        this._setValue(num)
        if (this.options && this.options.addOnCall) {
            this.options.addOnCall(this._getValue())
        }
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
        targetNode.value = this._getValue()
    }
}

CounterSuper.prototype.getVal = function () {
    return this._getValue()
}

CounterSuper.prototype.changeVal = function (val) {
    this._setValue(Number(val))
}

class CounterReact extends Component {
    constructor (props) {
        super(props)
        const num = this.props.context._getValue()
        this.htmlString = this.props.template
        this.options = this.props.context.options
        this.state = {
            value: num
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
    this._setValue(target.value)
}
