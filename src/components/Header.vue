<template>
    <v-toolbar app flat clipped-right height="65">
        <v-btn icon @click="toggleSidebar">
            <v-icon>menu</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <template v-if="assignments.length">
            <v-btn v-if="filters.selectedStudent !== 'All'"
                   @click="filters.selectedStudent = 'All'"
                   icon
                   class="mx-2">
                <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-select
                    class="mx-2 select"
                    v-model="filters.selectedStudent"
                    :items="generateStudentList"
                    label="Student"
                    color="teal accent-2"
            >
            </v-select>
        </template>
        <v-select
                class="mx-2 select"
                label="Course"
                :items="courses"
                color="teal accent-2">
            <template slot="selection" slot-scope="data">
                <v-list-tile-content>
                    {{data.item.course.name}}
                </v-list-tile-content>
            </template>
            <template slot="item" slot-scope="data" style="width: 200px !important;">
                <v-list-tile-content @click="selectCourse(data.item.id)">
                    {{data.item.course.name}}
                </v-list-tile-content>
            </template>
        </v-select>

    </v-toolbar>
</template>

<script>
  import EventBus from "../EventBus.js"

  export default {
    name: "app-header",
    props: [
      "assignments",
      "courses",
      "selectCourse",
      "filters",
      "activeCourse"
    ],
    computed: {
      generateStudentList() {
        return this.assignments[0].students.map(({student}) => `${student.firstName} ${student.lastName}`)
      },
    },
    methods: {
      toggleSidebar() {
        EventBus.toggleSidebar()
      }
    }
  }
</script>

<style scoped lang="scss">
    .input {
        max-width: 200px;
    }

    .select {
        max-width: 200px;
    }
</style>
