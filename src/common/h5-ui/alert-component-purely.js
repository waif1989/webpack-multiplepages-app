var toStyleString = require('to-style').string

function inheritObject (o) {
    function F () {}
    F.prototype = o
    return new F()
}

function inheritPrototype (SubClass, SuperClass) {
    var p = inheritObject(SuperClass.prototype)
    p.constructor = SubClass
    SubClass.prototype = p
}

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
    /*this.onclick = function (event) {
        console.log(this.options.text); // 'Something Good', as |this| is bound to newly created object
    }
    this.valChange = function () {
        console.log('valChange')
    }
    this.options && this.options.rootId ? element = document.getElementById(this.options.rootId) : element = document.body
    element.addEventListener('click', this.onclick.bind(this), false)*/
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
                <button class="sure-btn" style="${toStyleString(this.styleObj.sureBtnStyle)}">Sure</button>
                <button class="cancel-btn" style="${toStyleString(this.styleObj.cancelBtnStyle)}">Cancel</button>
                <div class="clear" style="${toStyleString(this.styleObj.clearStyle)}"></div>
            </div>
        </div>
    `
    return template
}

AlertSuper.prototype.regDomListener = function () {
    this.handleEvent = function (event) {
        switch(event.type) {
            case 'click':
                var e = event || window.event;
                var target = e.target || e.srcElement; //兼容旧版本IE和现代浏览器
                console.log('-----', target.className)
                break;
            case 'dblclick':
                // some code here...
                break;
            default:
                break
        }
    }
/*    this.onclick = function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement; //兼容旧版本IE和现代浏览器
        console.log('-----', target.className)
        // console.log(this.options.text); // 'Something Good', as |this| is bound to newly created object
    }
    this.valChange = function () {
        console.log('valChange')
    }*/
    var element = ''
    this.options && this.options.rootId ? element = document.getElementById(this.options.rootId) : element = document.body
    element.addEventListener('click', this, false)
}

AlertSuper.prototype.render = function () {
    var template = this.createEle()
    if (this.options.innerHTML) {
        this.options && this.options.rootId ? document.getElementById(this.options.rootId).innerHTML = template : document.body.innerHTML = template
        this.regDomListener()
    }
    return this
}

AlertSuper.prototype.changeContent = function (contentText) {
    this.options.content = contentText
    return this
}

AlertSuper.prototype.getInputVal = function (val) {
    return val
}

// AlertSub.prototype = new AlertSuper()
inheritPrototype(AlertSub, AlertSuper)

export default AlertSub