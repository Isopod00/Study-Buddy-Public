import openai
openai.api_key = "ENTER_YOUR_KEY_HERE"

def request(question):
    completion = openai.Completion.create(
        engine="text-davinci-003",
        prompt=question,
        max_tokens=1024,
        temperature=0.6,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    return completion.choices[0].text