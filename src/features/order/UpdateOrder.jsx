import { useFetcher } from "react-router-dom";

import Button from "@/ui/Button";

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="patch" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}
