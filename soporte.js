document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postsContainer = document.getElementById('posts');

    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const postText = postContent.value.trim();

        if (postText) {
            const newPost = createPost('Juan Pérez', postText); // Asume que el usuario es "Juan Pérez"
            postsContainer.appendChild(newPost);
            postContent.value = '';
        }
    });

    function createPost(author, content) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.dataset.author = author;
        postDiv.innerHTML = `
            <p><strong>${author}:</strong> ${content}</p>
            <div class="post-buttons">
                <button class="replyButton">Responder</button>
                <button class="editButton">Editar</button>
                <button class="deleteButton">Eliminar</button>
            </div>
            <div class="replies"></div>
            <div class="reply-form" style="display:none;">
                <textarea rows="2" placeholder="Escribe tu respuesta aquí..."></textarea>
                <button class="submitReplyButton">Enviar</button>
            </div>
            <div class="edit-form" style="display:none;">
                <textarea rows="2" placeholder="Edita tu publicación aquí..."></textarea>
                <button class="submitEditButton">Guardar</button>
            </div>
        `;

        const replyButton = postDiv.querySelector('.replyButton');
        replyButton.addEventListener('click', function () {
            const replyForm = postDiv.querySelector('.reply-form');
            replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
        });

        addEditAndDeleteHandlers(postDiv);

        return postDiv;
    }

    function addEditAndDeleteHandlers(postElement) {
        const editButton = postElement.querySelector('.editButton');
        const deleteButton = postElement.querySelector('.deleteButton');
        const replyForm = postElement.querySelector('.reply-form');
        const editForm = postElement.querySelector('.edit-form');
        const submitReplyButton = postElement.querySelector('.submitReplyButton');
        const submitEditButton = postElement.querySelector('.submitEditButton');

        submitReplyButton.addEventListener('click', function () {
            const replyContent = replyForm.querySelector('textarea').value.trim();
            if (replyContent) {
                const replyDiv = document.createElement('div');
                replyDiv.classList.add('reply');
                replyDiv.dataset.author = 'Juan Pérez'; // Asume que el autor de la respuesta es "Juan Pérez"
                replyDiv.innerHTML = `<p><strong>Juan Pérez:</strong> ${replyContent}</p>
                                      <div class="post-buttons">
                                          <button class="editButton">Editar</button>
                                          <button class="deleteButton">Eliminar</button>
                                      </div>
                                      <div class="replies"></div>
                                      <div class="reply-form" style="display:none;">
                                          <textarea rows="2" placeholder="Escribe tu respuesta aquí..."></textarea>
                                          <button class="submitReplyButton">Enviar</button>
                                      </div>
                                      <div class="edit-form" style="display:none;">
                                          <textarea rows="2" placeholder="Edita tu publicación aquí..."></textarea>
                                          <button class="submitEditButton">Guardar</button>
                                      </div>`;
                postElement.querySelector('.replies').appendChild(replyDiv);
                replyForm.style.display = 'none';
                replyForm.querySelector('textarea').value = '';
                addEditAndDeleteHandlers(replyDiv);

                // Ocultar el botón de respuesta en respuestas
                replyDiv.querySelector('.replyButton').style.display = 'none';
            }
        });

        editButton.addEventListener('click', function () {
            const currentContent = postElement.querySelector('p').textContent.replace(`${postElement.dataset.author}: `, '');
            editForm.querySelector('textarea').value = currentContent;
            editForm.style.display = 'block';
        });

        submitEditButton.addEventListener('click', function () {
            const newContent = editForm.querySelector('textarea').value.trim();
            if (newContent) {
                postElement.querySelector('p').innerHTML = `<strong>${postElement.dataset.author}:</strong> ${newContent}`;
                editForm.style.display = 'none';
            }
        });

        deleteButton.addEventListener('click', function () {
            if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
                postElement.remove();
            }
        });

        // Ocultar el botón de respuesta en las respuestas
        if (postElement.classList.contains('reply')) {
            postElement.querySelector('.replyButton').style.display = 'none';
        }
    }
});
