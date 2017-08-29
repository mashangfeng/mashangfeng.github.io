export default {
  setrestaurants(state, data) {
    if (state.isScroll) {
      state.restaurants.push(data);
    } else {

      state.restaurants = [data];
      console.log(state.restaurants)
    }
  },
  //是否滚动
  setIsScroll(state, isScroll) {
    state.isScroll = isScroll;
  },
  //最大的offset值
  setMaxOffset(state, offset) {
    if (offset == 0) {
      state.maxOffSet = 0;
      return;
    }
    state.maxOffSet += offset;
  },
  //类型id
  setrstCategoriesId(state, id) {
    state.rstCategoriesId = id
  }
}
