import type { NextApiRequest, NextApiResponse } from "next";

const basicTimeLineDataApiRoute = "https://api.tokenguard.io/db-api/growth-index/basic-timeline-data";

type ResponseData = {
  tokenGuardData?: {
    blockchain?: {
      tg_growth_index: {
        date: string;
        value: number;
      }[];
    };
    cumulative?: {
      tg_growth_index: {
        date: string;
        value: number;
      }[];
    };
  };
  errorMessage?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    var stringifiedBody = JSON.stringify(req.body);

    return fetch(basicTimeLineDataApiRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringifiedBody,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((jsonResBody) => {
        res.status(200).json({ tokenGuardData: jsonResBody });
      })
      .catch((error) => {
        res.status(500).json({ tokenGuardData: {}, errorMessage: "There was an error with the external API request" });
      });
  } else {
    res.status(404).json({ errorMessage: "Page not found" });
  }
}
