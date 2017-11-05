import {
  ClearAsyncErrorAction,
  DisableAction,
  EnableAction,
  FocusAction,
  MarkAsDirtyAction,
  MarkAsPristineAction,
  MarkAsSubmittedAction,
  MarkAsTouchedAction,
  MarkAsUnsubmittedAction,
  MarkAsUntouchedAction,
  SetAsyncErrorAction,
  SetErrorsAction,
  SetUserDefinedPropertyAction,
  SetValueAction,
  StartAsyncValidationAction,
  UnfocusAction,
} from '../actions';
import { cast, createFormArrayState } from '../state';
import { formArrayReducerInternal } from './reducer';

describe('form array reducer', () => {
  const FORM_CONTROL_ID = 'test ID';
  const FORM_CONTROL_0_ID = FORM_CONTROL_ID + '.0';
  type FormArrayValue = string[];
  const INITIAL_FORM_CONTROL_VALUE: FormArrayValue = [''];
  const INITIAL_STATE = createFormArrayState(FORM_CONTROL_ID, INITIAL_FORM_CONTROL_VALUE);

  it('should skip any action with non-equal control ID', () => {
    const resultState = formArrayReducerInternal(INITIAL_STATE, new SetValueAction('A' + FORM_CONTROL_ID, 'A') as any);
    expect(resultState).toBe(INITIAL_STATE);
  });

  it('should forward focus actions to children', () => {
    const resultState = formArrayReducerInternal(INITIAL_STATE, new FocusAction(FORM_CONTROL_0_ID) as any);
    expect(cast(resultState.controls[0]).isFocused).toEqual(true);
    expect(cast(resultState.controls[0]).isUnfocused).toEqual(false);
  });

  it('should forward unfocus actions to children', () => {
    const state = {
      ...INITIAL_STATE,
      controls: [
        {
          ...INITIAL_STATE.controls[0],
          isFocused: true,
          isUnfocused: false,
        },
      ],
    };
    const resultState = formArrayReducerInternal(state, new UnfocusAction(FORM_CONTROL_0_ID) as any);
    expect(cast(resultState.controls[0]).isFocused).toEqual(false);
    expect(cast(resultState.controls[0]).isUnfocused).toEqual(true);
  });

  it('should not update state if no child was updated', () => {
    const resultState = formArrayReducerInternal(INITIAL_STATE, new SetValueAction(FORM_CONTROL_0_ID, '') as any);
    expect(resultState).toBe(INITIAL_STATE);
  });

  it('should not update state value if no child value was updated', () => {
    const resultState = formArrayReducerInternal(INITIAL_STATE, new MarkAsDirtyAction(FORM_CONTROL_0_ID));
    expect(resultState.value).toBe(INITIAL_STATE.value);
  });

  it('should not reset child states', () => {
    const value = 'A';
    const state = formArrayReducerInternal(INITIAL_STATE, new SetValueAction(FORM_CONTROL_0_ID, value) as any);
    const resultState = formArrayReducerInternal(state, new MarkAsSubmittedAction(FORM_CONTROL_ID));
    expect(resultState.controls[0].value).toBe(value);
  });

  it('should not be stateful', () => {
    formArrayReducerInternal(INITIAL_STATE, new SetValueAction(FORM_CONTROL_ID, []));
    expect(() => formArrayReducerInternal(INITIAL_STATE, new MarkAsDirtyAction(FORM_CONTROL_ID))).not.toThrowError();
  });

  it('should throw if state is not an array state', () => {
    expect(() => formArrayReducerInternal(INITIAL_STATE.controls[0] as any, new MarkAsDirtyAction(FORM_CONTROL_ID))).toThrowError();
  });

  describe(SetValueAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducerInternal(INITIAL_STATE, new SetValueAction(FORM_CONTROL_ID, ['A']));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(SetErrorsAction.name, () => {
    it('should update state', () => {
      const errors = { required: true };
      const resultState = formArrayReducerInternal(INITIAL_STATE, new SetErrorsAction(FORM_CONTROL_ID, errors));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(StartAsyncValidationAction.name, () => {
    it('should update state', () => {
      const name = 'required';
      const resultState = formArrayReducerInternal(INITIAL_STATE, new StartAsyncValidationAction(FORM_CONTROL_ID, name));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(SetAsyncErrorAction.name, () => {
    it('should update state', () => {
      const name = 'required';
      const value = true;
      const state = { ...INITIAL_STATE, pendingValidations: [name], isValidationPending: true };
      const resultState = formArrayReducerInternal(state, new SetAsyncErrorAction(FORM_CONTROL_ID, name, value));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(ClearAsyncErrorAction.name, () => {
    it('should update state', () => {
      const name = 'required';
      const state = {
        ...INITIAL_STATE,
        isValid: false,
        isInvalid: true,
        errors: { ['$' + name]: true },
        pendingValidations: [name],
        isValidationPending: true,
      };

      const resultState = formArrayReducerInternal(state, new ClearAsyncErrorAction(FORM_CONTROL_ID, name));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsDirtyAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducerInternal(INITIAL_STATE, new MarkAsDirtyAction(FORM_CONTROL_ID));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsPristineAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isDirty: true, isPristine: false };
      const resultState = formArrayReducerInternal(state, new MarkAsPristineAction(FORM_CONTROL_ID));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(EnableAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isEnabled: false, isDisabled: true };
      const resultState = formArrayReducerInternal(state, new EnableAction(FORM_CONTROL_ID));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(DisableAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducerInternal(INITIAL_STATE, new DisableAction(FORM_CONTROL_ID));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsTouchedAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducerInternal(INITIAL_STATE, new MarkAsTouchedAction(FORM_CONTROL_ID));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsUntouchedAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isTouched: true, isUntouched: false };
      const resultState = formArrayReducerInternal(state, new MarkAsUntouchedAction(FORM_CONTROL_ID));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsSubmittedAction.name, () => {
    it('should update state', () => {
      const resultState = formArrayReducerInternal(INITIAL_STATE, new MarkAsSubmittedAction(FORM_CONTROL_ID));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(MarkAsUnsubmittedAction.name, () => {
    it('should update state', () => {
      const state = { ...INITIAL_STATE, isSubmitted: true, isUnsubmitted: false };
      const resultState = formArrayReducerInternal(state, new MarkAsUnsubmittedAction(FORM_CONTROL_ID));
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });

  describe(SetUserDefinedPropertyAction.name, () => {
    it('should update state', () => {
      const action = new SetUserDefinedPropertyAction(FORM_CONTROL_ID, 'prop', 12);
      const resultState = formArrayReducerInternal<string>(INITIAL_STATE, action);
      expect(resultState).not.toBe(INITIAL_STATE);
    });
  });
});
