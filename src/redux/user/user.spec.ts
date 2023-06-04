import {
  setProfileInfo,
  setResetEmail,
  setUserErrorMessage,
  setUserOrders,
  userReducer,
} from "./user.slice";

const initialState = { orders: [] };

it("should return the initial state", () => {
  expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
});

it("should set profile info", () => {
  const info = { name: "Test", email: "test@test.ru" };
  expect(userReducer(initialState, setProfileInfo(info))).toEqual({
    ...initialState,
    profile: info,
  });
});

it("should set error message", () => {
  expect(userReducer(initialState, setUserErrorMessage("error"))).toEqual({
    ...initialState,
    errorMessage: "error",
  });
});

it("should set email", () => {
  expect(userReducer(initialState, setResetEmail("test@test.ru"))).toEqual({
    ...initialState,
    resetEmail: "test@test.ru",
  });
});

it("should set user orders", () => {
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
    userReducer(
      initialState,
      setUserOrders({ success: true, orders, total: 100, totalToday: 20 })
    )
  ).toEqual({
    ...initialState,
    orders,
  });
});
