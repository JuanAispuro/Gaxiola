export const initialState = {
  sendData: {
    loading: false,
    error: null,
    success: false,
    data: null,
  },
  formData: {
    image: null,
  },
  steps: {
    gray: {
      description: "Convertir a escala de grises y binarizar",
      passed: false,
      image: null,
    },
    edged: {
      description: "Detectar bordes",
      passed: false,
      image: null,
    },
    new_image: {
      description: "Recortar imagen",
      passed: false,
      image: null,
    },
    cropped_image: {
      description: "Recortar imagen de la placa",
      passed: false,
      image: null,
    },
    res: {
      name: "res",
      description: "Resultado",
      passed: false,
      image: null,
    },
  },
};
