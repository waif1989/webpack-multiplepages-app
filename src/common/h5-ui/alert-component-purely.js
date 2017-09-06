var toStyleString = require('to-style').string
var inheritPrototype = require('../../utils/parasitic-inheritance')

/**
 * Generic alert product.
 * @constructor
 */
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

/**
 * Create alert component element.
 * @abstract
 * @return {string}
 */
AlertSuper.prototype.createEle = function () {
    var template =
     `
        <div class="common-alert-container" 
             style="${toStyleString(_mergeStyle(this.styleObj.acStyle, this.options.styleCustom ? this.options.styleCustom.acStyle ? this.options.styleCustom.acStyle : {} : {}))}">
            <div class="text-title" style="${toStyleString(this.styleObj.actitleStyle)}">
                ${this.options ? this.options.text ? `<h4>${this.options.text}</h4>` : `<h4>温馨提示</h4>` : `<h4>温馨提示</h4>`}
            </div>
            <div class="common-content" data-alertcontent="common-content">
                ${this.options ? this.options.content ? this.options.content : '你好' : '你好'}
            </div>
            <div><input type="text" class="common-alert-input" data-inputname="common-alert-input" placeholder="请输入你的问题" /></div>
            <div class="btn-content" style="${toStyleString(this.styleObj.btnContentStyle)}">
                <button class="sure-btn" id="sure-btn" style="${toStyleString(this.styleObj.sureBtnStyle)}">Sure</button>
                <button class="cancel-btn" id="cancel-btn" style="${toStyleString(this.styleObj.cancelBtnStyle)}">Cancel</button>
                <div class="clear" style="${toStyleString(this.styleObj.clearStyle)}"></div>
            </div>
        </div>
    `
    return template
}

/**
 * Insert html string into element.
 * @abstract
 * @return {object}
 */
AlertSuper.prototype.render = function () {
    var template = this.createEle()
    if (this.options.sureInnerHTML) {
        this.options && this.options.rootId ? document.getElementById(this.options.rootId).innerHTML = template : document.body.innerHTML = template
        _regDomListener(this)
    }
    return this
}

/**
 * Change alert component content.
 * @abstract
 * @return {object}
 */
AlertSuper.prototype.changeContent = function (contentText) {
    var appId = this.options.rootId ? document.getElementById(this.options.rootId) : document.body
    var arr = appId.getElementsByTagName("*")
    var len = arr.length
    var targetNode = ''
    for (var i = 0; i < len; i++) {
        if (!!arr[i].dataset.alertcontent) {
            targetNode = arr[i]
            break
        }
    }
    this.options.content = contentText
    targetNode.innerHTML = this.options.content
    return this
}

/**
 * Get val of alert component.
 * @abstract
 * @return {string}
 */
AlertSuper.prototype.getValue = function () {
    var val = this.options.inputValue ? this.options.inputValue : ''
    return val
}

/**
 * Registered dom listener.
 *
 * @return {string}
 */
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
                _changeValue(target.value, that)
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

/**
 * Distribute dom events.
 *
 * @return {string}
 */
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

/**
 * Change input value.
 *
 * @return {string}
 */
function _changeValue (val, that) {
    that.options.inputValue = val
    return that.options.inputValue
}

function _mergeStyle (defaultStyle, customStyle) {
 return Object.assign(defaultStyle, customStyle)
}

/**
 * Generic alert component class.
 * @constructor
 */
function AlertSub (options) {
    /** @param {Object} options
     * @param {Object} options.styleCustom - Style object
     * @param {Object} options.styleCustom.acStyle - Style object
     * @param {String} options.rootId - RootId insert
     * @param {Bealoon} options.sureInnerHTML - Whether insert in document
     * @param {String} options.ownMarkString - Add a tag for all class attributes
     * @param {String} options.text - Title of component
     * @param {String} options.content - Content of component
     * @param {Function} options.sureCallback - Function of surebtn callback
     * @param {Function} options.cancelCallback - Function of cancelbtn callback
     */
    AlertSuper.call(this, options)
}

inheritPrototype(AlertSub, AlertSuper)

export default AlertSub