import { NextResponse } from "next/server";
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai"
import { off } from "process";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';

const config = new Configuration({
  apiKey: OPENAI_API_KEY
})

const openai = new OpenAIApi(config)
const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: `Hello`
  }
]

export default async function getOfferInformation({ description }: { description: string }) {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...INITIAL_MESSAGES,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: description
      }
    ]
  })

  const data = completion.data.choices[0].message?.content ?? '';

  try {
    const json = JSON.parse(data)
    return NextResponse.json(json);
  } catch (e: any) {
    return new Response("Cant convert to json", { status: 500 })
  }

}