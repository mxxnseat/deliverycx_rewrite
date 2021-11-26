
type Tcallback = {
  data: Record<string, unknown> | null
  handlers:Record<string, unknown> | null
  status:Record<string, unknown> | null
}

export const adapterComponentUseCase = (fn: (this:Tcallback,arg?:Record<string, unknown>) => Tcallback, arg?: Record<string, unknown>) => {
 
  const callback = fn.call({
    data: null,
    handlers: null,
    status:null
  } as Tcallback, arg)
  console.log(callback)
  return {
    data() {
      return callback.data
    }
  }
}