import './ListUsers.css';
import { useEffect } from 'react';
import useUsers from '../hooks/useUsers';
import img from '../assets/arrabj3.png';

export default function ListUsers() {
  const {
    users,
    filteredUsers,
    inputValue,
    setInputValue,
    setFilteredUsers,
    handleDeleteUser,
    handleFilterName,
    handleFilterSurname,
    handleFilterCountry,
    handleColorsRows,
    handleReset,
  } = useUsers();

  useEffect(() => {
    setFilteredUsers(
      [...users].filter((user) =>
        user.location.country.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, setFilteredUsers, users]);

  return (
    <main className="main">
      <section className="filters-section">
        <button onClick={handleColorsRows}>Colorea filas</button>
        <button onClick={handleFilterCountry}>Ordena por país</button>
        <button onClick={handleReset}>Restaurar estado inicial</button>
        <input
          type="text"
          placeholder="Filtrar por país"
          className="input-filter"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </section>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th
              className="th-name"
              onClick={handleFilterName}
              style={{ cursor: 'pointer' }}
            >
              <div className="sep-theader">
                <span>Nombre</span>
                <img src={img} className="img-arrow" />
              </div>
            </th>
            <th
              className="th-surname"
              onClick={handleFilterSurname}
              style={{ cursor: 'pointer' }}
            >
              <div className="sep-theader">
                <span>Apellido</span>
                <img src={img} className="img-arrow" />
              </div>
            </th>
            <th
              className="th-country"
              onClick={handleFilterCountry}
              style={{ cursor: 'pointer' }}
            >
              <div className="sep-theader">
                <span>País</span>
                <img src={img} className="img-arrow" />
              </div>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.cell}>
              <td>
                <img src={user.picture?.thumbnail} />
              </td>
              <td>{user.name?.first}</td>
              <td>{user.name?.last}</td>
              <td>{user.location?.country}</td>
              <td>
                <button
                  onClick={(e) => {
                    handleDeleteUser(e, user.cell, {
                      name: user.name?.first,
                      surname: user.name?.last,
                    });
                  }}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredUsers.length === 0 && (
        <h2 style={{ textAlign: 'center', color: 'red' }}>
          No se encontraron resultados
        </h2>
      )}
    </main>
  );
}
