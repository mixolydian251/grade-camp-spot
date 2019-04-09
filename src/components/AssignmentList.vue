<template>
    <div class="assignment-wrapper">
        <div v-for="{assignment, students} in filteredAssignments" class="assignment-container">
            <div class="assignment-header">
                <h2>{{assignment.title}}</h2>
                <p><i>{{formatDueDate(assignment.dueDate)}}</i></p>
            </div>
            <div class="assignment-list">
                <template v-for="student in students">
                    <div v-if="shouldRenderAssignment(student)"
                         :style="renderAssignmentColor(student)"
                         class="assignment"
                         @click="selectStudent(student)">
                        <p class="name">
                            {{student.student.firstName}} {{student.student.lastName}}
                        </p>
                        <span class="status">{{renderStatus(student)}}</span>
                    </div>
                </template>
            </div>
        </div>
    </div>
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
        const {requiredOnly, unfinishedOnly, selectedStudent} = this.filters;
        return assignments
          .selected(selectedStudent)
          .requiredOnly(requiredOnly)
          .unfinishedOnly(unfinishedOnly, selectedStudent)
          .assignments
      },
    },
    methods: {
      selectStudent({student}) {
        this.filters.selectedStudent = `${student.firstName} ${student.lastName}`
      },
      shouldRenderAssignment({grade, submission}) {
        if (!this.filters.unfinishedOnly) return true
        return !submission || !grade ||
          (grade && grade.grade === 'Incomplete')
      },
      renderAssignmentColor({grade, submission}) {
        if (!submission) return {background: "#f24c37"};
        else if (!grade) return {background: "#d9a700"};
        else if (grade.grade === 'Incomplete') return {background: "#f24c37"};
        return {background: "#55ad5d"}
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
    .assignment-wrapper {
        margin-top: 80px;
        width: 100%;
        max-width: 1300px;
    }

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
        margin-bottom: 20px;

        @media only screen and (max-width: 1165px) {
            grid-template-columns: 1fr 1fr;
        }

        @media only screen and (max-width: 800px) {
            grid-template-columns: 1fr;
        }
    }

    .assignment {
        justify-self: stretch;
        padding: 5px 20px;
        text-align: center;
        color: white;
        border-radius: 2px;
        min-width: 250px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        transition: 100ms ease;

        p {
            margin: 0;
            font-weight: 500;
        }

        .name {
            width: 60%;
            font-weight: 600;
            text-align: left;
        }

        .status {
            width: 40%;
            font-weight: 900;
            font-size: 18px;
            text-align: left;

            @media only screen and (max-width: 800px) {
                font-size: 16px;
            }
        }

        &:hover {
            cursor: pointer;
            filter: brightness(1.1);
        }
    }

    .select {
        width: 200px;
    }

    .form-controls {
        color: white;
    }
</style>