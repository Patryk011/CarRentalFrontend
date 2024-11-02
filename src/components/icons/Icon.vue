<template>
  <div :class="['icon-wrapper']" :style="iconStyles" v-html="iconSvgContent" />
</template>
<script setup lang="ts">
import { computed, CSSProperties, ref, onMounted } from "vue";
import { type TIconTYpe } from "./Icon.types";

const iconSvgContent = ref<string>("");

const props = defineProps<{
  iconType: TIconTYpe;
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
  "--fill": props.color,
  "--hover-fill": props.hoverColor || "#e60000",
  width: props.width ? `${props.width}px` : "32px",
  height: props.height ? `${props.height}px` : "32px",
}));
</script>

<style lang="scss" scoped>
.icon-wrapper {
  --fill: black,
  --hover-fill: #e60000;


  :deep(svg) {
    height: inherit;
    width: inherit;
    fill: var(--fill);
    transition: fill 0.1s ease-in, stroke 0.1s ease-in;

    &:hover {
      fill: var(--hover-fill);
  }
  }
}
</style>
