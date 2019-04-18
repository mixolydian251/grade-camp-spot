import Vue from 'vue';

export default new Vue({
  methods: {
    toggleSidebar() {
      this.$emit("toggleSidebar", null)
    },
    toggleFilter(targetFilter) {
      this.$emit("toggleFilter", targetFilter)
    }
  }
});
