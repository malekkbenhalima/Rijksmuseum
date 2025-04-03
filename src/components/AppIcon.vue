<template>
  <span class="icon-wrapper" :class="customClass" v-html="svgContent" aria-hidden="true" role="presentation"></span>
</template>

<script>
import { getIcon } from '@/utils/iconRegistry';

export default {
  name: 'AppIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    svgContent() {
      return getIcon(this.name);
    }
  }
}
</script> 