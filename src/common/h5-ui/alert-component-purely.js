var toStyleString = require('to-style').string
import inheritPrototype from '../../utils/parasitic-inheritance'

function AlertSuper (options) {
    this.styleObj = {
        acStyle: {
            width: '320px',
            height: '200px',
            backgroundColor: '#eeeeee',
            textAlign: 'center',
            position: 'relative'
        },
        actitleStyle: {
            textAlign: 'center',
            color: '#333333',
            fontSize: '16px',
            width: '100%'
        },
        btnContentStyle: {
            position: 'absolute',
            width: '100%',
            bottom: '0'
        },
        clearStyle: {
            clear: 'both'
        },
        sureBtnStyle: {
            width: '50%',
            textAlign: 'center',
            color: '#333333',
            fontSize: '16px',
            float: 'left'
        },
        cancelBtnStyle: {
            width: '50%',
            textAlign: 'center',
            color: '#333333',
            fontSize: '16px',
            float: 'right'
        }
    }
    this.options = options
}

AlertSuper.prototype.createEle = function () {
    const template = `
        <div class="alert-container" id="common-alert-container" style="${toStyleString(this.styleObj.acStyle)}">
            <div class="text-title" style="${toStyleString(this.styleObj.actitleStyle)}">
                ${this.options ? this.options.text ? `<h4>${this.options.text}</h4>` : `<h4>温馨提示</h4>` : `<h4>温馨提示</h4>`}
            </div>
            <div class="content">
                ${this.options ? this.options.content ? this.options.content : '你好' : '你好'}
            </div>
            <div><input type="text" id="common-alert-input" class="common-alert-input" placeholder="请输入你的问题" /></div>
            <div class="btn-content" style="${toStyleString(this.styleObj.btnContentStyle)}">
                <button class="sure-btn" id="sure-btn" style="${toStyleString(this.styleObj.sureBtnStyle)}">Sure</button>
                <button class="cancel-btn" id="cancel-btn" style="${toStyleString(this.styleObj.cancelBtnStyle)}">Cancel</button>
                <div class="clear" style="${toStyleString(this.styleObj.clearStyle)}"></div>
            </div>
        </div>
    `
    return template
}

AlertSuper.prototype.render = function () {
    var template = this.createEle()
    if (this.options.innerHTML) {
        this.options && this.options.rootId ? document.getElementById(this.options.rootId).innerHTML = template : document.body.innerHTML = template
        _regDomListener(this)
    }
    return this
}

AlertSuper.prototype.changeContent = function (contentText) {
    this.options.content = contentText
    return this
}

AlertSuper.prototype.getValue = function () {
    var val = this.options.inputValue ? this.options.inputValue : ''
    return val
}

function _regDomListener (that) {
    that.handleEvent = function (event) {
        // Event commission
        switch (event.type) {
            case 'click':
                var e = event || window.event
                var target = e.target || e.srcElement
                _funDistribution(target.id, that)
                break
            case 'keyup':
                var e = event || window.event
                var target = e.target || e.srcElement
                that.options.inputValue = target.value
                break
            default:
                break
        }
    }
    var element = ''
    that.options && that.options.rootId ? element = document.getElementById(that.options.rootId) : element = document.body
    element.addEventListener('click', that, false)
    element.addEventListener('keyup', that, false)
}

function _funDistribution (id, that) {
    var val = that.options.inputValue ? that.options.inputValue : ''
    var fn1 = that.options.sureCallback ? that.options.sureCallback : function () {}
    var fn2 = that.options.cancelCallback ? that.options.cancelCallback : function () {}
    switch (id) {
        case 'sure-btn':
            fn1(val)
            break
        case 'cancel-btn':
            fn2(val)
            break
        default:
            break
    }
    return val
}

function AlertSub (options) {
    /** @param {Object} options
     * @param {Object} options.styleCustom - Style object
     * @param {String} options.rootId - RootId insert
     * @param {Bealoon} options.innerHTML - Whether insert in document
     * @param {String} options.text - Title of component
     * @param {String} options.content - Content of component
     */
    AlertSuper.call(this, options)
}

inheritPrototype(AlertSub, AlertSuper)

export default AlertSub