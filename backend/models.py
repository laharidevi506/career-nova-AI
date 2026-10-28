from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    ForeignKey,
    Date,
    Float,
)
from sqlalchemy.sql import func
from database import Base


# =========================================================
# USER MODEL
# =========================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(
        String(150),
        unique=True,
        index=True,
        nullable=False
    )

    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default="student")

    education = Column(String(100), nullable=True)

    interests = Column(String(1000), nullable=True)

    skills = Column(String(1000), nullable=True)

    goals = Column(String(1000), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


# =========================================================
# MODULE 6: LEARNING PROGRESS MODEL
# =========================================================

class LearningProgress(Base):
    __tablename__ = "learning_progress"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    task_title = Column(
        String(200),
        nullable=False
    )

    category = Column(
        String(100),
        nullable=False,
        default="General"
    )

    is_completed = Column(
        Boolean,
        nullable=False,
        default=False
    )

    study_date = Column(
        Date,
        nullable=False,
        server_default=func.current_date()
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    completed_at = Column(
        DateTime(timezone=True),
        nullable=True
    )
# =========================================================
# MODULE 7: INTERNSHIP PORTAL MODEL
# =========================================================

class Internship(Base):
    __tablename__ = "internships"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)
    company_name = Column(String(200), nullable=False)
    description = Column(String(3000), nullable=False)

    required_skills = Column(String(1000), nullable=True)
    location = Column(String(200), nullable=True)
    work_mode = Column(String(50), nullable=True)

    stipend = Column(String(100), nullable=True)

    application_url = Column(String(1000), nullable=False)
    source_url = Column(String(1000), nullable=True)

    deadline = Column(Date, nullable=True)

    # Pending verification until reviewed
    verification_status = Column(
        String(30),
        nullable=False,
        default="pending"
    )

    # open, expired, closed
    opportunity_status = Column(
        String(30),
        nullable=False,
        default="open"
    )

    # manual or automatic
    added_via = Column(
        String(20),
        nullable=False,
        default="manual"
    )

    last_verified_at = Column(DateTime(timezone=True), nullable=True)

    created_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
