import pandas as pd
import numpy as np
import time

def getDf(name):
    df = pd.DataFrame({ f"data{a+1}": np.random.rand(10) for a in range(5) })
    time.sleep(2)
    return df.to_string(index=False)
    

def sayHello(name):
    return f"Hello, {name}"







