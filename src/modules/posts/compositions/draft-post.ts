// @ts-ignore
import { ref } from '@vue/composition-api'
import { deleteDraftPost, getDraftPost, setDraftPost } from '@/services/drafts';
import { removeUnsavedChanges } from './unsaved-changes';

export function useDraftPost(postId: string|null = null) {
  const existingDraft = ref<any>(null);
  getDraftPost(postId).then(draft => existingDraft.value = draft); 

  function saveAsDraft(postData) {
    const reqBody = {
      contextType: 'post',
      contextId: postId,
      contextData: postData
    }
    setDraftPost(reqBody).then(post => {
      removeUnsavedChanges(post.contextId || 'new')
    })
  }

  function deleteDraft() {
    deleteDraftPost(postId);
  }

  return {
    existingDraft,
    saveAsDraft,
    deleteDraft
  }

}