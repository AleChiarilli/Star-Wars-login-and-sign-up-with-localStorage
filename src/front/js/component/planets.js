import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

// acá en este archivo tengo que consumir el contexto del store.
// useEffect con observador vacío

export const Planets = () => {
  const { actions, store } = useContext(Context);
  const addFavorite = (planet) => {
    console.log(planet);
    actions.addFavoritePlanet(planet)
  };
  useEffect(() => {
    // Solicitud GET (Request).
    actions.obtenerPlanetas();
  }, []);
  const carrouselButton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <h1 className="display-3" style={{ textAlign: "center" }}>
        Planets
      </h1>
      <div className="row " style={{ justifyContent: "center" }}>
        <div className="col-md-8">
          <div
            id="carouselExampleCaptions1"
            className="carousel slide shadow-lg mb-5 bg-white rounded"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions1"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              {carrouselButton.map((item, index) => {
                return (
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions1"
                    data-bs-slide-to={`${index + 1}`}
                    aria-label={`Slide ${index + 2}`}
                  ></button>
                );
              })}
            </div>
            <div className="carousel-inner">
              {store.planets?.map((planet, index) => {
                if (index == 0) {
                  return (
                    <div key={planet.uid} className="carousel-item active">
                      <img
                        src={
                          "https://starwars-visualguide.com/assets/img/planets/" +
                          (planet.uid + 1) +
                          ".jpg"
                        }
                        className="d-block w-100"
                        alt="..."
                        
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <span className="badge bg-secondary">
                          <h2>{planet.name}</h2>
                        </span>
                        <div className="d-flex justify-content-between">
                          <Link to={`/detailsPlanet/${planet.uid}`} >
                            <button
                              type="button"
                              className="btn btn-light me-auto opacity-75"
                            >
                              Learn More
                            </button>
                          </Link>

                          <button
                            type="button"
                            className="btn btn-warning ms-auto opacity-75"
                            onClick={() => addFavorite(planet)}
                          >
                            ❤
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={planet.uid} className="carousel-item">
                      <img
                        src={
                          "https://starwars-visualguide.com/assets/img/planets/" +
                          planet.uid +
                          ".jpg"
                        }
                        className="d-block w-100"
                        alt="..."
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <span className="badge bg-secondary">
                          <h2>{planet.name}</h2>
                        </span>
                        <div className="d-flex justify-content-between">
                          <button
                            type="button"
                            className="btn btn-light me-auto opacity-75"
                          >
                            Learn More
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning ms-auto opacity-75"
                            onClick={() => addFavorite(planet)}
                          >
                            ❤
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions1"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions1"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
