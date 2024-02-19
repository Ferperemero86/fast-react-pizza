import { redirect } from "react-router-dom";

import { getMenu, getOrder, createOrder } from "@/services/apiRestaurant";
import { clearCart } from "@/features/cart/cartSlice";

import { updateOrder } from "./apiRestaurant";

import store from "@/store";

//https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}

export async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export async function createOrderAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please insert a 9 digit phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export async function priorityAction({ params }) {
  const data = { priority: true };

  await updateOrder(params.orderId, data);

  return null;
}
