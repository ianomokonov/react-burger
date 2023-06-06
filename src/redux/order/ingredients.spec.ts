import {
  initialState,
  orderNumberError,
  orderNumberRequest,
  orderNumberSuccess,
  orderReducer,
} from "./order.slice";

it("should return the initial state", () => {
  expect(orderReducer(undefined, { type: undefined })).toEqual(initialState);
});

it("should set order request", () => {
  expect(orderReducer(initialState, orderNumberRequest())).toEqual({
    orderNumberRequest: true,
    orderNumberError: false,
  });
});

it("should set order success", () => {
  expect(
    orderReducer(
      { ...initialState, orderNumberRequest: true },
      orderNumberSuccess(111)
    )
  ).toEqual({
    orderNumber: 111,
    orderNumberRequest: false,
    orderNumberError: false,
  });
});

it("should set order error", () => {
  expect(
    orderReducer(
      { ...initialState, orderNumberRequest: true },
      orderNumberError()
    )
  ).toEqual({
    orderNumberRequest: false,
    orderNumberError: true,
  });
});
