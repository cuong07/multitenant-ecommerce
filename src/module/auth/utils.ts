import { cookies as getCookies } from "next/headers";

interface AuthCookieOptions {
  prefix?: string;
  value: string;
}

export const generateAuthCookie = async ({
  prefix,
  value,
}: AuthCookieOptions) => {
  const cookies = await getCookies();

  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
  });
};
