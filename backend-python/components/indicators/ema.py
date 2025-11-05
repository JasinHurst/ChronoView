import pandas as pd

def calculate_ema(close_prices: list[float], period: int = 20) -> list[float]:
    if not close_prices:
        return []
    series = pd.Series(close_prices)
    ema = series.ewm(span=period, adjust=False).mean()
    return ema.round(2).tolist()
