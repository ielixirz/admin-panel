import { api, getCallData } from './api'

export function getDraft(contextType: string, contextId: string|null): Promise<any> {
  return api.get('/api/drafts', { params: { contextType, contextId } }).then(getCallData);
}

export function setDraft(draftData: any) {
  return api.put('/api/drafts', { data: draftData });
}

export function deleteDraft(contextData: string, contextId: string|null) {
  return api.delete('/api/drafts', { params: { contextData, contextId } })
}

export function getDraftPost(postId: string|null): Promise<any> {
  return api.get('/api/drafts', { params: { contextType: 'post', postId } }).then(getCallData);
}

export function setDraftPost(draftPost: any): Promise<any> {
  return api.put('/api/drafts', { data: draftPost });
}

export function deleteDraftPost(postId: string|null): Promise<any> {
  return api.delete('/api/drafts', { params: { contextType: 'post', postId } }).then(getCallData);
}
