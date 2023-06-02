import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const Details = () => {
  const { actions, store } = useContext(Context);
  const params = useParams();
  useEffect(() => {
    // Solicitud GET (Request).
    actions.obtenerPlaneta(params.theid);
  }, []);
  return (
    <div className="d-flex">
      <div>
          <img
            src={
              "https://starwars-visualguide.com/assets/img/planets/" +
              (params.theid +1) +
              ".jpg"
            }
            // className="d-flex"
            alt="..."
            width="400px"
          />
      </div>

      <div className="card" style={{ width: "auto", flex: "auto" }}>
        <div className="card-body">
          <h1>{store.planet && store.planet.name}</h1>
          <p className="card-text">
            {store.planet && store.planet.description}
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h6>Diameter</h6>
            </div>
            <div className="col-md-2">
              <h6>Rotation Period</h6>
            </div>
            <div className="col-md-1">
              <h6>Orbital Period</h6>
            </div>
            <div className="col-md-1">
              <h6>Gravity</h6>
            </div>
            <div className="col-md-1">
              <h6>Population</h6>
            </div>
            <div className="col-md-1">
              <h6>Climate</h6>
            </div>
            <div className="col-md-1">
              <h6>Terrain</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              {store.planet && store.planet.diameter}
            </div>
            <div className="col-md-2">
            {store.planet && store.planet.rotation_period}
            </div>
            <div className="col-md-1">
            {store.planet && store.planet.orbital_period}
            </div>
            <div className="col-md-1">
            {store.planet && store.planet.gravity}
            </div>
            <div className="col-md-1">
            {store.planet && store.planet.population}
            </div>
            <div className="col-md-1">
            {store.planet && store.planet.climate}
            </div>
            <div className="col-md-2">
            {store.planet && store.planet.terrain}
            </div>
          </div>
        </div>

        <div className="card-body">
          <Link to={`/`}>
            <button className="btn btn-primary">Go Back</button>
          </Link>
          <button className="btn btn-primary">
            <a
              href="https://starwars-visualguide.com/#/planets?page=1"
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
