<template>
    <v-app dark>
        <template v-if="authToken">
            <Header app
                    :assignments="assignments"
                    :selectCourse="selectCourse"
                    :courses="courses"
                    :filters="filters"
                    :activeCourse="activeCourse">
            </Header>
            <div id="app">
                <v-content>
                    <div v-if="activeCourse">
                        <AssignmentList
                                v-if="assignments.length"
                                :assignments="assignments"
                                :filters="filters">
                        </AssignmentList>
                    </div>
                    <p v-else>Select a course</p>
                </v-content>
            </div>
        </template>
        <Login v-else :login="login"></Login>
    </v-app>
</template>

<script>
  import {login, getEnrollments, getAssignments} from "./API";
  import AssignmentList from "./components/AssignmentList"
  import Login from "./components/Login"
  import Header from "./components/Header"

  export default {
    name: 'app',
    components: {AssignmentList, Header, Login},
    data: () => ({
      authToken: null,
      courses: null,
      activeCourse: null,
      assignments: [],
      loading: false,
      drawer: null,
      filters: {
        unfinishedOnly: false,
        requiredOnly: false,
        selectedStudent: "All",
      }
    }),
    watch: {
      activeCourse() {
        this.loading = true;
        (async () => {
          this.assignments = await getAssignments(this.authToken, this.activeCourse)
          this.loading = false;
        })()
      }
    },
    methods: {
      selectCourse(courseId) {
        this.activeCourse = courseId
      },
      login(email, password) {
        (async () => {
          this.loading = true;
          this.authToken = await login(email, password);
          this.courses = await getEnrollments(this.authToken);
          this.loading = false;
        })()
      }
    },
  }
</script>

<style lang="scss">
    html {
        background: #121212;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        padding: 20px;
        max-width: 1400px;
        width: 100%;
        margin: 0 auto;
        background: #121212;
    }
</style>
