import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
  
  const { store } = useContext(Context);

  return (
    <nav
      className="navbar bg-body-tertiary"
      style={{ borderBottom: "1px solid lightgray" }}
    >
      <div className="container-fluid ">
      <Link to={`/`} className="navbar-brand ">
          
            <img
              className="mx-5"
              style={{ height: "50px", width: "90px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/1200px-Star_wars2.svg.png"
            />
          
        
        </Link>
        <form className="d-flex" role="search">
          <div className="dropdown mx-2">
            <a
              className="btn btn-warning dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites <span className="badge text-bg-secondary">{store.favorites.characters.length + store.favorites.planets.length}</span>
            </a>

            <ul className="dropdown-menu">
              {store.favorites.characters.map((character) => {
                return (<li>{character.name}</li>)
              })}
              {store.favorites.planets.map((planet) => {
                return (<li>{planet.name}</li>)
              })}
            </ul>
          </div>
        </form>
      </div>
    </nav>
  );
};
