from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, Text, String

Base = declarative_base()

class FAQ(Base):
    __tablename__ = "chatbot_data"

    __table_args__ = {
        "comment": "FAQ dataset for chatbot training"
    }

    id = Column(Integer, primary_key=True, autoincrement=True)
    question = Column(Text)
    answer = Column(Text)
    type = Column(String(50))
