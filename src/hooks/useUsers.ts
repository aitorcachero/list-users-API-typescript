import { useEffect, useState } from 'react';
import usuarios from '../mocks/users.json';
import { toast } from 'react-toastify';

function useUsers() {
  const users = usuarios.results;
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [inputValue, setInputValue] = useState('');
  const [color, setColor] = useState(false);
  const [orderByCountry, setOrderByCountry] = useState(false);
  const [orderByName, setOrderByName] = useState(false);
  const [orderBySurname, setOrderBySurname] = useState(false);

  useEffect(() => {
    if (color) {
      const rows = document.querySelectorAll('tr');
      rows.forEach((row) => {
        row.classList.remove('colorpar');
        row.classList.remove('colorimpar');
      });
      rows.forEach((row, i) => {
        if (i % 2 === 0 && i !== 0) row.classList.add('colorpar');
        if (i % 2 !== 0 && i !== 0) row.classList.add('colorimpar');
      });
    }
  }, [orderByCountry, orderByName, orderBySurname, filteredUsers, color]);

  const handleDeleteUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string,
    username: { name: string; surname: string }
  ) => {
    e.preventDefault();
    if (
      confirm(
        `¿Estás seguro de que quieres eliminar a ${username.name} ${username.surname}?`
      )
    ) {
      toast.error(
        `${username.name} ${username.surname} eliminado correctamente`
      );
      setFilteredUsers((prev) => prev.filter((user) => user.cell !== key));
    }
  };

  const handleFilterName = () => {
    setOrderByName(!orderByName);
    if (!orderByName) {
      setFilteredUsers(
        [...users].sort((a, b) => a.name.first.localeCompare(b.name.first))
      );
    } else {
      setFilteredUsers(
        [...users].sort((a, b) => b.name.first.localeCompare(a.name.first))
      );
    }
  };

  const handleFilterSurname = () => {
    setOrderBySurname(!orderBySurname);
    if (!orderBySurname) {
      setFilteredUsers(
        [...users].sort((a, b) => a.name.last.localeCompare(b.name.last))
      );
    } else {
      setFilteredUsers(
        [...users].sort((a, b) => b.name.last.localeCompare(a.name.last))
      );
    }
  };

  const handleFilterCountry = () => {
    setOrderByCountry(!orderByCountry);
    if (!orderByCountry) {
      setFilteredUsers(
        [...users].sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      );
    } else {
      setFilteredUsers(
        [...users].sort((a, b) =>
          b.location.country.localeCompare(a.location.country)
        )
      );
    }
  };

  const handleColorsRows = () => {
    if (!color) {
      const rows = document.querySelectorAll('tr');
      rows.forEach((row, i) => {
        if (i % 2 === 0 && i !== 0) row.classList.add('colorpar');
        if (i % 2 !== 0 && i !== 0) row.classList.add('colorimpar');
      });
      setColor(!color);
      return;
    } else {
      const rows = document.querySelectorAll('tr');
      rows.forEach((row) => {
        row.classList.remove('colorpar');
        row.classList.remove('colorimpar');
      });
      setColor(!color);
    }
  };

  const handleReset = () => {
    setFilteredUsers(usuarios.results);
    const rows = document.querySelectorAll('tr');
    rows.forEach((row) => {
      row.classList.remove('colorpar');
      row.classList.remove('colorimpar');
    });
    setColor(false);
    setInputValue('');
  };

  return {
    filteredUsers,
    inputValue,
    color,
    orderByCountry,
    orderByName,
    orderBySurname,
    setInputValue,
    setFilteredUsers,
    setOrderByCountry,
    setOrderByName,
    setOrderBySurname,
    handleDeleteUser,
    handleFilterName,
    handleFilterSurname,
    handleFilterCountry,
    handleColorsRows,
    handleReset,
    users,
  };
}

export default useUsers;
