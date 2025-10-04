import React from 'react';

function UserComment({ user }) {
  return (
    <div className="card user-comment">
      <img
        src="https://cdn-icons-png.flaticon.com/512/6897/6897018.png"
        alt="avatar"
        width="30"
        height="30"
      />
      <p>{user}</p>
      <p>comentario del usuario</p>
    </div>
  );
}

export default UserComment;