from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# MySQL database connection details

DB_USER = "root"
DB_PASSWORD = ""
DB_HOST = "localhost"
DB_PORT = "3306"
DB_NAME = "career_nova_ai"

# Database connection URL

DATABASE_URL = (
f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# Create database engine

engine = create_engine(
DATABASE_URL,
echo=True
)

# Create database sessions

SessionLocal = sessionmaker(
autocommit=False,
autoflush=False,
bind=engine
)

# Base class for database models

Base = declarative_base()
