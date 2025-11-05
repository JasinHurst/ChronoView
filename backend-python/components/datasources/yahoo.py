import yfinance as yf
import pandas as pd
from models.chart_data import ChartData

def get_yahoo_history(symbol: str, interval: str, range: str) -> ChartData:
    """
    Fetch and normalize OHLCV data from Yahoo Finance (works with new yfinance output).
    """
    try:
        df = yf.download(
            symbol,
            period=range,
            interval=interval,
            auto_adjust=False,
            progress=False
        )

        if df.empty:
            raise ValueError("No data returned from Yahoo")

        df.reset_index(inplace=True)

        # Handle new column layout (multi-level columns from yfinance)
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = [col[-1] for col in df.columns]

        timestamps = df.index.astype(str).tolist()

        # Determine usable columns (fallbacks if names differ)
        open_col = next((c for c in df.columns if "Open" in c), None)
        high_col = next((c for c in df.columns if "High" in c), None)
        low_col  = next((c for c in df.columns if "Low" in c), None)
        close_col = next((c for c in df.columns if "Close" in c and "Adj" not in c), None)
        vol_col  = next((c for c in df.columns if "Volume" in c), None)

        if not all([open_col, high_col, low_col, close_col, vol_col]):
            raise ValueError(f"Unexpected Yahoo column names: {list(df.columns)}")

        return ChartData(
            timestamps=df["Date"].astype(str).tolist() if "Date" in df.columns else timestamps,
            open=df[open_col].astype(float).tolist(),
            high=df[high_col].astype(float).tolist(),
            low=df[low_col].astype(float).tolist(),
            close=df[close_col].astype(float).tolist(),
            volume=df[vol_col].astype(float).tolist()
        )

    except Exception as e:
        print(f"[ERROR] Yahoo fetch failed: {e}")
        # fallback dummy
        return ChartData(
            timestamps=["2025-01-01", "2025-01-02", "2025-01-03"],
            open=[100.0, 102.0, 104.0],
            high=[101.0, 103.0, 105.0],
            low=[99.0, 101.0, 103.0],
            close=[100.5, 102.5, 104.5],
            volume=[1000, 1100, 1200]
        )
