import { ComponentType } from "react";

export interface IRoute{
  exact?: boolean,
  path: string,
  component: ComponentType<any>,
  layout?: ComponentType<any>,
  children_component?:ComponentType<any>
}