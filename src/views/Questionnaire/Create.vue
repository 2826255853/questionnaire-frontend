<template>
  <div class="questionnaire-create">
    <el-card>
      <template #header>
        <span>{{ isEdit ? '编辑问卷' : '创建问卷' }}</span>
      </template>
      <p>问卷表单（待实现）</p>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isEdit = computed(() => !!route.params.id)
</script>