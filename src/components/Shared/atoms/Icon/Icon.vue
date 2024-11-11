<template>
  <div
    :class="['icon-wrapper', { 'has-hover': props.hoverColor }]"
    :style="iconStyles"
    v-html="iconSvgContent"
  />
</template>

<script setup lang="ts">
import { computed, CSSProperties, ref, onMounted } from "vue";
import { type TIconType } from "./Icon.types";

const iconSvgContent = ref<string>("");

const props = defineProps<{
  iconType: TIconType;
  width?: number;
  height?: number;
  color?: string;
  hoverColor?: string;
}>();

onMounted(async () => {
  try {
    const response = await fetch(`/src/assets/icons/${props.iconType}.svg`);
    iconSvgContent.value = await response.text();
  } catch (error) {
    console.error(`Failed to load icon: ${props.iconType}`, error);
    iconSvgContent.value = "";
  }
});

const iconStyles = computed<CSSProperties>(() => ({
  "--fill": props.color || "black",
  ...(props.hoverColor && { "--hover-fill": props.hoverColor }),
  width: props.width ? `${props.width}px` : "32px",
  height: props.height ? `${props.height}px` : "32px",
}));
</script>

<style lang="scss" scoped>
.icon-wrapper {
  --fill: black;

  :deep(svg) {
    height: inherit;
    width: inherit;
    fill: var(--fill);
    transition: fill 0.1s ease-in, stroke 0.1s ease-in;
  }

  &.has-hover {
    :deep(svg) {
      &:hover {
        fill: var(--hover-fill);
      }
    }
  }
}
</style>
