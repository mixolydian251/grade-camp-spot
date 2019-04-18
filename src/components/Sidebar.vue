<template>
    <v-navigation-drawer
            v-model="drawer"
            app
            width="250"
    >
        <v-list class="pa-1">
            <v-list-tile avatar tag="div">
                <v-list-tile-avatar>
                    <img :src="githubAvatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title class="body-1 font-weight-medium">
                        {{user.firstName}} {{user.lastName}}
                    </v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-btn icon @click.stop="toggleSidebar">
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
            <v-divider light></v-divider>

            <v-list-tile class="mt-2">

                <v-list-tile-content>
                    <v-list-tile-title class="subheading font-weight-bold">
                        <v-icon left>filter_list</v-icon>
                        <span>Filters</span>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="filterChange('required')">
                <v-list-tile-action class="tile-padding">
                    <v-checkbox v-model="filters.required"
                                @click.stop="filterChange('required')"
                                color="teal accent-2">
                    </v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content class="pl-2">
                    <v-list-tile-title>Required</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="filterChange('unfinished')">
                <v-list-tile-action class="tile-padding">
                    <v-checkbox v-model="filters.unfinished"
                                @click.stop="filterChange('unfinished')"
                                color="teal accent-2">
                    </v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content class="pl-2">
                    <v-list-tile-title>Unfinished</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
  import EventBus from "../EventBus";

  export default {
    name: "sidebar",
    props: ["user", "filters"],
    data: () => ({
      drawer: null,
      items: [
        {title: 'Home', icon: 'dashboard'},
        {title: 'About', icon: 'question_answer'}
      ],
    }),
    computed: {
      githubAvatar() {
        return `https://github.com/${this.user.githubUserName}.png?size=40`
      }
    },
    methods: {
      filterChange(target) {
        this.$emit("filterChange", target)
      },
      toggleSidebar() {
        this.drawer = !this.drawer
      }
    },
    created() {
      EventBus.$on("toggleSidebar", () => this.toggleSidebar())
    }
  }
</script>

<style>
    .tile-padding {
        padding-left: 38px !important;
    }
</style>
