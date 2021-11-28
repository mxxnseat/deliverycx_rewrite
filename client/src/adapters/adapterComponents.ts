
export type TadapterCaseCallback = {
  data:any
  handlers:any
  status:any
}

class AdapterUseCase{
  params: TadapterCaseCallback = {
    data: {},
    handlers:{},
    status:{}
  }
  
  data(data:null) {
    return this.params.data = data
  }
  handlers(handlers:null) {
    return this.params.handlers = handlers
  }
  status(status:null) {
    return this.params.status = status
  }
  get getParam() {
    return this.params
  }
}

//(fn: (this:TadapterCaseCallback,arg?:Record<string, unknown>) => void, arg?: Record<string, unknown>)
export const adapterComponentUseCase = (fn:any,arg?:any)  => {
  const param = new AdapterUseCase()
  fn.call(param, arg)
  return param.getParam
}