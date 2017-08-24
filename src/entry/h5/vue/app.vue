<template>
    <div>
        <div id="vueInside" class="d1">{{msg}}</div>
        <img :src="imgUrl2" alt="Test import image">
        <img src="~assets/img/big-img.png" alt="Test relative path">
        <img src="~assets/img/none.png" alt="Test base64">
        <div v-html="header"></div>
        <div v-html="controlTemplate('#eee', '#333', '#d90000', number)"></div>
        <input type="text" v-model="number">
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
    import header from '../../../common/h5-ui/header.jsx'
    const h = header({
        reactRender: false,
        styleCustom: {
            d1Style: {
                fontSize: '14px',
                backgroundColor: 'red'
            }
        },
        componProps: {
            initProps: 6
        }
    })
    export default {
        data () {
            return {
                msg: 'This is Vue',
                imgUrl2: Img2,
                number: 0,
                header: h
            }
        },
        methods: {
          controlTemplate (color1, color2, color3, number) {
              const h = header({
                  reactRender: false,
                  styleCustom: {
                      d1Style: {
                          backgroundColor: color1
                      },
                      text1Style: {
                          color: color2
                      },
                      text1Style: {
                          color: color3
                      }
                  },
                  componProps: {
                      initProps: number === '' || number === undefined ? 0 : number
                  }
              })
              return h
          }
        },
        components: {
        }
    }
</script>