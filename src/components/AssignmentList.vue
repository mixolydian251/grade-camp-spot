<template>
    <v-container>
        <v-layout column>
            <v-card flat v-for="{assignment, students} in filteredAssignments"
                    class="pa-3 my-3"
                    :key="assignment.id">
                <v-layout row class="justify-space-between align-center pb-3">
                    <h2 class="headline">{{assignment.title}}</h2>
                    <span class="subheading font-italic ma-0">
                        {{formatDueDate(assignment.dueDate)}}
                </span>
                </v-layout>
                <div class="assignment-list">
                    <template v-for="student in students">
                        <v-card flat v-if="shouldRenderAssignment(student)"
                                :style="renderAssignmentColor(student)"
                                :key="student.student.id"
                                class="assignment py-2 px-3"
                                @click="selectStudent(student)">
                        <span class="name body-1">
                            {{student.student.firstName}} {{student.student.lastName}}
                        </span>
                            <span class="status subheading font-weight-bold">{{renderStatus(student)}}</span>
                        </v-card>
                    </template>
                </div>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
  import Assignments from "../constructors/assignments"
  import formatRelative from "date-fns/formatRelative"

  export default {
    name: "assignment-list",
    props: ["assignments", "filters"],
    computed: {
      filteredAssignments() {
        console.log("Updating Assingmnents")

        const assignments = new Assignments(this.assignments)
        const {required, unfinished, selectedStudent} = this.filters;
        return assignments
          .selected(selectedStudent)
          .required(required)
          .unfinished(unfinished, selectedStudent)
          .assignments
      },
    },
    methods: {
      selectStudent({student}) {
        this.filters.selectedStudent = `${student.firstName} ${student.lastName}`
      },
      shouldRenderAssignment({grade, submission}) {
        if (!this.filters.unfinished) return true
        return !submission || !grade ||
          (grade && grade.grade === 'Incomplete')
      },
      renderAssignmentColor({grade, submission}) {
        if (!submission) return {background: "#F44336"};
        else if (!grade) return {background: "#FFA000"};
        else if (grade.grade === 'Incomplete') return {background: "#EF6C00"};
        return {background: "#388E3C"}
      },
      renderStatus({grade, submission}) {
        if (!submission) return "Unsubmitted";
        else if (!grade) return "Ungraded"
        return grade.grade
      },
      formatDueDate(dueDate) {
        return formatRelative(new Date(dueDate), new Date())
      }
    },
  }
</script>

<style scoped lang="scss">

    .assignment-container {
        background: #202020;
        display: flex;
        min-width: fit-content;
        width: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        color: white;
        box-sizing: border-box;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0 18px 36px -18px rgba(0, 0, 0, .3),
        0 -12px 36px -8px rgba(0, 0, 0, .025);
        border-radius: 5px;

        @media only screen and (max-width: 600px) {
            padding: 20px 10px;
        }

    }

    .assignment-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 0 5px;
        i {
            font-size: 18px;
            font-weight: 600;
        }
    }

    .assignment-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 5px;

        @media only screen and (min-width: 2100px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        @media only screen and (max-width: 1165px) {
            grid-template-columns: 1fr 1fr;
        }

        @media only screen and (max-width: 800px) {
            grid-template-columns: 1fr;
        }
    }

    .assignment {
        justify-self: stretch;
        color: white;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .name {
            width: 60%;
            text-align: left;
        }

        .status {
            width: 40%;
            text-align: left;
            @media only screen and (max-width: 800px) {
                font-size: 16px;
            }
        }

        &:hover {
            cursor: pointer;
            filter: brightness(1.2);
        }
    }

    .select {
        width: 200px;
    }

    .form-controls {
        color: white;
    }
</style>
