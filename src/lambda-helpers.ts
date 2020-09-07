import { AxiosPromise } from "axios";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

export const wrapAxios = (req: AxiosPromise<any>) =>
  req
    .then((r) => ({
      statusCode: 200,
      body: JSON.stringify(r.data),
      headers,
    }))
    .catch((e) => ({
      statusCode: 500,
      body: e.message,
      headers,
    }));

export const userError = (body: string) => ({
  statusCode: 400,
  body,
  headers,
});

export const serverError = (body: string) => ({
  statusCode: 500,
  body,
  headers,
});

export const githubRequestHeaders = (token: string) => ({
  headers: {
    Accept: "application/vnd.github.inertia-preview+json",
    Authorization: `Basic ${Buffer.from(`dvargas92495:${token}`).toString(
      "base64"
    )}`,
  },
});
