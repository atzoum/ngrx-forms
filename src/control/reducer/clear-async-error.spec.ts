import { createFormControlState } from '../../state';
import { ClearAsyncErrorAction } from '../../actions';
import { clearAsyncErrorReducer } from './clear-async-error';

describe(`form control ${clearAsyncErrorReducer.name}`, () => {
  const FORM_CONTROL_ID = 'test ID';
  const INITIAL_FORM_CONTROL_VALUE = '';
  const INITIAL_STATE = createFormControlState<string>(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);

  it('should skip any action of the wrong type', () => expect(clearAsyncErrorReducer(INITIAL_STATE, { type: '' } as any)).toBe(INITIAL_STATE));

  it('should remove error from state', () => {
    const name = 'required';
    const state = { ...INITIAL_STATE, isValid: false, isInvalid: true, errors: { ['$' + name]: true }, pendingValidations: [name], isValidationPending: true };
    const resultState = clearAsyncErrorReducer(state, new ClearAsyncErrorAction(FORM_CONTROL_ID, name));
    expect(resultState.errors).toEqual({});
    expect(resultState.isValid).toBe(true);
    expect(resultState.isInvalid).toBe(false);
  });

  it('should remove the validation from pending validations if validation is the last pending', () => {
    const name = 'required';
    const state = { ...INITIAL_STATE, isValid: false, isInvalid: true, errors: { ['$' + name]: true }, pendingValidations: [name], isValidationPending: true };
    const resultState = clearAsyncErrorReducer(state, new ClearAsyncErrorAction(FORM_CONTROL_ID, name));
    expect(resultState.pendingValidations).toEqual([]);
    expect(resultState.isValidationPending).toBe(false);
  });

  it('should remove the validation from pending validations if validation is not the last pending', () => {
    const name = 'required';
    const name2 = 'min';
    const state = {
      ...INITIAL_STATE,
      isValid: false,
      isInvalid: true,
      errors: { ['$' + name]: true },
      pendingValidations: [name, name2],
      isValidationPending: true,
    };

    const resultState = clearAsyncErrorReducer(state, new ClearAsyncErrorAction(FORM_CONTROL_ID, name));
    expect(resultState.pendingValidations).toEqual([name2]);
    expect(resultState.isValidationPending).toBe(true);
  });

  it('should remove pending validation without changing the errors if no matching error is found', () => {
    const name = 'required';
    const errors = { $min: true };
    const state = { ...INITIAL_STATE, isValid: false, isInvalid: true, errors, pendingValidations: [name], isValidationPending: true };
    const resultState = clearAsyncErrorReducer(state, new ClearAsyncErrorAction(FORM_CONTROL_ID, name));
    expect(resultState.errors).toBe(errors);
    expect(resultState.pendingValidations).toEqual([]);
    expect(resultState.isValidationPending).toBe(false);
  });

  it('should not update state if no matching pending validation is found', () => {
    const name = 'required';
    const state = { ...INITIAL_STATE, pendingValidations: ['min'], isValidationPending: true };
    const resultState = clearAsyncErrorReducer(state, new ClearAsyncErrorAction(FORM_CONTROL_ID, name));
    expect(resultState).toBe(state);
  });
});
