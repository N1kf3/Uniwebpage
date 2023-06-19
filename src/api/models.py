from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    user_ID = db.Column(db.Integer, unique=True, nullable=False)
    career = db.Column(db.String(80), unique=False, nullable=False)
    salt = db.Column(db.String(500), unique=True, nullable=False)
    hashed_password = db.Column(db.String(500), unique=False, nullable=False)
    role = db.Column(db.String(80), unique=False, nullable=False)
    materia = db.relationship('Studen_grade', back_populates="student")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "user_ID": self.user_ID,
            "career": self.career,
            "role": self.role,
            "materia": [mat.serialize() for mat in self.materia]
        }


class Student_Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cedula = db.Column(db.Integer, unique=True, nullable=False)
    nombre = db.Column(db.String(80), unique=False, nullable=False)
    apellido = db.Column(db.String(80), unique=False, nullable=False)
    carrera = db.Column(db.String(80), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "cedula": self.cedula,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "carrera": self.carrera
        }


class Studen_subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    semestre = db.Column(db.String(80), unique=False, nullable=False)
    materias = db.Column(db.String(80), unique=False, nullable=False)
    codigo = db.Column(db.Integer, unique=True, nullable=False)
    prelaciones = db.Column(db.String(80), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "semestre": self.semestre,
            "materias": self.materias,
            "codigo": self.codigo,
            "prelaciones": self.prelaciones
        }


class Studen_grade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    notas = db.Column(db.Integer, unique=True, nullable=False)
    materias = db.Column(db.String(80), unique=False, nullable=False)
    codigo = db.Column(db.Integer, unique=True, nullable=False)
    user_id = db.Column(db.ForeignKey('user.id'))
    student = db.relationship('User', back_populates="materia")

    def serialize(self):
        return {
            "id": self.id,
            "notas": self.notas,
            "materias": self.materias,
            "codigo": self.codigo,
            "user_id": self.user_id,

        }
