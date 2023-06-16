"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from bcrypt import gensalt
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Student_Data
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
            cedula=data['Cedula']).first()
        if cedula_check is not None:
            return jsonify({
                "nombre": cedula_check.nombre,
                "apellido": cedula_check.apellido,
                "carrera": cedula_check.carrera
            }), 201
        else:
            return jsonify({
                "error": 'el usuario no existe en la base de datos '
            }), 400


@api.route('/signup', methods=['POST'])
def handle_signup():
    data = request.json
    print(data)
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
