<!-- <template>
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
    const iconModule = await import(`@/assets/icons/${props.iconType}.svg`);
    iconSvgContent.value = iconModule.default;
  } catch (err) {
    console.error(`Icon ${props.iconType} not found`);
    iconSvgContent.value = "";
  }
});
</script> -->
