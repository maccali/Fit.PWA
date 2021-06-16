import { v4 as uuid } from "uuid";
import { api } from "./../services/api";
import { parseCookies } from "nookies";

type SignInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
  //   await delay()

  const res = await api.post("/local/login", data);

  if (res.data.token) {
    return {
      token: res.data.token,
      user: res.data.payload,
    };
  }
  return false;
}

export async function recoverUserInformation() {
  //   await delay();
  const { "nextauth.user": user } = parseCookies();

  return {
    user,
  };
}
