from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask import jsonify
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
api = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    favorite_planets = db.relationship('FavoritePlanets', backref='user', lazy=True, cascade="all, delete-orphan")
    favorite_characters = db.relationship('FavoriteCharacters', backref='user', lazy=True, cascade="all, delete-orphan")
              # clase a la que haces referencia , 
    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }




class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    size = db.Column(db.Integer, unique=False, nullable=False)
    favorite_planets = db.relationship('FavoritePlanets', backref='planets', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return '<Planets %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            # do not serialize the password, its a security breach
        }

class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    gender = db.Column(db.String, unique=False, nullable=False)
    favorite_characters = db.relationship('FavoriteCharacters', backref='characters', lazy=True, cascade="all, delete-orphan")


    def __repr__(self):
        return '<Characters %r>' % self.name
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            # do not serialize the password, its a security breach
        }

class FavoritePlanets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'))

    def __repr__(self):
        return '<FavoritePlanets %r>' % self.planet_id
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.user_id,
            # do not serialize the password, its a security breach
        }
    
class FavoriteCharacters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'))

    # aquí las funciones para representarlo y serializarlo
    def __repr__(self):
        return '<FavoriteCharacters %r>' % self.character_id
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.user_id,
            # do not serialize the password, its a security breach
        }

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)