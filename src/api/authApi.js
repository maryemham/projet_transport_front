import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; 


export const registerUser = async (email, motDePasse, nom, prenom) => {
  return axios.post(`${API_URL}/register`, {
    email,
    motDePasse,
    nom,
    prenom,
  });
};

export const verifyAccount = async (token) => {
  return axios.get(`${API_URL}/verify`, {
    params: { token },
  });
};