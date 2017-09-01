import AlertSub from '../../../common/h5-ui/alert-component-purely'
const tem = new AlertSub({
    text: '初始化标题',
    content: '初始化内容',
    innerHTML: true,
    rootId: 'app',
    sureCallback: outSureCallback,
    cancelCallback: outCancelCallback
})
tem.render()

document.getElementById('change').addEventListener('click', () => {
    tem.changeContent('改变内容')
})

function outSureCallback (val) {
    console.log('outsideSure-------' + val)
}

function outCancelCallback (val) {
    console.log('outsideCancel-------' + val)
}
