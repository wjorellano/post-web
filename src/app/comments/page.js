"use client";
import Autor from "@/Autor";
import { useState, useEffect } from "react";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [postTitle, setPostTitle] = useState("");

  useEffect(() => {
    // Obtener el ID del post desde localStorage
    const postId = localStorage.getItem("selectedPostId");

    if (!postId) {
      // Si no hay postId en localStorage, redirigir a la página principal
      window.location.replace("/");
      return;
    }

    // Obtener el título del post seleccionado
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPostTitle(data.title));

    // Obtener los comentarios del post seleccionado
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold mb-5">Comentarios del Post</h1>

        {/* Mostrar el título del post */}
        <h2 className="text-2xl font-bold mb-5">{postTitle}</h2>

        {/* Tabla de comentarios */}
        {comments.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Nombre</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Comentario</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td className="border border-gray-300 p-2">{comment.name}</td>
                  <td className="border border-gray-300 p-2">
                    {comment.email}
                  </td>
                  <td className="border border-gray-300 p-2">{comment.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay comentarios disponibles.</p>
        )}

        {/* Botón para regresar a la lista de posts */}
        <button
          onClick={() => window.location.replace("/")}
          className="mt-5 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Volver a la lista de posts
        </button>
        <br />
        <br />
        <Autor />
      </div>
    </>
  );
}
