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
            <button class="com-count-add" style="${toStyleString(this.style.btn)}">+</button>
            <input class="com-count-input" data-countinput="countinput" style="${toStyleString(this.style.input)}" type="number" value="${this.options && this.options.initVal ? this.options.initVal : 0}">
            <button class="com-count-red" style="${toStyleString(this.style.btn)}">-</button>
        </div>
    `
    return template
}

CounterSuper.prototype.useReact = function () {
    return <CounterReact />
}

CounterSuper.prototype.useVue = function () {
    const el = this.createTem()
    const tem = adaptToVueAttr(el)
    const vueComp = {
        template: tem
    }
    return vueComp
}

CounterSuper.prototype.add = function () {
    if (this.options && this.options.initVal) {
        this.options.initVal += 1
    }
    if (this.options && this.options.addOnCall) {
        this.options.addOnCall(this.options.initVal)
    }
}

CounterSuper.prototype.red = function () {
    if (this.options && this.options.initVal && this.options.initVal > 0) {
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
    }
}

CounterSuper.prototype.getVal = function () {
    return this.options.initVal
}

class CounterReact extends Component {
    constructor (props) {
        super(props)
        this.htmlString = ''
    }
    componentWillMount () {
        this.htmlString = this.newTemplate()
    }
    newTemplate () {
        const template = new CounterSub()
        return template.createTem()
    }
    render () {
        const tem = ReactHtmlParser(this.htmlString, {
            decodeEntities: true,
            transform (node, index) {

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