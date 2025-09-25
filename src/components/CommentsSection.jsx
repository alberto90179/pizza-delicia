import React from 'react';
import UserComment from './UserComment';

function CommentsSection() {
  const comments = [1, 2, 3, 4]; // We'll just use a loop to render four generic comments

  return (
    <div className="comments-container">
      {comments.map((index) => (
        <UserComment key={index} user={`Usuario ${index}`} />
      ))}
    </div>
  );
}

export default CommentsSection;