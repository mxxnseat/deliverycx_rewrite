function faz(constuctor:any) {
  const q = class extends constuctor{
    baz = "qqq"
    constructor(name: string) {
      super()
      this.bar = name
    }
  }
  return <any>q
}

@faz
class Foo {
  bar = "www"
  far
  constructor(name:string) {
    this.bar = name
    this.far = name
  }

  size() {
    return 5
  }
}

export default Foo