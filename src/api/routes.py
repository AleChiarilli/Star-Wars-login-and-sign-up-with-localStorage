"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import json
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


@api.route('/user', methods=['GET'])
def handle_hello():

    results = User.query.all()
    users_list = list(map(lambda item: item.serialize(),results))


    response_body = {
        "msg": "Hello, this is your GET /user response ",
        "results": users_list
    }

    return jsonify(response_body), 200

         #2. éste es el endpoint para consultar UN dato o usuario en la tabla, éste método puede devolver varios elementos con el
         #   mismo ID, si no se usa la función first()
@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    print(id)

    user = User.query.filter_by(id=id).first()
    data = user.serialize()
    

    return jsonify(data), 200


         #3. éste es el endpoint para crear un dato o usuario en la tabla
@api.route('/user', methods=['POST'])
def create_user():

    body = json.loads(request.data)

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'password' not in body:
        raise APIException('You need to specify the password', status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the email', status_code=400)
    # esta linea busca el is active y lo pondra por defecto en True
    is_active = request.json.get("is_active", True)
    user = User(email=body["email"], password=body["password"], is_active=is_active)
    # session es una palabra reservada de SQL-Alchemy
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": "The user has been created",
    }

    return jsonify(response_body), 200

    #4. éste es el endpoint para borrar un usuario en la tabla
@api.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    print(id)

    # el filter_by te identifica el usuario
    user = User.query.filter_by(id=id).first()
    print(user.serialize())
    # session es una palabra reservada de SQL-Alchemy
    db.session.delete(user)
    db.session.commit()

    response_body = {
        "msg": "El usuario ha sido borrado",
    }
    return jsonify(response_body), 200


# estos son los endpoints para los planetas
# ############################################
@api.route('/planets', methods=['GET'])
def handle_planets():

    results = Planets.query.all()
    planets_list = list(map(lambda item: item.serialize(),results))

    return jsonify(planets_list), 200


@api.route('/planets/<int:id>', methods=['GET'])
def get_planet(id):
    print(id)
    # éste es el pedido de un solo planeta, pero con el método get
    planet = Planets.query.get(id)
    data = planet.serialize()

    return jsonify(data), 200

@api.route('/planets', methods=['POST'])
def create_planet():

    body = json.loads(request.data)
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'name' not in body:
        raise APIException('You need to specify the name', status_code=400)
    if 'size' not in body:
        raise APIException('You need to specify the size', status_code=400)
    # esta linea busca el is active y lo pondra por defecto en True
    planet = Planets(name=body["name"], size=body["size"])
    # session es una palabra reservada de SQL-Alchemy
    db.session.add(planet)
    db.session.commit()

    response_body = {
        "msg": "El planeta ha sido creado",
    }

    return jsonify(response_body), 200


@api.route('/api/planets/<int:id>', methods=['DELETE'])
def delete_planet(id):
    print(id)

    # el filter_by te identifica el usuario
    planet = Planets.query.filter_by(id=id).first()
    print(planet.serialize())
    # session es una palabra reservada de SQL-Alchemy
    db.session.delete(planet)
    db.session.commit()

    response_body = {
        "msg": "El planeta ha sido borrado",
    }
    return jsonify(response_body), 200

# AQUÍ VIENEN LOS ENDPOINTS PARA LOS CHARACTERS
# ############################################
@api.route('/characters', methods=['GET'])
def handle_characters():
    results = Characters.query.all()
    characters_list = list(map(lambda item: item.serialize(),results))
    return jsonify(characters_list), 200


@api.route('/characters/<int:id>', methods=['GET'])
def get_character(id):
    print(id)
    # éste es el pedido de un solo planeta, pero con el método get
    character = Characters.query.get(id)
    data = character.serialize()
    return jsonify(data), 200


@api.route('/characters', methods=['POST'])
def create_character():
    body = json.loads(request.data)
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'name' not in body:
        raise APIException('You need to specify the name', status_code=400)
    if 'gender' not in body:
        raise APIException('You need to specify the gender', status_code=400)
    # esta linea busca el is active y lo pondra por defecto en True
    character = Characters(name=body["name"], gender=body["gender"])
    # session es una palabra reservada de SQL-Alchemy
    db.session.add(character)
    db.session.commit()
    response_body = {
        "msg": "the character has been created",
    }
    return jsonify(response_body), 200


@api.route('/api/characters/<int:id>', methods=['DELETE'])
def delete_character(id):
    print(id)
    # el filter_by te identifica el usuario
    character = Characters.query.filter_by(id=id).first()
    print(character.serialize())
    # session es una palabra reservada de SQL-Alchemy
    db.session.delete(character)
    db.session.commit()
    response_body = {
        "msg": "The character has been deleted",
    }
    return jsonify(response_body), 200
    
# estas son las rutas para el register, login

@api.route('/sign_up', methods=['POST'])
def sign_up():
    data = request.json
    taken = User.query.filter_by(email = data.get('email')).first()
    if not taken:
        user = User(email = data.get('email'), password = data.get('password'), is_active=True)
        db.session.add(user)
        db.session.commit()
        token = create_access_token(identity = user.id)
        return jsonify({'token':token , 'user':user.serialize() }), 200
    else:
        return jsonify({'error': 'This email is already been used'}),

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if not email or not password: 
        return jsonify({"msg": "Bad email or password"}), 401
    user = User.query.filter_by(email = email, password = password).first()
    if not user:
        return jsonify({"msg": "User doesn't exist"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token":access_token})