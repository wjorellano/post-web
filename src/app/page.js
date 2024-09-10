"use client";
import Autor from "@/Autor";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Obtener todos los posts
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));

    // Obtener todos los usuarios
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUserSelect = (userId) => {
    // Filtrar posts por usuario seleccionado
    setSelectedUserId(userId);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Listado de Posts</h1>

      {/* Lista de usuarios */}
      <div className="mb-5">
        <select
          onChange={(e) => handleUserSelect(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Seleccionar usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de posts */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Título</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border border-gray-300 p-2">{post.id}</td>
              <td className="border border-gray-300 p-2">{post.title}</td>
              <td className="border border-gray-300 p-2">
                <Link href={`/comments`}>
                  <button
                    onClick={() =>
                      localStorage.setItem(
                        "selectedPostId",
                        JSON.stringify(post.id)
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Ver Comentarios
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Autor />
    </div>
  );
}
