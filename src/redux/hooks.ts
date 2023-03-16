import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, DispatchType } from './store'

export const useTypedDispatch: () => DispatchType = useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector