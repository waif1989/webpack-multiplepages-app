/**
 * Created by chensiwei on 2017/7/27.
 */
import AlertComponent from '../../../common/h5-ui/alert-component.jsx'
const alertBox = new AlertComponent({
    styleCustom: {
        acStyle: {
            backgroundColor: 'red'
        }
    },
    text: '这是自定义的文案1'
})

document.getElementById('app').innerHTML = alertBox.render()
document.getElementById('sureBtn').addEventListener('click', () => {
    alert('sureBtn')
})
document.getElementById('cancelBtn').addEventListener('click', () => {
    alert('cancelBtn')
})