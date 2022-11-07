import axios from "axios";
import React, { useEffect, useReducer } from "react";
import "./App.sass";
import { actions, initialState, reducer } from "./reducer";
function App() {
  // Reducer stuff
  const [state, dispatch] = useReducer(reducer, initialState);
  // Destructure state
  const { sendData, formData } = state;
  // Destructure sendData
  const { loading, error, success, data } = sendData;
  // handle change function
  const handleChange = (e) => {
    const files = e.target.files;
    dispatch({
      type: actions.UPDATE_FORM_DATA,
      payload: {
        name: e.target.name,
        value: files[0],
      },
    });
  };
  const handleSubmit = async () => {
    dispatch({ type: actions.SEND_DATA_REQUEST });
    try {
      const formData = new FormData();
      formData.append("image", state.formData.image);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/entries/create`,
        formData
      );
      dispatch({
        type: actions.SEND_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actions.SEND_DATA_FAILURE,
        payload: error.response.data,
      });
    }
  };
  return (
    <div className="app__container">
      <div className="app__content">
        <section className="rows__container">
          <article className="column__container">
            <p className="Nombre"> Suba su imagen a la pagina.</p>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              id="input__image"
              hidden
            />
            <button
              className="button button__secondary"
              onClick={() => {
                document.getElementById("input__image").click();
              }}
            >
              <i className="fas fa-upload"></i>{" "}
              {formData.image ? "Cambiar imagen" : "Subir imagen"}{" "}
            </button>
            {formData.image && (
              <>
                <div className="image__container">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="imagen"
                    className="image__preview"
                  />
                </div>
                <button
                  className="button button__primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-check"></i>
                  )}{" "}
                  {loading ? "Procesando..." : "Procesar"}
                </button>
              </>
            )}
          </article>
          <article className="column__container">
            <h2>Resultados</h2>
            {loading && <p>Cargando...</p>}
            {error && <p>{error}</p>}
            {success && (
              <>
                <p>
                  Matricula detectada: <b>{data.text}</b>
                </p>
                <p>
                  Porcentaje de confianza: <b>{data.accuracy * 100}%</b>
                </p>
              </>
            )}
            {(success || error) && (
              <div className="process__images">
                {Object.keys(state.steps).map((key, index) => (
                  <div className="process__step" key={key}>
                    <div className="process__step__title">
                      <p>
                        {index + 1}. {state.steps[key].description}
                      </p>
                      <p>
                        {state.steps[key].passed ? (
                          <>
                            <i className="fas fa-check"></i> Completado
                          </>
                        ) : (
                          <>
                            <i className="fas fa-times"></i> No completado
                          </>
                        )}
                      </p>
                    </div>
                    {state.steps[key].image && (
                      <div className="process__image">
                        <img
                          src={`data:image/png;base64,${state.steps[key].image}`}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}

export default App;
