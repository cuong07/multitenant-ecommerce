import { categoriesRouter } from "@/module/categories/server/procedures";
import { createTRPCRouter } from "../init";
import { authRouter } from "@/module/auth/server/procedures";
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  auth: authRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
