import { mapActions, mapState, mapMutations } from "vuex";

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
    ...mapActions({
      saveReply: "discussion/reply/postReply",
      validateAction: "common/securedActionValidation/validateAction"
    }),
    ...mapMutations({
      setDialogToOpen: "common/loginsignupdialog/setDialogToOpen"
    }),
    unhideButtons() {
      this.validateAction({
        actionType: "post",
        postType: "reply"
      })
        .then(response => {
          this.showButton = true;
        })
        .catch(message => {
          console.log("error in componenet: " + message);
        });
    },
    hideButtons() {
      this.showButton = false;
    },
    postReply() {
      if (this.reply.length > 0) {
        this.showLoading = true;
        this.saveReply({
          discussionId: this.discussionPageData.id,
          reply: this.reply,
          user: {
            id: this.userDetails.userId,
            username: this.userDetails.username
          }
        })
          .then(data => {
            this.updateReplyList(data);
          })
          .catch(message => {
            console.log("error in componenet: " + message);
          });
        this.showLoading = false;
        this.showButton = false;
        this.reply = "";
      }
    },
    updateReplyList(newReply) {
      this.discussionPageData.replyList.unshift({
        //reply: {
          id: newReply.id,
          reply: newReply.reply,
          user: {
            id: newReply.user.id,
            username: newReply.user.username
          },
          likes: newReply.likes,
          datePosted: newReply.datePosted
        //}
        //userCard: { username: this.userDetails.username }
      });
    }
  },
  computed: {
    ...mapState("user/account", ["userDetails"])
  }
};
