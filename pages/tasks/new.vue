<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12
      sm12
      md12>
      <form>
        <v-text-field
          v-validate="'required|max:255'"
          v-model="task.title"
          :counter="255"
          :error-messages="errors.collect('title')"
          label="Title"
          data-vv-name="title"
          required />
        <v-textarea
          v-model="task.description"
          label="Description"
          data-vv-name="description" />
        <v-switch
          v-model="task.done"
          label="Done" />
        <v-btn @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        done: false
      }
    }
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(async result => {
        await this.$store.dispatch('tasks/createTask', this.task)
        if (result) {
          if (this.$store.getters['tasks/createCompleted']) {
            this.clear()
            this.$router.push('/tasks')
          }
        }
      })
    },
    clear() {
      this.task = {
        title: '',
        description: '',
        done: false
      }
      this.$validator.reset()
    }
  }
}
</script>
