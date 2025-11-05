from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from components.datasources.yahoo import get_yahoo_history
from components.indicators.ema import calculate_ema
from models.chart_data import ChartData

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/history", response_model=ChartData)
def get_history(symbol: str = "^GSPC", interval: str = "1d", range: str = "6mo"):
    return get_yahoo_history(symbol, interval, range)

@app.get("/api/indicator/ema")
def get_ema(period: int = 20, symbol: str = "^GSPC", interval: str = "1d", range: str = "6mo"):
    data = get_yahoo_history(symbol, interval, range)
    ema = calculate_ema(data.close, period)
    return {"timestamps": data.timestamps, "ema": ema}
