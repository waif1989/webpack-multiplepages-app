/**
 * Created by chensiwei on 2017/7/27.
 */
import './index.css'
import $ from 'jquery'

import AlertComponent from '../../../common/h5-ui/alert-component.jsx'
const alertBox = new AlertComponent({
    styleCustom: {
        acStyle: {
            backgroundColor: 'red'
        }
    },
    text: '这是自定义的文案1'
})


$('#app').append(alertBox.render())
$('#app').on('click', '#sureBtn', () => {
    alert('sureBtn')
})
$('#app').on('click', '#cancelBtn', () => {
    alert('cancelBtn')
})
console.log('JSX x Jquery')