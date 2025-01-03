from nltk import *
from nltk.corpus import stopwords
import asyncio
import spacy


word_lemmatizer = WordNetLemmatizer()

ner = spacy.load("en_core_web_sm")

def add_custom_rules(nlp):
    ruler = nlp.add_pipe("entity_ruler", last=True)
    
    patterns = [
        {"label": "INSTRUCTION", "pattern": [{"lower": "instruction"}]},
        {"label": "PRODUCT", "pattern": [{"lower": "pressure"}, {"lower": "cooker"}]}
    ]
    
    ruler.add_patterns(patterns)

add_custom_rules(ner)


async def ner_text(page_list):
    ner_results  = {}
    for sentence in page_list:
        doc = ner(sentence)
        for ent in doc.ents:
            if ent.label_ not in ner_results:
                if ent.label_ != "CARDINAL":
                    ner_results[ent.label_] = []
            if ent.label_ == "PERSON" and len(ent.text.split()) > 1: 
                ner_results[ent.label_].append(ent.text)
            elif ent.label_ != "PERSON" and ent.label_ !="CARDINAL":
                ner_results[ent.label_].append(ent.text)

    return ner_results            
            


async def tokenize_text(page_number , paragraph):
    
    tokenized_sentences  = sent_tokenize(paragraph)
    processed_sentences = []
   
    for sentence in tokenized_sentences :
        words = word_tokenize(sentence) 
        words = [word_lemmatizer.lemmatize(word) for word in words if word not in set(stopwords.words('english')) ]
        processed_sentences.append(' '.join(words))
    
    processed_results = await ner_text(processed_sentences)
    return {page_number:processed_results}

   


async def nlp_text(data):

    results = [asyncio.create_task(tokenize_text(page_number , paragraph)) for page_number,paragraph in data.items()]
    nlp_results = await asyncio.gather(*results)
    return nlp_results
