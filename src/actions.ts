import { Action } from '@ngrx/store';
import { ValidationErrors } from '@angular/forms';
import { NgrxFormControlId } from './state';

export class SetValueAction<TValue> implements Action {
  static readonly TYPE = 'ngrx/forms/SET_VALUE';
  readonly type = SetValueAction.TYPE;
  readonly controlId: NgrxFormControlId;

  readonly payload: {
    readonly value: TValue;
  };

  constructor(
    controlId: string,
    value: TValue,
  ) {
    this.controlId = controlId;
    this.payload = { value };
  }
}

export class SetErrorsAction implements Action {
  static readonly TYPE = 'ngrx/forms/SET_ERRORS';
  readonly type = SetErrorsAction.TYPE;
  readonly controlId: NgrxFormControlId;

  readonly payload: {
    readonly errors: ValidationErrors;
  };

  constructor(
    controlId: string,
    errors: ValidationErrors,
  ) {
    this.controlId = controlId;
    this.payload = {
      errors,
    };
  }
}

export class SetAsyncErrorAction implements Action {
  static readonly TYPE = 'ngrx/forms/SET_ASYNC_ERROR';
  readonly type = SetAsyncErrorAction.TYPE;
  readonly controlId: NgrxFormControlId;

  readonly payload: {
    readonly name: string;
    readonly value: any;
  };

  constructor(
    controlId: string,
    name: string,
    value: any,
  ) {
    this.controlId = controlId;
    this.payload = {
      name,
      value,
    };
  }
}

export class ClearAsyncErrorAction implements Action {
  static readonly TYPE = 'ngrx/forms/CLEAR_ASYNC_ERROR';
  readonly type = ClearAsyncErrorAction.TYPE;
  readonly controlId: NgrxFormControlId;

  readonly payload: {
    readonly name: string;
  };

  constructor(
    controlId: string,
    name: string,
  ) {
    this.controlId = controlId;
    this.payload = {
      name,
    };
  }
}

export class StartAsyncValidationAction implements Action {
  static readonly TYPE = 'ngrx/forms/START_ASYNC_VALIDATION';
  readonly type = StartAsyncValidationAction.TYPE;
  readonly controlId: NgrxFormControlId;

  readonly payload: {
    readonly name: string;
  };

  constructor(
    controlId: string,
    name: string,
  ) {
    this.controlId = controlId;
    this.payload = {
      name,
    };
  }
}

export class MarkAsDirtyAction implements Action {
  static readonly TYPE = 'ngrx/forms/MARK_AS_DIRTY';
  readonly type = MarkAsDirtyAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class MarkAsPristineAction implements Action {
  static readonly TYPE = 'ngrx/forms/MARK_AS_PRISTINE';
  readonly type = MarkAsPristineAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class EnableAction implements Action {
  static readonly TYPE = 'ngrx/forms/ENABLE';
  readonly type = EnableAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class DisableAction implements Action {
  static readonly TYPE = 'ngrx/forms/DISABLE';
  readonly type = DisableAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class MarkAsTouchedAction implements Action {
  static readonly TYPE = 'ngrx/forms/MARK_AS_TOUCHED';
  readonly type = MarkAsTouchedAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class MarkAsUntouchedAction implements Action {
  static readonly TYPE = 'ngrx/forms/MARK_AS_UNTOUCHED';
  readonly type = MarkAsUntouchedAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class FocusAction implements Action {
  static readonly TYPE = 'ngrx/forms/FOCUS';
  readonly type = FocusAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class UnfocusAction implements Action {
  static readonly TYPE = 'ngrx/forms/UNFOCUS';
  readonly type = UnfocusAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class MarkAsSubmittedAction implements Action {
  static readonly TYPE = 'ngrx/forms/MARK_AS_SUBMITTED';
  readonly type = MarkAsSubmittedAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class MarkAsUnsubmittedAction implements Action {
  static readonly TYPE = 'ngrx/forms/MARK_AS_UNSUBMITTED';
  readonly type = MarkAsUnsubmittedAction.TYPE;
  readonly controlId: NgrxFormControlId;

  constructor(controlId: string) {
    this.controlId = controlId;
  }
}

export class AddControlAction<TValue, TControlKey extends keyof TValue> implements Action {
  static readonly TYPE = 'ngrx/forms/ADD_CONTROL';
  readonly type = AddControlAction.TYPE;
  readonly controlId: NgrxFormControlId;

  readonly payload: {
    readonly name: keyof TValue;
    readonly value: TValue[TControlKey];
  };

  constructor(
    controlId: string,
    name: keyof TValue,
    value: TValue[TControlKey],
  ) {
    this.controlId = controlId;
    this.payload = { name, value };
  }
}

export class RemoveControlAction<TValue> implements Action {
  static readonly TYPE = 'ngrx/forms/REMOVE_CONTROL';
  readonly type = RemoveControlAction.TYPE;
  readonly controlId: NgrxFormControlId;

  readonly payload: {
    readonly name: keyof TValue;
  };

  constructor(
    controlId: string,
    name: keyof TValue,
  ) {
    this.controlId = controlId;
    this.payload = { name };
  }
}

export class SetUserDefinedPropertyAction implements Action {
  static readonly TYPE = 'ngrx/forms/SET_USER_DEFINED_PROPERTY';
  readonly type = SetUserDefinedPropertyAction.TYPE;
  readonly controlId: NgrxFormControlId;

  readonly payload: {
    readonly name: string;
    readonly value: any;
  };

  constructor(
    controlId: string,
    name: string,
    value: any,
  ) {
    this.controlId = controlId;
    this.payload = { name, value };
  }
}

export type Actions<TValue> =
  | SetValueAction<TValue>
  | SetErrorsAction
  | SetAsyncErrorAction
  | ClearAsyncErrorAction
  | StartAsyncValidationAction
  | MarkAsDirtyAction
  | MarkAsPristineAction
  | EnableAction
  | DisableAction
  | MarkAsTouchedAction
  | MarkAsUntouchedAction
  | FocusAction
  | UnfocusAction
  | MarkAsSubmittedAction
  | MarkAsUnsubmittedAction
  | AddControlAction<TValue, keyof TValue>
  | RemoveControlAction<TValue>
  | SetUserDefinedPropertyAction
  ;
