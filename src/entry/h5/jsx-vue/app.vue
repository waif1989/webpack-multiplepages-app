<template>
    <div>
        <div id="vueInside" class="d1">{{msg}}</div>
        <img :src="imgUrl2" alt="Test import image">
        <img src="~assets/img/big-img.png" alt="Test relative path">
        <img src="~assets/img/none.png" alt="Test base64">
        <div v-html="alertBox"></div>
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
    import AlertComponent from '../../../common/h5-ui/alert-component.jsx'
    const alertBox = new AlertComponent({
        styleCustom: {
            acStyle: {
                backgroundColor: 'grey'
            }
        },
        text: '这是组件里面注入'
    })
    export default {
        data () {
            return {
                msg: 'This is Vue',
                imgUrl2: Img2,
                text: '这是组件里面动态绑定',
                alertBox: alertBox.render()
            }
        },
        methods: {
          controlTemplate (text) {
              const alertBox = new AlertComponent({
                  styleCustom: {
                      acStyle: {
                          backgroundColor: 'yellow'
                      }
                  },
                  text: text
              })
              return alertBox.render()
          }
        },
        components: {
        }
    }
</script>