import {
  activeOrderError,
  activeOrderRequest,
  activeOrderSuccess,
  connecting,
  feedReducer,
  onError,
  onMessage,
  onOpen,
} from "./feed.slice";

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  hasError: false,
  activeOrderHasError: false,
  activeOrderLoading: false,
};

it("should return the initial state", () => {
  expect(feedReducer(undefined, { type: undefined })).toEqual(initialState);
});

it("should set connecting", () => {
  expect(feedReducer(initialState, connecting())).toEqual({
    ...initialState,
    isLoading: true,
    hasError: false,
  });
});

it("should set isLoading false on openen", () => {
  expect(feedReducer({ ...initialState, isLoading: true }, onOpen())).toEqual(
    initialState
  );
});

it("should set hasError true on error", () => {
  expect(
    feedReducer({ ...initialState, isLoading: true }, onError("test"))
  ).toEqual({
    ...initialState,
    hasError: true,
  });
});

it("should set feed data", () => {
  const orders = [
    {
      ingredients: ["test"],
      _id: "123",
      status: "Done",
      number: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Name",
    },
  ];
  expect(
    feedReducer(
      initialState,
      onMessage({ success: true, orders, total: 100, totalToday: 20 })
    )
  ).toEqual({
    ...initialState,
    orders,
    total: 100,
    totalToday: 20,
  });
});

it("should set active order request", () => {
  expect(feedReducer(initialState, activeOrderRequest())).toEqual({
    ...initialState,
    activeOrderLoading: true,
    activeOrderHasError: false,
    activeOrder: undefined,
  });
});

it("should set active order success", () => {
  const order = {
    ingredients: ["test"],
    _id: "123",
    status: "Done",
    number: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Name",
  };
  expect(
    feedReducer(
      { ...initialState, activeOrderLoading: true },
      activeOrderSuccess(order)
    )
  ).toEqual({
    ...initialState,
    activeOrderLoading: false,
    activeOrderHasError: false,
    activeOrder: order,
  });
});

it("should set active order error", () => {
  expect(
    feedReducer(
      { ...initialState, activeOrderLoading: true },
      activeOrderError()
    )
  ).toEqual({
    ...initialState,
    activeOrderLoading: false,
    activeOrderHasError: true,
    activeOrder: undefined,
  });
});
