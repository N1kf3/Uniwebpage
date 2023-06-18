"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from bcrypt import gensalt
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from api.models import db, User, Student_Data, Studen_subject
from api.utils import generate_sitemap, APIException

from werkzeug.security import generate_password_hash, check_password_hash
api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/handle_user_data', methods=['POST'])
def handle_user_data():
    data = request.json
    if request.method == 'POST':
        for info in data:
            new_line_data = Student_Data()
            new_line_data.cedula = info['Cedula']
            new_line_data.nombre = info['Nombre']
            new_line_data.apellido = info['Apellido']
            new_line_data.carrera = info['Carrera']
            db.session.add(new_line_data)
        db.session.commit()
        return jsonify(data), 201


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
            db.session.add(new_user)
            db.session.commit()
            return jsonify(data), 201
    else:
        return jsonify({
            "Error": "El usuario no existe en el listado de estudiantes"
        }), 400


@api.route('/login', methods=['POST'])
def handle_login():
    data = request.json
    print(data)
    if data['cedula'] == 'admin':
        return jsonify({
            "jwt_token": data['password']
        }), 200
    else:
        user = User.query.filter_by(user_ID=data['cedula']).one_or_none()
        if user is None:
            return jsonify({
                "error": "Datos incorrectos"
            }), 400
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


@api.route('/handle_signature_data', methods=['POST'])
def handle_signature_data():
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
