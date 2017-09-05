<template>
  <div class="shop-specmenu " v-if="isSpec" >
    <div class="shop-specmenu-specs">
      <!-- ngRepeat: spec in specsData -->
      <dl  >
        <dt >规格</dt>

        <dd  >微辣</dd>

        <dd >中辣</dd>

        <dd >魔鬼辣</dd>

        <dd >不辣</dd>

      </dl>

    </div>

    <div class="shop-specmenu-infogroup " ng-if="">
      <p>已选：<span >中辣</span>

      </p>
      <p class="shop-specmenu-price"><span class="yen">¥</span><span >68.80</span>

      </p>
    </div>

    <div class="shop-specmenu-infogroup buttons">
      <button class="btn-primary "  >选好了，加入购物车</button> <a class="shop-specmenu-cancel" href="javascript:" >不要了</a></div>
    <div class="shop-specmenu-arrow"></div>
  </div>
</template>
<script>
export default {
     computed:{
        isSpec() {
            return this.$store.state.isSpecShow;
        }
     }
}

</script>
<style lang="scss">
.shop-specmenu {
    position: absolute;
    background-color: #fff;
    width: 300px;
    border: 1px;
    box-shadow: 0 1px 15px #ccc;
    .shop-specmenu-specs {
        margin: 10px;
        padding: 12px 10px 0;
        border: 1px solid #eee;
        background-color: #fcfcfc;
        dl {
            padding-bottom: 14px;
            dt {
                font-size: 14px;
                padding-bottom: 10px;
                color: #666;
            }
            dd {
                display: inline-block;
                padding: 0 14px;
                min-width: 28px;
                height: 26px;
                line-height: 26px;
                font-size: 14px;
                border: 1px solid #bbb;
                color: #999;
                border-radius: 13px;
                margin-right: 18px;
                margin-bottom: 6px;
                cursor: pointer;
            }
        }
    }
    .shop-specmenu-infogroup {
        padding: 0 10px;
        font-size: 14px;
        color: #666;
        .shop-specmenu-price {
            font-size: 16px;
            font-weight: 700;
            color: #ff6000;
            .yen {
                font-size:12px;
            }
        }
    }
    .button {
        padding: 14px 10px;
    }
}

</style>
