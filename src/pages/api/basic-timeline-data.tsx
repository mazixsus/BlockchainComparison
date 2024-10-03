import type { NextApiRequest, NextApiResponse } from "next";
import { getDataObject } from "../../utils/api-data-helper";
import { get } from "http";

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
    } | {};
  };
  errorMessage?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    const response = getDataObject(req.body.chainName, req.body.compareWith, req.body.period);
    return res.status(200).json({ tokenGuardData: response });
  } else {
    res.status(404).json({ errorMessage: "Page not found" });
  }
}
