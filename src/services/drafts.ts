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
