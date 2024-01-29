import { redirect } from "react-router-dom";

import { getMenu, getOrder, createOrder } from "@/services/apiRestaurant";

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
    priority: data.priority === "on",
  };

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}
