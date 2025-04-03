<template>
  <span :class="['spinner', { 'spinner--light': light }]"></span>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    light: {
      type: Boolean,
      default: false
    }
  }
}
</script> 