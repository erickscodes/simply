import { Configuration, OpenAIApi } from 'OpenAi';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const configuration = new Configuration({
      api_key: process.env.apiKey,
    });
    const OpenAi = new OpenAIApi(configuration);

    try {
      const response = await OpenAi.createCompletion({
        model: 'gpt-4.0',
        prompt: req.body.prompt,
        max_tokens: 100,
      });

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
