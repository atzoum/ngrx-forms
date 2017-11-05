import { Actions, MarkAsDirtyAction } from '../../actions';
import { FormArrayState } from '../../state';
import { childReducer, computeArrayState, dispatchActionPerChild } from './util';

export function markAsDirtyReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== MarkAsDirtyAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  const controls = dispatchActionPerChild(state.controls, controlId => new MarkAsDirtyAction(controlId));

  if (controls === state.controls) {
    return state;
  }

  return computeArrayState(
    state.id,
    controls,
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
  );
}
