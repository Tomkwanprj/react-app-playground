import React, { useEffect, useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";
import produce from "immer";

interface User {
  id: number;
  name: string;
}

//It will cause the infinite loop since the setProducts() will trigger new render and then the useEffect will be executed again.
// [] means the useEffect dependency
// useEffect(() => {
//   console.log("Fetching products in ", category);
//   setProducts(["Clothing", "Household"]);
// }, [category]);

const UserList = ({ category }: { category: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const connect = () => console.log("Connecting...");
  const disconnect = () => console.log("Disconnecting...");

  const addUser = () => {
    const originalUsers = [...users];

    const newUser = { id: 0, name: "Mosh" };
    setUsers([newUser, ...users]);

    axios
      .post<User>(`https://jsonplaceholder.typicode.com/users`, newUser)
      //destructure
      .then(({ data: saveUser }) => setUsers([saveUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (chosenUser: User) => {
    const originalUsers = [...users];

    const updatedUser = { ...chosenUser, name: "Tom" };

    setUsers(
      users.map((user) => (user.id == chosenUser.id ? updatedUser : user))
    );

    axios
      .patch(
        `https://jsonplaceholder.typicode.com/users/` + chosenUser.id,
        updatedUser
      )
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const deleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(
      produce((draft) => {
        const index = draft.findIndex((draftUser) => draftUser.id == user.id);
        draft.splice(index, 1);
      })
    );

    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((users) => {
        setUsers(users.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false);
      });

    return () => controller.abort();

    //Async way
    // const fetchUsers = async () => {
    //   try {
    //     const res = await axios.get<User[]>(
    //       "https://jsonplaceholder.typicode.com/users"
    //     );
    //     setUsers(res.data);
    //   } catch (error) {
    //     setError((error as AxiosError).message);
    //   }
    // };
    // fetchUsers();
  }, []);

  useEffect(() => {
    connect();

    //optional return for cleaning up;
    return () => disconnect();
  });

  return (
    <>
      {error ? <p className="text-danger">{error}</p> : null}
      {isLoading ? <div className="spinner-border"></div> : null}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item d-flex justify-content-between">
            {user.id}:{user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserList;
