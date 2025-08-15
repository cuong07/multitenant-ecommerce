import promiseConfig from "@payload-config";
import { getPayload } from "payload";
export default async function Home() {
  const payload = await getPayload({
    config: promiseConfig,
  });

  const categories = await payload.find({
    collection: "categories",
  });

  return (
    <div>
      <h1>Categories</h1>
      {JSON.stringify(categories, null, 2)}
    </div>
  );
}
