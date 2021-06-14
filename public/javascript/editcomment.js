async function editCommentFormHandler(event) {
    event.preventDefault();
    console.log(this.parentNode)
    let id = this.parentNode.getAttribute('data-id')
    // const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const comment_text = document.getElementById('edit-comment-text').setAttribute("type", "textarea");

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
        document.location.replace(`/dashboard/edit-comment/${id}`);
    } else {
        alert(response.statusText);
    }
}

async function editSaveCommentFormHandler(event) {
    event.preventDefault();

    const comment_content = document.querySelector('textarea[name="comment-content"]').value;
    let id = this.parentNode.getAttribute('data-id')

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
        document.location.replace(`/dashboard/edit-comment/${id}`);
    } else {
        alert(response.statusText);
    }
}


document.querySelector('.edit-comment-btn').addEventListener('click', editCommentFormHandler);
document.querySelector('.edit-comment-form').addEventListener('submit', editSaveCommentFormHandler);