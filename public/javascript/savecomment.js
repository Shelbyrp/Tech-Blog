async function editSaveCommentFormHandler(event) {
    event.preventDefault();
    console.log("Been Called")

    const comment_text = document.querySelector('textarea[name="comment-content"]').value;
    let id = document.querySelector("#comment").dataset.id;

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
        document.location.replace(`/dashboard/edit-comment/${id}?saved=true`);
    } else {
        alert(response.statusText);
    }
}


document.querySelector('.save-comment-btn').addEventListener('click', editSaveCommentFormHandler);