import React from "react"
import { FormWrapper, IWrapper } from "./FormWrapper"

export class FormBuilder{
  protected wrapp:IWrapper
  constructor(fromik:any,usecase:any) {
    this.wrapp = FormWrapper(fromik,usecase)
  }
  createBuild(wrappers:IWrapper[]) {
    return wrappers.map((wrapp:IWrapper,index:number) => {
      return React.createElement(React.Fragment, {key: index}, wrapp)
    })
  }
  getInitinal(build:(builder:IWrapper)=> IWrapper[]) {
    return React.createElement(React.Fragment, null, this.createBuild(build(this.wrapp)) )
  }
}
