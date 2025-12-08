<script setup lang="ts">
import { format, parseISO } from 'date-fns'

interface Props {
  dateString: string
}

const props = defineProps<Props>()

const formattedDate = computed(() => {
  return format(parseISO(props.dateString), 'LLLL d, yyyy')
})
</script>

<template>
  <time :datetime="dateString">{{ formattedDate }}</time>
</template>
