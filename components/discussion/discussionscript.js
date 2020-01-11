import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

import TopicCard from "@/components/discussion/TopicCard";
import ReplyCard from "@/components/discussion/ReplyCard";
import SimilarDiscussionCard from "@/components/discussion/SimilarDiscussionsCard";
export default {
  components: {
    TopicCard,
    ReplyCard,
    SimilarDiscussionCard
  },
  props: {
    discussionPageData: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showButton: false,
    showLoading: false,
    reply: ""
  }),
  methods: {
    ...mapActions({ saveReply: "discussion/reply/postReply" }),
    unhideButtons() {
      if (this.userIsAuthenticated()) {
        this.showButton = true;
      }
    },
    hideButtons() {
      this.showButton = false;
    },
    postReply() {
      if (this.reply.length > 0) {
        this.showLoading = true;
        this.saveReply({
          discussionTopicId: this.discussionPageData.topicCard.topicDetails
            .topicId,
          reply: this.reply,
          userId: this.userDetails.userId
        })
          .then(() => {
            this.error = "";
            this.$router.push("/home");
          })
          .catch(message => {
            console.log("error in componenet: " + message);
          });
        this.showLoading = false;
        this.showButton = false;
        this.reply = "";
      }
    },
    userIsAuthenticated() {
      if (this.isUserAuthenticated) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    ...mapState("user/account", ["userDetails"]),
    ...mapGetters("user/account", ["isUserAuthenticated"])
  }
};
