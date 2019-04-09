<template>
    <div>
        <slot v-if="!loading"></slot>
        <h1 v-else>Loading...</h1>
    </div>
</template>

<script>
  export default {
    name: "async",
    props: {
      loading: Boolean
    }
  }
</script>