export interface Parameters{
  time ?: boolean
  path ?: boolean
  method ?: boolean
  query ?: boolean
  body ?: boolean
  cookies ?: boolean
  hostname ?: boolean
}
export interface RequestLoggerProps{
  ignore_urls : Array<string>
  parameters ?: Parameters
  showLatestFirst : boolean
}

export const BOOTSTRAP_CLASSES = {
  'GET':'success',
  'POST':'info',
  'PATCH':'active',
  'PUT':'warning',
  'DELETE':'danger'
}