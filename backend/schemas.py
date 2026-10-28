from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

    education: str | None = Field(default=None, max_length=100)
interests: str | None = Field(default=None, max_length=1000)
skills: str | None = Field(default=None, max_length=1000)
goals: str | None = Field(default=None, max_length=1000)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

