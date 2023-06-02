import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

// acá en este archivo tengo que consumir el contexto del store.
// useEffect con observador vacío

export const Character = () => {
  const { actions, store } = useContext(Context);

  const addFavorite = (character) => {
    console.log(character);
    actions.addFavoriteCharacter(character)
  };

  useEffect(() => {
    // Solicitud GET (Request).
    actions.obtenerPersonajes();
  }, []);

  const carrouselButton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <h1 className="display-3" style={{ textAlign: "center" }}>
        Characters
      </h1>
      <div className="row " style={{ justifyContent: "center" }}>
        <div className="col-md-8">
          <div
            id="carouselExampleCaptions"
            className="carousel slide shadow-lg mb-5 bg-white rounded"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              {carrouselButton.map((item, index) => {
                return (
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={`${index + 1}`}
                    aria-label={`Slide ${index + 2}`}
                  ></button>
                );
              })}
            </div>
            <div className="carousel-inner">
              {store.characters?.map((people, index) => {
                if (index == 0) {
                  return (
                    <div key={people.uid} className="carousel-item active">
                      <img
                        src={
                          "https://starwars-visualguide.com/assets/img/characters/" +
                          people.uid +
                          ".jpg"
                        }
                        className="d-block w-100"
                        alt="..."
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <span className="badge bg-secondary">
                          <h2>{people.name}</h2>
                        </span>
                        <div className="d-flex justify-content-between">
                        <Link to={`/detailsCharacter/${people.uid}`} >
                            <button
                              type="button"
                              className="btn btn-light me-auto opacity-75"
                              key={people.uid}
                            >
                              Learn More
                            </button>
                         </Link>
                          <button
                            type="button"
                            className="btn btn-warning ms-auto opacity-75"
                            onClick={() => addFavorite(people)}
                          >
                            ❤
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={people.uid} className="carousel-item">
                      <img
                        src={
                          "https://starwars-visualguide.com/assets/img/characters/" +
                          people.uid +
                          ".jpg"
                        }
                        className="d-block w-100"
                        alt="..."
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <span className="badge bg-secondary">
                          <h2>{people.name}</h2>
                        </span>
                        <div className="d-flex justify-content-between">
                          <Link to={`/detailsCharacter/${people.uid}`} >
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
                            onClick={() => addFavorite(people)}

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
              data-bs-target="#carouselExampleCaptions"
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
              data-bs-target="#carouselExampleCaptions"
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