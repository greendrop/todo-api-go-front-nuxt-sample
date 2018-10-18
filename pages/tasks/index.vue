<template>
  <v-layout
    row
    wrap>
    <v-flex
      xs12
      sm12
      md12>
      <v-toolbar flat>
        <v-toolbar-title>Tasks</v-toolbar-title>
        <v-spacer />
        <v-btn
          color="primary"
          to="/tasks/new">New Task</v-btn>
      </v-toolbar>
      <v-data-table
        :headers="taskHeaders"
        :items="tasks">
        <template 
          slot="headerCell" 
          slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }}
            </span>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template 
          slot="items" 
          slot-scope="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.done }}</td>
          <td>
            <v-icon
              small
              @click="showTask(props.item)">
              details
            </v-icon>
            <v-icon
              small
              @click="editTask(props.item)">
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteTask(props.item)">
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      taskHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Done', value: 'done' },
        { text: 'Actions', value: 'id', sortable: false }
      ],
      tasks: []
    }
  },
  async asyncData(context) {
    await context.store.dispatch('tasks/getTasks', context.route.query)
    let data = {
      tasks: context.store.getters['tasks/tasks']
    }
    return data
  },
  methods: {
    showTask(task) {
      this.$router.push(`/tasks/${task.id}`)
    },
    editTask(task) {
      this.$router.push(`/tasks/${task.id}/edit`)
    },
    async deleteTask(task) {
      if (confirm('Are you sure?')) {
        await this.$store.dispatch('tasks/deleteTask', task.id)
        if (this.$store.getters['tasks/deleteCompleted']) {
          await this.$store.dispatch('tasks/getTasks', this.$route.query)
          this.tasks = this.$store.getters['tasks/tasks']
        }
      }
    }
  }
}
</script>
