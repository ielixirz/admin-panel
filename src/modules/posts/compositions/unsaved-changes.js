import { MessageBox } from 'element-ui'
import { watchEffect } from '@vue/composition-api'
import { deleteDraft, getDraft, setDraft } from '@/services/drafts'

async function restoreDraft(postId, editedPost) {
  try {
    const draft = await getDraft('post', postId)
    if (draft?.contextData) {
      await MessageBox.confirm('Would you like to restore unsaved changes?', 'You have unsaved changes', { type: 'info' })
      Object.assign(editedPost, draft?.contextData)
    }
  } catch (err) {
    if (err.message !== 'failed to call url') removeUnsavedChanges(postId)
  }
}

function savePostDraft(postId, changes) {
  setDraft({
    contextType: 'post',
    contextId: postId,
    contextData: changes
  })
}

export function useUnsavedChanges(postId = null, editedPost) {
  restoreDraft(postId, editedPost)

  watchEffect(() => {
    savePostDraft(postId, editedPost)
  })

  return {
    saveChanges: (data) => {
      savePostDraft(postId, data || editedPost)
    }
  }
}

export function removeUnsavedChanges(postId = null) {
  deleteDraft('post', postId)
}
