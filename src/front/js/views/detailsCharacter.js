import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const DetailsCharacter = () => {
  const { actions, store } = useContext(Context);
  const params = useParams();
  useEffect(() => {
    // Solicitud GET (Request).
    actions.obtenerPersonaje(params.theid);
  }, []);
  return (
    <div className="d-flex">
      <div>
        <img
          src={
            "https://starwars-visualguide.com/assets/img/characters/" +
            params.theid +
            ".jpg"
          }
          // className="d-flex"
          alt="..."
          width="400px"
        />
      </div>

      <div className="card" style={{ width: "auto", flex: "auto" }}>
        <div className="card-body">
          <h1>{store.character && store.character.name}</h1>
          <p className="card-text">
            {store.description && store.character.description}
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h6>Appeareances</h6>
            </div>
            <div className="col-md-2">
              <h6>Birth Year</h6>
            </div>
            <div className="col-md-1">
              <h6>Gender</h6>
            </div>
            <div className="col-md-1">
              <h6>Hair Color</h6>
            </div>
            <div className="col-md-1">
              <h6>Skin Color</h6>
            </div>
            <div className="col-md-1">
              <h6>Height</h6>
            </div>
            <div className="col-md-1">
              <h6>Mass</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              {store.character && store.character.name}
            </div>
            <div className="col-md-2">
              {store.character && store.character.birth_year}
            </div>
            <div className="col-md-1">
              {store.character && store.character.gender}
            </div>
            <div className="col-md-1">
              {store.character && store.character.hair_color}
            </div>
            <div className="col-md-1">
              {store.character && store.character.skin_color}
            </div>
            <div className="col-md-1">
              {store.character && store.character.height}
            </div>
            <div className="col-md-2">
              {store.character && store.character.mass}
            </div>
          </div>
        </div>

        <div className="card-body">
          <Link to={`/`}>
            <button className="btn btn-primary">Go Back</button>
          </Link>
          <button className="btn btn-primary">
            <a
              href="https://starwars-visualguide.com/#/characters?page=1"
              target="_blank"
              className="text-white"
            >
              Go to encyclopedia
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};
