import AlertSub from '../../../common/h5-ui/alert-component-purely'
const tem = new AlertSub({
    text: '初始化标题',
    content: '初始化内容',
    sureInnerHTML: true,
    rootId: 'app',
    ownMarkString: 'myown',
    styleCustom: {
        acStyle: {
            backgroundColor: 'red'
        }
    },
    onSureFun: outSureCallback,
    onCancelFun: outCancelCallback
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
