import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import pickle


# load clean data#

df=pd.read_csv('../data/cleaned_dataset.csv')


#only keep fake postings for retireval 
#want to detect similar scam jobs 
fake_df=df[df['fraudulent']==1].reset_index(drop=True)

print(f"Total fake postings for index: {len(fake_df)}")

#load sentnce trasnformer model

print("loading model")
model=SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

#generate embeddings 

print("Genrating embeddings..")

embeddings=model.encode(fake_df['clean_text'].tolist(),show_progress_bar=True)

#convert to float 32
embeddings = np.array(embeddings).astype('float32')

#build  FAISS index

dimension=embeddings.shape[1]
index=faiss.IndexFlatL2(dimension)
index.add(embeddings)

print(f"FAISS index built with { index.ntotal} vectors")

#save index and fake postings text

faiss.write_index(index,    '../models/faiss_index.bin')
fake_df[['title', 'clean_text']].to_csv('../models/fake_postings.csv', index=False)

print("FAISS index saved to models/")
