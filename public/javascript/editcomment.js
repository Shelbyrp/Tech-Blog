async function editCommentFormHandler(event) {
    event.preventDefault();
    console.log(this.parentNode)
    let id = this.parentNode.getAttribute('data-id')
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
           comment_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        document.location.replace(`/api/posts/${id}`);
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.comment-body').addEventListener('submit', editCommentFormHandler);