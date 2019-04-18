<template>
    <v-app dark>
        <v-container fluid>
            <template v-if="authToken && user">
                <Header :assignments="assignments"
                        :selectCourse="selectCourse"
                        :courses="courses"
                        :filters="filters"
                        :activeCourse="activeCourse">
                </Header>
                <Sidebar :user="user"
                         :filters="filters"
                         @filterChange="toggleFilter($event)">
                </Sidebar>
                <v-content app>
                    <v-layout fluid v-if="activeCourse">
                        <AssignmentList
                                v-if="assignments.length"
                                :assignments="assignments"
                                :filters="filters">
                        </AssignmentList>
                    </v-layout>
                    <p v-else>Select a course</p>
                </v-content>
            </template>
            <Login v-else :loading="loading" :login="login"></Login>
        </v-container>
    </v-app>
</template>

<script>
  import {login, getEnrollments, getAssignments} from "./API";
  import AssignmentList from "./components/AssignmentList"
  import Login from "./components/Login"
  import Header from "./components/Header"
  import Sidebar from "./components/Sidebar"

  export default {
    name: 'app',
    components: {AssignmentList, Header, Login, Sidebar},
    data: () => ({
      authToken: null,
      user: null,
      courses: null,
      activeCourse: null,
      assignments: [],
      loading: false,
      drawer: null,
      filters: {
        selectedStudent: "All",
        required: false,
        unfinished: false,
      }
    }),
    watch: {
      activeCourse() {
        this.loading = true;
        (async () => {
          this.assignments = await getAssignments(this.authToken, this.activeCourse);
          this.loading = false;
        })()
      }
    },
    methods: {
      toggleFilter(target) {
        console.log(target);
        this.filters[target] = !this.filters[target]
      },
      selectCourse(courseId) {
        this.activeCourse = courseId
      },
      login(email, password) {
        (async () => {
          this.loading = true;
          this.authToken = await login(email, password);
          const {userAccount, enrollments} = await getEnrollments(this.authToken);
          this.user = userAccount;
          this.courses = enrollments;
          this.loading = false;
        })()
      }
    },
  }
</script>

<style lang="scss">

</style>
