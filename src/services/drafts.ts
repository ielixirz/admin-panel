import { api, getCallData } from './api'

export function getDraftPost(postId: string|null): Promise<any> {
  return api.get('/api/drafts', { params: { contextType: 'post', postId } }).then(getCallData);
}

export function setDraftPost(draftPost: any): Promise<any> {
  return api.put('/api/drafts', { data: draftPost });
}

export function deleteDraftPost(postId: string|null): Promise<any> {
  return api.delete('/api/drafts', { params: { contextType: 'post', postId } }).then(getCallData);
}
