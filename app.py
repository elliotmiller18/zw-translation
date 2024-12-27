from openai import OpenAI
import os
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder="dist")

@app.route('/', methods=['GET'])
def serve_index():
    return send_from_directory('dist','index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_static_files(path):
    # Serve static files like bundle.js or styles.css
    return send_from_directory('dist', path)

@app.route('/submit', methods=['POST'])
def process_sentence():
    print(request)
    if not request.is_json:
        return jsonify({"error":"The body is not a JSON"}), 400
    data = request.get_json()

    missing_arguments = []

    # original_language = data.get("original_language")
    # if original_language is None:
    #     missing_arguments.append("original language")
    # target_language = data.get("target_language")
    # if target_language is None:
    #     missing_arguments.append("target language")
    # original_sentence = data.get("original_sentence")
    # if original_sentence is None:
    #     missing_arguments.append("original sentence")
    # user_translated_sentence = data.get("user_translated_sentence")
    # if user_translated_sentence is None:
    #     missing_arguments.append("user translated sentence")
    # proficiency =  data.get("proficiency")
    # if proficiency is None:
    #     missing_arguments.append("proficiency")
    originalLanguage = data.get("originalLanguage")
    if originalLanguage is None:
        missing_arguments.append("original language")
    targetLanguage = data.get("targetLanguage")
    if targetLanguage is None:
        missing_arguments.append("target language")
    originalSentence = data.get("originalSentence")
    if originalSentence is None:
        missing_arguments.append("original sentence")
    userTranslatedSentence = data.get("userTranslatedSentence")
    if userTranslatedSentence is None:
        missing_arguments.append("user translated sentence")
    proficiency = data.get("proficiency")
    if proficiency is None:
        missing_arguments.append("proficiency")

    if len(missing_arguments) > 0:
        return jsonify({"error":f"Request missing {", ".join(missing_arguments)}"}), 400

    content = f"Hello, I am a {proficiency} language learner trying to practice translating sentences between {originalLanguage} and {targetLanguage}. Given the {originalLanguage} sentence \"{originalSentence}\", is the translation \"{userTranslatedSentence}\" correct? If so, please only respond with the phrase \"correct\" If not, please give a comma separated list of feedback with the first entry being the word incorrect. This response is going to be processed by python code so it is important that this format is maintained. Thank you very much."

    #TODO: remove this is for debugging
    print(content)
    return jsonify({"response":content})

    response = openai_api_call(content)
    return jsonify({"response":response}), 200


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

if __name__ == '__main__':
    #TODO: remove debug
    app.run(debug=True)