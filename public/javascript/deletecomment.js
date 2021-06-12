async function deleteCommentFormHandler(event) {
    event.preventDefault();
    console.log(this.parentNode)
    let id = this.parentNode.getAttribute('data-id')
 
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
        document.location.replace('/posts/');
      } else {
        alert(response.statusText);
      }
  }
  document.querySelector('.delete-comment-btn').addEventListener('click', deleteCommentFormHandler);