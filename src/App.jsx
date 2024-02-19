import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "@/ui/Home";
import Menu from "@/features/menu/Menu";
import Cart from "@/features/cart/Cart";
import CreateOrder from "@/features/order/CreateOrder";
import Order from "@/features/order/Order";
import AppLayout from "@/ui/AppLayout";
import Error from "@/ui/Error";

import {
  menuLoader,
  orderLoader,
  createOrderAction,
  priorityAction,
} from "@/services/constants";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: priorityAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
