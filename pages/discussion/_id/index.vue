<template>
  <div>
    <AppBar />
    <MenuDrawer />
    <v-content>
      <Discussion :discussionPageData="discussionPageData" />
    </v-content>
  </div>
</template>

<script>
import Discussion from "@/components/discussion/Discussion";
import AppBar from "@/components/navigation/AppBar";
import MenuDrawer from "@/components/navigation/MenuDrawer";
export default {
  components: {
    AppBar,
    MenuDrawer,
    Discussion
  },
  async asyncData(context) {
    return context.$axios
      .$get(
        `http://localhost:8080/djs/v1/view/discussion/find/id/${context.route.params.id}`
      )
      .then(response => {
        return { discussionPageData: response };
      })
      .catch(e => {
        error({ statusCode: 404, message: "Discussion page not found" });
      });
  },
  data: () => ({
    discussionPageData: null
  })
};
</script>
