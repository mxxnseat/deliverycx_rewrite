import { FC, ReactNode } from "react"
import { Route, useLocation } from "react-router-dom"

type TDialogs = {
  params: string
  enumquery:any
}


export const Dialogs:FC<TDialogs> = ({params,enumquery}) => {
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const queryName = query.get(params)
  
  if (!queryName) {
    return null
  }
  const Components = enumquery[queryName]

  return <Components />
  
}
