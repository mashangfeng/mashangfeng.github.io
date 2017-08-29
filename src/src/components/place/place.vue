<!-- place的组件，展示的商品的列表的组件 -->
<template>
  <div class="place">
    <navigation></navigation>
    <div class="main">
      <search></search>
      <store-list></store-list>
      <store-block></store-block>
      <div class="more" @click="more">
        点击加载更多商家...
      </div>
    </div>
  </div>
</template>
<script>
import search from '@/components/place/search/search.vue'
import storeList from '@/components/place/store-list/store-list'
import storeBlock from '@/components/place/store-block/store-block'
import navigation from '@/components/navigation/navigation.vue'
import { Throttle } from '@/common/js/throttle.js'
export default {
  data() {
    return {
      offset: 0,//数据加载值
    }
  },
  components: {
    search,
    storeList,
    storeBlock,
    navigation
  },
  methods: {
    //请求数据
    getDate() {
      this.offset += 24;
      if (this.offset > this.$store.getters.getMaxOffset) {
        this.offset -= 24;
        return
      }
      this.$store.commit('setIsScroll', true)
      this.$store.dispatch('getAjax',  this.offset)
    },
    //点击显示更多
    more() {
      this.$store.commit('setMaxOffset', 4);
      this.getDate();
    },
    //scroll事件
    scroll() {
      Throttle(this.getDate);
    }
  },
  created() {
    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    window.removeEventListener('scroll',this.scroll)
  }
}

</script>
<style lang="scss">
.place {

  .main {
    width: 1180px;
    margin: 0 auto;
    .more {
      line-height: 3;
      text-align: center;
      background-image: linear-gradient(to bottom, #f9f9f9, #eee);
      font-size: 18px;
      cursor: pointer;
      color: #777;
    }
  }
}

</style>
