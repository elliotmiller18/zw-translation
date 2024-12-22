from openai import OpenAI
import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/send_sentence', methods=['POST'])
def process_sentence():
    if not request.is_json:
        return jsonify({"Error"})
    data = request.get_json()

    original_language = data.get("original_language")
    target_language = data.get("target_language")
    original_sentence = data.get("original_sentence")
    user_translated_sentence = data.get("user_translated_sentence")
    proficiency =  data.get("proficiency")

    content = f"Hello, I am a {proficiency} language learner trying to practice translating sentences between {original_language} and {target_language}. Given the {original_language} sentence \"{original_sentence}\", is the translation \"{user_translated_sentence}\" correct? If so, please only respond with the phrase \"correct\" If not, please give a comma separated list of feedback with the first entry being the word incorrect. This response is going to be processed by python code so it is important that this format is maintained. Thank you very much."

    # Hello, I am (a/an) <proficiency> language learner trying to practice translating sentences between <original_language> and <target_language>. Given the <original_language> sentence “<sentence>”, is the translation “<user_translated_sentence>” correct? If so, please only respond with the phrase “no notes.” If not, please give a comma separated list of feedback. This response is going to be processed by python code so it is important that this format is maintained. Thank you very much.
    response = openai_api_call(content)
    return jsonify(response), 200


def openai_api_call(content):
    client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
    )

    completion = client.chat.completions.create(
    model="gpt-4o-mini",
    store=True,
    messages=[
        {"role": "user", "content": content}
    ]
    )

    return completion.choices[0].message.content;

#print(os.getenv("OPENAI_API_KEY"))

if __name__ == '__main__':
    #TODO: remove debug
    app.run(debug=True)