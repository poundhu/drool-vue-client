import ReportViolationCard from "@/components/common/ReportViolationCard";
import { mapActions } from "vuex";

export default {
  components: {
    ReportViolationCard
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    reply: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    datePosted: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showReportViolationCard: false,
      thumbClicked: false,
      currentLikes: this.likes,
      thumbColor: ""
    };
  },
  methods: {
    ...mapActions({
      toggleReplyLike: "discussion/reply/toggleReplyLike",
      validateAction: "common/securedActionValidation/validateAction"
    }),
    openReportViolationCard() {
      showReportViolationCard = !showReportViolationCard;
    },
    toggleLike() {
      this.validateAction({
        actionType: "like",
        postType: "reply",
        postOwnerId: this.userId
      })
        .then(response => {
          this.thumbClicked = !this.thumbClicked;

          this.toggleReplyLike({
            postId: this.id,
            toggleType: this.thumbClicked ? "increment" : "decrement"
          })
            .then(response => {
              if (this.thumbClicked) {
                this.currentLikes++;
                this.thumbColor = "amber accent-3";
              } else {
                this.currentLikes--;
                this.thumbColor = "";
              }
            })
            .catch(message => {
              console.log("error in componenet: " + message);
            });
        })
        .catch(message => {
          console.log("error in componenet: " + message);
        });
    }
  },
  computed: {
    getLikes() {
      return this.currentLikes;
    },
    getThumbColor() {
      return this.thumbColor;
    }
  }
};
