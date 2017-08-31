var toStyleString = require('to-style').string
function alertSuper (options) {
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

function alertSub (options) {
    alertSuper.call(this, options)
}

alertSuper.prototype.createEle = function () {
    const template = `
        <div class="alert-container" style="${toStyleString(this.styleObj.acStyle)}">
            <div class="text-title" style="${toStyleString(this.styleObj.actitleStyle)}">
                ${this.options ? this.options.text ? this.options.text : '温馨提示' : '温馨提示'}
            </div>
            <div class="content">
                ${this.options ? this.options.content ? this.options.content : '你好' : '你好'}
            </div>
            <div><input type="text" class="alert-input" /></div>
            <div class="btn-content" style="${toStyleString(this.styleObj.btnContentStyle)}">
                <button class="sure-btn" style="${toStyleString(this.styleObj.sureBtnStyle)}">Sure</button>
                <button class="cancel-btn" style="${toStyleString(this.styleObj.cancelBtnStyle)}">Cancel</button>
                <div class="clear" style="${toStyleString(this.styleObj.clearStyle)}"></div>
            </div>
        </div>
    `
    return template
}

alertSuper.prototype.render = function () {
    var template = this.createEle()
    if (this.options.innerHTML) {
        this.options && this.options.rootId ? document.getElementById(this.options.rootId).innerHTML = template : document.body.innerHTML = template
    }
    return this
}

alertSuper.prototype.changeContent = function (contentText) {
    this.options.content = contentText
    return this
}

alertSub.prototype = new alertSuper()

export default alertSub