<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12
      sm12
      md12>
      <v-card>
        <v-card-title>
          <v-layout
            row
            wrap>
            <v-flex
              xs12
              sm12
              md12>
              {{ task.title }}
            </v-flex>
            <v-flex
              xs12
              sm12
              md12>
              {{ task.description }}
            </v-flex>
            <v-flex
              xs12
              sm12
              md12>
              {{ task.done }}
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      task: null
    }
  },
  async asyncData(context) {
    await context.store.dispatch('tasks/getTaskById', context.route.params.id)
    let data = {
      task: context.store.getters['tasks/task']
    }
    return data
  }
}
</script>
