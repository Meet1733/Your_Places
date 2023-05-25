import React from "react";
import UsersLists from "../components/UsersList";

function Users() {
  const USERS = [
    {
      id: "u1",
      name: "Meet",
      image: "https://avatars.githubusercontent.com/u/112953572?s=96&v=4",
      places: 1,
    },
  ];

  return <UsersLists items={USERS} />;
}

export default Users;
