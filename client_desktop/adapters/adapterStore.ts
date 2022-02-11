/* eslint-disable react-hooks/rules-of-hooks */
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState, store } from "servises/redux/createStore";

import isEqual from 'lodash/isEqual';
import { createSelectorCreator, defaultMemoize } from 'reselect';

interface TcalbackSelector<T,R> {
  (selector: T): (state:RootState) => R
}
interface TcalbackcreateSelector<T,R> {
  (selector: T): any[]
}

interface Tdeep<T> {
  (val:T): any
}
export class AdapterSelector<T>{
  protected selectors
  constructor(selectors:T) {
    this.selectors = selectors
  }
  
  useSelectors<R>(calback:TcalbackSelector<T,R>):R {
    return useSelector(calback(this.selectors))
  }
  createSelectors<R>(calback: TcalbackSelector<T,R>,deep:Tdeep<R>): keyof R {
    const create = createSelector(
      calback(this.selectors),
      deep
    )
    
    return create(store.getState())
    
  }
  createEqualSelector<R>(calback: TcalbackcreateSelector<T,R>,deep:Tdeep<R>):R {
    const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
    const create = createDeepEqualSelector(
      calback(this.selectors),
      deep
    )
    return create(store.getState())
  }
}