import React, { useEffect, useState } from "react";

import UsersLists from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

function Users() {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    async function fetchUser() {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );

        setLoadedUsers(responseData.users);
      } catch (err) {
      };
    }
    fetchUser();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <div className="center">
        <LoadingSpinner />
      </div>}
      {!isLoading && loadedUsers && <UsersLists items={loadedUsers} />}
    </React.Fragment>
  )
}

export default Users;


//if there are no dependency in useEffect then function will run only once
//with fetch() the default request type is GET request