import alertSub from '../../../common/h5-ui/alert-component-purely'
const tem = new alertSub({
    text: '初始化标题',
    content: '初始化内容',
    innerHTML: true,
    rootId: 'app'
})
tem.render()

document.getElementById('change').addEventListener('click', () => {
    tem.changeContent('改变内容').render()
})
