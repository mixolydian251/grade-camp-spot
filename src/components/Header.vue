<template>
    <div class="header">
        <v-select
                class="select"
                label="Course"
                :items="courses"
                dark
                color="white" style="width: 200px !important;">
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


        <template v-if="assignments.length">
            <v-btn v-if="filters.selectedStudent !== 'All'"
                   @click="filters.selectedStudent = 'All'">
                Back to All students
            </v-btn>
            <v-select
                    class="select"
                    v-model="filters.selectedStudent"
                    :items="generateStudentList"
                    label="Student"
                    dark>
            </v-select>
            <v-checkbox
                    class="input"
                    v-model="filters.requiredOnly"
                    label="Only show required assignments"
                    dark
                    color="blue">
            </v-checkbox>
            <v-checkbox
                    class="input"
                    v-model="filters.unfinishedOnly"
                    label="Only show unfinished assignments"
                    dark
                    color="blue">
            </v-checkbox>
        </template>
    </div>
</template>

<script>
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
    }
  }
</script>

<style scoped lang="scss">
    .header {
        height: 70px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        background: #202020;
        z-index: 100;
    }

    .input {
        max-width: 200px;
    }

    .select {
        max-width: 200px;
        padding-top: 20px;
    }
</style>