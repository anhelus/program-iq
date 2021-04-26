Bella intro...

# Cosa è una Pipeline di Machine Learning?

Così come le equivalenti nl mondo reale, le ML pipeline soo i vettori che connettono un processo con un altro, in modo che ci sia solo una giunzione tra l'ingresso e l'uscita.

* ingestion
* cleaning
* preprocessing
* modeling
* deployment

quello che fa una ML pipeline:

* data preparation, incluso l'importare, validare e data cleaning, munging, transformation, normalization e staging
* training configuation, inclusa la parametrizzazione degli argomenti, i percorsi dei file, ed il logging/reporting delle configuazioni
* addestramento e validazione efficiente e ripetutta dei dati. l'efficienza uò venire da sottinsiemi specifici di dati; diverse risorse di calcolo hardwrea, procedssi distribuiti, e monitoring dei progressi
* deployment, incluso versioning, scaling, provisioning e controllo degli accessi

Approfondimento:


An Azure Machine Learning pipeline is an independently executable workflow of a complete machine learning task. Subtasks are encapsulated as a series of steps within the pipeline. An Azure Machine Learning pipeline can be as simple as one that calls a Python script, so may do just about anything. Pipelines should focus on machine learning tasks such as:

Data preparation including importing, validating and cleaning, munging and transformation, normalization, and staging
Training configuration including parameterizing arguments, filepaths, and logging / reporting configurations
Training and validating efficiently and repeatedly. Efficiency might come from specifying specific data subsets, different hardware compute resources, distributed processing, and progress monitoring
Deployment, including versioning, scaling, provisioning, and access control
Independent steps allow multiple data scientists to work on the same pipeline at the same time without over-taxing compute resources. Separate steps also make it easy to use different compute types/sizes for each step.

After the pipeline is designed, there is often more fine-tuning around the training loop of the pipeline. When you rerun a pipeline, the run jumps to the steps that need to be rerun, such as an updated training script. Steps that do not need to be rerun are skipped.

With pipelines, you may choose to use different hardware for different tasks. Azure coordinates the various compute targets you use, so your intermediate data seamlessly flows to downstream compute targets.

You can track the metrics for your pipeline experiments directly in Azure portal or your workspace landing page (preview). After a pipeline has been published, you can configure a REST endpoint, which allows you to rerun the pipeline from any platform or stack.

In short, all of the complex tasks of the machine learning lifecycle can be helped with pipelines. Other Azure pipeline technologies have their own strengths. Azure Data Factory pipelines excels at working with data and Azure Pipelines is the right tool for continuous integration and deployment. But if your focus is machine learning, Azure Machine Learning pipelines are likely to be the best choice for your workflow needs.

<!-- da qui riprendo io -->

Vedremo quindi le basi delle pipeline di scikit-learn, scrivendo delle funzioni Transformer personalizzate che si ocupano di Data Cleaning, Feature Engineering, e Model Training.

## Descrizione dei dati

prendiamo un dataset di esempio, come lo StarType Classification da Kaggle. Questo dataset ha un grosso mix di categorical e continuous variables.

leggiamo il dataset

column_names = ['Temperature', 
               'RelativeLuminosity',
               'RelativeRadius',
               'ApparentMagnitude',
               'Color',
               'SpectralClass',
               'Type']
df = pd.read_csv('./archive/Stars.csv', names=column_names, header=0)

print(df.shape)
df.head()

la nsotra variabile target è Type, che può essere Nana rossa (0), Nana marrone (1), Nana bianca (2), sequenza principale (), supergigante (4) ed ipergigante (5).

ogni classe ha, inoltre esattamente 40 osservazioni, il che la rendono un problema perfettamente bilanciato

PRIMA EDA CON D-TALE

Data preprocessing

ecco alcune considerazioni

