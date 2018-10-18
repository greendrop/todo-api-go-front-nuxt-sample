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
        <v-btn color="primary">New Item</v-btn>
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
              @click="deleteTaks(props.item)">
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
    }
  }
}
</script>
