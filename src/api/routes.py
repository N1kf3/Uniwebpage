"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Student_Data, Studen_subject, Studen_grade
from api.utils import generate_sitemap, APIException
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from bcrypt import gensalt
from werkzeug.security import generate_password_hash, check_password_hash
api = Blueprint('api', __name__)

# handles user file upload


@api.route('/handle_user_data', methods=['POST'])
def handle_user_data():
    data = request.json
    for info in data:
        oldStudent = Student_Data.query.filter_by(
            cedula=info['Cedula']).one_or_none()
        if oldStudent is None:
            new_line_data = Student_Data()
            new_line_data.cedula = info['Cedula']
            new_line_data.nombre = info['Nombre']
            new_line_data.apellido = info['Apellido']
            new_line_data.carrera = info['Carrera']
            db.session.add(new_line_data)
        db.session.commit()
    return jsonify(data), 201

# handles the retreive of information for the signup


@api.route('/check_ID', methods=['POST'])
def handle_check_ID():
    data = request.json
    if request.method == 'POST':
        cedula_check = Student_Data.query.filter_by(
            cedula=data['cedula']).first()
        cedula_user = User.query.filter_by(
            user_ID=data['cedula']).one_or_none()
        if cedula_check is not None and cedula_user is None:
            return jsonify({
                "nombre": cedula_check.nombre,
                "apellido": cedula_check.apellido,
                "carrera": cedula_check.carrera
            }), 201
        else:
            if cedula_user is None:
                return jsonify({
                    "error": 'el usuario no existe en la base de datos '
                }), 400
            else:
                return jsonify({
                    "error": 'el usuario ya tiene una cuenta creada '
                }), 400

# handles the user signup


@api.route('/signup', methods=['POST'])
def handle_signup():
    data = request.json
    cedula_user = User.query.filter_by(user_ID=data['cedula']).one_or_none()
    cedula_student = Student_Data.query.filter_by(
        cedula=data['cedula']).one_or_none()
    check_admin = data['carrera']
    if check_admin != "admin":
        check_admin = 'student'
    if cedula_student is not None:
        if cedula_user is not None:
            return jsonify({
                "Error": "El usuario ya existe"
            }), 400
        else:
            salt = str(gensalt())
            password_hash = generate_password_hash(data['password']+salt)
            new_user = User()
            new_user.email = data['email']
            new_user.name = data['nombre']
            new_user.last_name = data['apellido']
            new_user.user_ID = data['cedula']
            new_user.career = data['carrera']
            new_user.role = check_admin
            new_user.salt = salt
            new_user.hashed_password = password_hash
            new_user.is_active = True
            db.session.add(new_user)
            db.session.commit()
            return jsonify(data), 201
    else:
        return jsonify({
            "Error": "El usuario no existe en el listado de estudiantes"
        }), 400

# handles the singin of the user


@api.route('/login', methods=['POST'])
def handle_login():
    data = request.json
    if data['cedula'] == 'admin':
        new_admin = Student_Data()
        new_admin.cedula = 1
        new_admin.nombre = "admin"
        new_admin.apellido = " "
        new_admin.carrera = "admin"
        db.session.add(new_admin)
        db.session.commit()
        return jsonify({

        }), 200
    else:
        user = User.query.filter_by(user_ID=data['cedula']).one_or_none()
        if user is None:
            return jsonify({
                "error": "Datos incorrectos"
            }), 400
        if user.is_active:
            correct_password = check_password_hash(
                user.hashed_password, data['password']+user.salt)
            if not correct_password:
                return jsonify({
                    "error": "Datos incorrectos"
                }), 400
            else:
                jwt_token = create_access_token(identity=user.id)
                return jsonify({
                    "jwt_token": jwt_token
                }), 200
        else:
            return jsonify({
                "error": "usuario deshabilitado"
            }), 400

# checks the jwt


@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        "user": user.serialize()
    }), 200

# handles the upload of all the subjects


@api.route('/handle_subject_data', methods=['POST', 'GET'])
def handle_subject_data():
    data = request.json
    if request.method == 'POST':
        for info in data:
            new_line_data = Studen_subject()
            new_line_data.semestre = info['semestre']
            new_line_data.materias = info['materias']
            new_line_data.codigo = info['codigo']
            new_line_data.prelaciones = info['prelaciones']
            db.session.add(new_line_data)
        db.session.commit()
        return jsonify(data), 201

# retreives the information of all the subjects


@api.route('/handle_info', methods=['GET'])
def handle_info():
    subjects = [{}]
    subject = Studen_subject.query.all()
    for sig in subject:
        subjects.append({
            "semestre": sig.semestre,
            "materias": sig.materias,
            "codigo": sig.codigo,
            "prelaciones": sig.prelaciones
        })
    return jsonify({
        "subject": subjects
    }), 201

# handles the adition of subjectos to the user


@api.route('/upload_subject', methods=['POST'])
def handle_upload_subject():
    data = request.json
    for subject in data[1:]:
        new_line_subject = Studen_grade()
        new_line_subject.user_id = data[0]['UserID']
        new_line_subject.notas = 0
        new_line_subject.materias = subject['materias']
        new_line_subject.codigo = subject['codigo']
        db.session.add(new_line_subject)
    db.session.commit()
    return jsonify(data), 201

# retreives the user information to manipulation


@api.route('/get_student', methods=['POST'])
def handle_get_student():
    data = request.json
    user = User.query.filter_by(user_ID=data['cedula']).one_or_none()
    if user is not None:
        return jsonify({
            "user": user.serialize()
        }), 201
    else:
        return jsonify({
            "Error": "Usuario no registrado"
        }), 400

# updates the grades of the subjects os said user


@api.route('/update_subject/<int:id>', methods=['POST'])
def handle_update_subject(id):
    subjects = []
    data = request.json
    user = User.query.filter_by(user_ID=id).one_or_none()
    materia = Studen_grade.query.filter_by(user_id=user.id).all()
    for i in materia:
        mat = i.serialize()
        subjects.append(mat)
    for newGrade in data:
        for userGrade in subjects:
            if userGrade['notas'] == "0" and newGrade['codigo'] == userGrade['codigo']:
                materiaGrade = Studen_grade.query.filter_by(
                    user_id=user.id, codigo=newGrade['codigo'], notas="0").one_or_none()

                materiaGrade.notas = newGrade['notas']
                db.session.commit()

    return jsonify({
        "Success": "materias actualizadas"
    }), 201

# handles the disable/enable of users


@api.route('/disable_user/<int:id>', methods=['POST'])
def handle_disable_user(id):
    data = request.json
    user = User.query.filter_by(user_ID=id).one_or_none()
    user.is_active = data['is_active']
    db.session.commit()
    return jsonify({
        "Success": "usuario modificado"
    }), 201
