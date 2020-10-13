// @ts-ignore
import { ref } from '@vue/composition-api'
import { deleteDraft, getDraft, setDraft } from '@/services/drafts';
import { removeUnsavedChanges } from './unsaved-changes';

export function useDraftPost(postId: string|null = null) {
  const existingDraft = ref<any>(null);
  getDraft('post', postId).then(draft => existingDraft.value = draft); 

  function saveAsDraft(postData) {
    const reqBody = {
      contextType: 'post',
      contextId: postId,
      contextData: postData
    }
    setDraft(reqBody).then(post => {
      removeUnsavedChanges(post.contextId || 'new')
    })
  }

  function removeDraft() {
    deleteDraft('post', postId);
  }

  return {
    existingDraft,
    saveAsDraft,
    removeDraft
  }

}