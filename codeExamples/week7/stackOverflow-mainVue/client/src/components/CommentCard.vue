<template>
  <div class="CommentCard d-flex">
    <div>
      <img class="profile-pic" :src="comment.creator.picture" alt="">
    </div>
    <div>
      {{ comment.creator.name }}
    </div>
    <div class="ms-4 card w-100">
      <div class="p-2">
        {{ comment.body }}
      </div>
      <div>
        <button v-if="account.id == comment.creatorId" @click="deleteComment(comment.id)"
          class="delete btn btn-info text-end"><i><i class="mdi mdi-delete-outline"></i></i></button>
      </div>

    </div>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Comment } from '../models/Comment'
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService';

export default {
  props: { comment: { type: Comment, required: true } },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deleteComment(commentId) {
        try {
          if (await Pop.confirm('Are you sure?'))
            await commentsService.deleteComment(commentId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.profile-pic {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
</style>