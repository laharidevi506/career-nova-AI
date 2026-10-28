from database import SessionLocal
from models import User

db = SessionLocal()

try:
    users = db.query(User).all()

    print("Total registered users:", len(users))

    for user in users:
        print("ID:", user.id)
        print("Name:", user.full_name)
        print("Email:", user.email)
        print("-------------------")

finally:
    db.close()

