/**
 * Created by chensiwei on 2017/7/27.
 */
import $ from 'jquery'
$.ajax({
    type: 'GET',
    url: '/proxyajax/nhd/api/goods/recommend'
}).done((data) => {
    console.log(data)
})
console.log('page1')