1. non ci sono dei missing values nel dataset
2. ci sono degli outlier. per cui è il caso di usare delle strategie di outlier detection, magari anche semplicemente usando un range interquartile (dal 20th all'80)
3. vi è una skew alle feature, quidi non si possono applicare semplicemente dei metodi lineari
4. scaling - lo spazio è poco omogeneo, per cui serve lo scaling. dal momento che voglio che il mio modello veda gli outlier, ma mantenga il tradeoff varianza - bias, si applica RobustScalar ai dati.

def remove_outliers(df):
    for col in df.columns:
        Q1 = df[col].quantile(0.2) # Ideally it is (.25 - .75 but I want the model to see outliers)
        Q3 = df[col].quantile(0.8)
        IQR = Q3 - Q1
        # print(col, IQR)
        # Adjusting outliers with their percentile values

        low = Q1 - 1.5 * IQR
        high = Q3 + 1.5 * IQR

        df[col] = np.where(df[col] < low, low, df[col])
        df[col] = np.where(df[col] > high, high, df[col])

    return df

## feature engineering

si possono effettuare tre test per rivelare l'importanza delle feature all'interno della pipeline

1. plot di correlazione (pearson's per i casi di variabili continue-continue)
2. correlation ratio per casi categorical-continous
- cramer's V o Theil's U per categorical-categorical

analisi delle varianze (ANOVA): mostra la significatività rispetto al target


import statsmodels.api as sm
import statsmodels.stats as sms

for col in cols:
    data = sm.formula.ols(col+"~ Type", data=df).fit()
    pval = sms.anova.anova_lm(data)["PR(>F)"][0]
    print(f"Pval for {col}: {pval}")

vediamo il p-value, cerchiamo quello più alto

3. chi-squared test per analisi categorica

from sklearn.feature_selection import chi2

chi_scores = chi2(df[['Color', 'SpectralClass']], df[target])

p_values = pd.Series(chi_scores[1],index = df[['Color', 'SpectralClass']].columns)
p_values.sort_values(ascending = False , inplace = True)
print(p_values)

## vediamo i transofrmers

i transformer fanno parte delle pipeline e ci permettono di efettuare il plug-and-play con diverse componenti. Per iniziare, importiamo due classi base:

BaseEstimator e TransofrmerMixin

Queste classe sono come il collante tra le classi custom. I base estimator danno alla pipeline i metodi get_params e set_params che tutti gli stimatori sklearn richiedono. Invece, il TransformerMixin dà il metodo fit_transform.

Per prevenire data leakage e drift, mè meglio splittare inizialmente il nostro dataset di trainign e testing. Ci sono diversi vantaggi, in particolare:

1. pre-processing: stiamo riempendo ivalori mancanti e rimuovendo gli outlier; come farà il modello a genralizzare sui dati non visti nel mondo reale?
2. feature scaling

X_train, X_test, y_train, y_test = train_test_split(df.drop(columns='Type'), df['Type'],test_size=0.30,                      random_state=1,stratify= df['Type'])

ad esempio, in questo caso si è usato lo Stratified Split perché si vuole fare in modo che i dataset di traing e test rappresentino tutte le label target. Ci soo delle chance che il training dataset non possa mai consistere di alcune categorie.

## Transformer per feature numeriche

possiamo sempe usare l'implementazione di default delle classi Scalar ed Imputer. Ma cosa sccede se il nostro caso richiede un'implementazioen custom?

abbiamo bisogno di popolare due metodi: fit (preferiamo step di calcolo come misura media, mediana e varianza) e transform (preferiamo l'applicazione delle trasformazioni)

il vantaggio di usare questo è che abbiamo un controllo assouto. Inoltre, 

class NumericalFeatureCleaner(BaseEstimator, TransformerMixin):
    '''
    This Class performs all the transformation jobs on the numerical features.
    In my use case, I have to do housekeeping tasks for Outliers and data normalizatoion.
    I have used RobustScalar to preserve the outliers and 
    clipped outliers with their 20th and 80th percentile values.
    '''
    def __init__(self):
        self._scalar = RobustScaler() # I am just scaling numerical Features
        return None

        
    def fit(self, X, y =None):
        X = self._scalar.fit(X) # We just fit our scalar once.
        return self

    
    def remove_outliers(self, X):
        for col in X.columns:
            Q1 = df[col].quantile(0.2)
            Q3 = df[col].quantile(0.8)
            IQR = Q3 - Q1
            # Adjusting outliers with their percentile values

            low = Q1 - 1.5 * IQR
            high = Q3 + 1.5 * IQR

            X[col] = np.where(X[col] < low, low, X[col])
            X[col] = np.where(X[col] > high, high, X[col])

        return X


    def transform(self, X, y = None):
       
        # Removing Outliers
        X = self.remove_outliers(X)

        # When Transform is called, it uses the calculations from fit method.
        X = pd.DataFrame(self._scalar.transform(X), columns=X.columns, index=X.index)
        
        return X
	

	class CategoricalFeatureCleaner(BaseEstimator, TransformerMixin):
  '''
  The skeleton of this class will be similar to the previous one. We have 
  fit and Transform methods to do the fancy stuff. 
  
  We can define any custom function for internal feature as well. For Instance,
  I have implemented get_features() to get list of dummified feature names and
  catToDummy for dummification.
  '''
    def __init__(self):
        return None
    
    
    def fit(self, X, y=None):
        return self
    
    
    def get_features(self):
        return self.column_names
    
    
    def catToDummy(self, X):
        X = pd.get_dummies(X)
        self.column_names = X.columns
        return X
    
    
    def __formatColor(self, X):
        X = re.sub("[^A-Za-z]", "", x.lower())
        return X
    
    
    def transform(self, X, y=None):
        
        X = self.catToDummy(X)
        
        return X


ora dobbiamo unire queste due classi tra loro. Scikit-learn fornisce due funzionalità:

* FeatureUnion: concatena ir isultati di più transformer. Questo stimatorei applica una lista di trasformazioni in parallelo ai dati in input, quindi concatena i risultati. Questo è utile per combianare diverse meccanismi di feature extraction in un singolo transformer.

* ColumnTransformer: applica dei trasformer alle colonen di un array o dataframe pandas. questo stimatore permette a diverse colonne o sottoinsiemi di colonne dell'input di essere trasformate in maniera separata, e le feature genrate da ogni trasformer saranno concatenate per formare un singolo spazio delle feature. Questo è utile per dati eterogenei o colonnari, per combianre diversi meccanismi di trasformazione eo feature extraction in un singolo trasnfomratore.

In our use case, I have created a base transformer so that categorical and numerical features are processed separately. So, I will be using ColumnTransformer.
Drum-roll!
We need a list of features first, obviously. 🙌
numerical_columns = ['Temperature', 'RelativeLuminosity', 'RelativeRadius', 'ApparentMagnitude']
categorical_columns = ['SpectralClass']

Awesome. It is done!
Let us test it using a Kernel-based Model. Since my use-case is multi-class classification, I am going for KNearestNeighbors as my base model.
I have used K-Fold cross-validation as well. But, in my heart, I know that it will overfit since the size of training data is 110. But, that is not the concern right now. Overfitting will soon resolve it with hyperparameter tuning and model iterations.
Model Training
Once you have the processing transformed up and running, you can plug it into the training pipeline. You can include all sorts of fancy steps, including GridSearchCV, Cross-validation, and create an ensemble of models in a chain.

result = cross_val_score(model ,X_train, y_train, cv = KFold(n_splits=3), error_score=-1)
 
print("Avg accuracy: {}".format(max(result)))
Avg accuracy: 0.9107142857142857
Hey! It works, and Yay, you’ve made it. I am certain these steps are enough to kickstart your path towards pipelines. After all, we are all Mario and Luigi! (pipeline — game — please, get the joke!)
Finally!
Mission Accomplished! Today, we created the basic skeleton in scikit-learn for any data science deep-dive. We performed data cleaning, normalization, and data transformation using custom Transform elements.
Next, we plugged individual channels of the pipeline (categorical and numerical) using ColumnTransfomer, which glues two subsets of data together. lastly, we trained a basic model with our pipeline.
I hope this blog clears some of the basics about custom transformers. They are the backbone of any modern ML applications and it would be best if you can include them in your workflow.