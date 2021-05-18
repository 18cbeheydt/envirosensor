import pandas as pd
import plotly.express as px

df = pd.read_csv('enviro_data.csv')

fig = px.line(df, x = 'Time', y = 'Temperature', title='Temp v Time')
fig.show()