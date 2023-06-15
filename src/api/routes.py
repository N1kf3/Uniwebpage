"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Student_Data
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/handle_user_data', methods=['POST', 'GET'])
def handle_user_data():
    data = request.json
    print("esta es la data", data)
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
