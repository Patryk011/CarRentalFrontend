<template>
  <div :class="['icon-wrapper']" :style="iconStyles" v-html="iconSvgContent" />
</template>
<script setup lang="ts">
import { computed, CSSProperties, ref, watchEffect } from "vue";
import { type TIconTYpe } from "./Icon.types";

const iconSvgContent = ref<string>("");

const props = defineProps<{
  iconType: TIconTYpe;
  width?: number;
  height?: number;
  color?: string;
  hoverColor?: string;
}>();

watchEffect(async () => {
  try {
    const response = await fetch(`/src/assets/icons/${props.iconType}.svg`);

    iconSvgContent.value = await response.text();
  } catch (error) {
    console.error(`Failed to load icon: ${props.iconType}`, error);
    iconSvgContent.value = "";
  }
});

const iconStyles = computed<CSSProperties>(() => ({
  fill: props.color,
  width: props.width ? `${props.width}px` : "24px",
  height: props.height ? `${props.height}px` : "24px",
}));
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: fill 0.3s ease;

  &:hover {
    ::v-deep svg {
      fill: var(--hover-fill, #e60000);
    }
  }

  ::v-deep svg {
    fill: inherit;
    height: inherit;
    width: inherit;
  }
}
</style>
