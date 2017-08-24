/**
 * Created by chensiwei on 2017/7/27.
 */
import './index.css'
import $ from 'jquery'
import header from '../../../common/h5-ui/header.jsx'
const h = header({
    reactRender: false,
    styleCustom: {
        d1Style: {
            fontSize: '30px',
            backgroundColor: 'yellow'
        }
    },
    componProps: {
        initProps: 1
    }
})

$('#parent').append(h)
$('#parent').on('click', '.test-class', () => {
    alert('test-class')
})
$('#app #click').on('click', () => {
    alert('123')
})
console.log('pageH5-3')