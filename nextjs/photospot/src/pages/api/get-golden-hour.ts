// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string,
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if(req.method === "PUT"){
      
    }
    else{
        res.status(400).send({ error: 'Need to use PUT' });
    }
}
