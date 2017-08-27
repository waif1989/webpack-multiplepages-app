<template>
    <div>
        <div id="vueInside" class="d1">{{msg}}</div>
        <img :src="imgUrl2" alt="Test import image">
        <img src="~assets/img/big-img.png" alt="Test relative path">
        <img src="~assets/img/none.png" alt="Test base64">
        <div v-html="alertBox"></div>
        <child></child>
        <div v-html="controlTemplate(text)"></div>
        <input type="text" v-model="text">
    </div>
</template>

<style lang="less" scoped>
    .d1 {
        color: gray;
    }
    .test-class {
        color: #fff;
    }
</style>

<script>
    import Img2 from '../../../assets/img/small-img.png'
    import { adaptToVueAttr } from '../../../utils/dataattr-adapt-vue'
    import AlertComponent from '../../../common/h5-ui/alert-component.jsx'
    const staticComponents = new AlertComponent({
        styleCustom: {
            acStyle: {
                backgroundColor: 'grey'
            }
        },
        text: '这是组件内部静态注入'
    })
    const staticHtmlString = staticComponents.render()
    const dynamicComponents = new AlertComponent({
        styleCustom: {
            acStyle: {
                backgroundColor: 'yellow'
            }
        },
        text: '这是组件里内部动态注入'
    })
    const dynamicHtmlString = dynamicComponents.render()
    const vueTemplateString = adaptToVueAttr(dynamicHtmlString)
    const childComponents = {
        template: vueTemplateString,
        data () {
            return {
                alertmessage: 'alertmessageInVue'
            }
        },
        methods: {
            sureBtn () {
                alert('Vue sure Btn &&' + this.alertmessage)
            },
            cancelBtn () {
                alert('Vue cancel Btn &&' + this.alertmessage)
            }
        }
    }
    export default {
        data () {
            return {
                msg: 'This is Vue',
                imgUrl2: Img2,
                text: '这是动态绑定父组件数据+组件内部静态注入',
                alertBox: staticHtmlString
            }
        },
        methods: {
          controlTemplate (text) {
              const alertBox = new AlertComponent({
                  styleCustom: {
                      acStyle: {
                          backgroundColor: 'orange'
                      }
                  },
                  text: text
              })
              const html = alertBox.render()
              const htmlVue = adaptToVueAttr(html)
              return htmlVue
          }
        },
        components: {
            'child': childComponents
        },
        created () {

        }
    }
</script>