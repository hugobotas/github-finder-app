import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';

function UserResults() {
  const [users, setUsers] = useState([] as { login: string }[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then();
  }, []);

  async function fetchUsers() {
    const response = await fetch(`${import.meta.env.VITE_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_APP_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
    console.log(data);
  }

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
          <h3>{user.login}</h3>
          // <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
