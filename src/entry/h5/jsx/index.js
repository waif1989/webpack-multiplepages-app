/**
 * Created by chensiwei on 2017/7/27.
 */

import header from '../../../common/h5-ui/header'
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
document.getElementById('app').innerHTML = h
document.getElementById('text').addEventListener('click', () => {
    alert('998')
})
// console.log('-----***', header())