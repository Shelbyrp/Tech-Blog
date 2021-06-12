async function deleteCommentFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
       const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          comment_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  }
  document.querySelector('.delete-comment-btn').addEventListener('click', deleteCommentFormHandler);