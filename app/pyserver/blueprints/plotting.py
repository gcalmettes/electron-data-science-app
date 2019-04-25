import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64


def createFig(x, y, nPoints=10, color="#00739D"):
    fig,ax = plt.subplots()
    ax.plot(x, y, color=color)

    nPoints = int(nPoints) if nPoints else 0
    if nPoints > 0:
      if nPoints >= len(x):
        idx = np.arange(len(x))
      else:
        idx = np.round(np.linspace(0, len(x)-1, nPoints)).astype(int)
      ax.plot(x[idx], y[idx], 'o', color=color)
    fig.tight_layout()
    return fig

def getFigPNG(nPoints):
    x = np.linspace(0, 10, 200)
    y = np.sin(x)
    fig = createFig(x, y, nPoints, "#00739D")

    buffer = io.BytesIO()
    fig.savefig(buffer, format='png')
    plt.close(fig)

    img_base64 = base64.b64encode(buffer.getvalue())
    img_url = base64.b64encode(buffer.getvalue()).decode('utf-8')
    # img_string = img_base64.decode('utf-8')#.replace('\n', '')
    img_string = f"data:image/png;base64,{img_url}"
    return img_string

def getFigSVG(nPoints):
    x = np.linspace(0, 10, 200)
    y = np.cos(x)
    fig = createFig(x, y, nPoints, "#FF4040")

    buffer = io.BytesIO()
    fig.savefig(buffer, format='svg')
    plt.close(fig)
    figdata = buffer.getvalue()
    return figdata







