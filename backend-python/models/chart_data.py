from pydantic import BaseModel
from typing import List, Optional

class ChartData(BaseModel):
    timestamps: List[str]
    open: List[float]
    high: List[float]
    low: List[float]
    close: List[float]
    volume: Optional[List[float]] = None
