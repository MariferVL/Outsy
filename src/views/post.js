export const post =
` <section id="addPostForm">
<div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
    <div class="row gx-lg-5 align-items-center mb-5">
        <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div class="card bg-glass">
                <div class="card-body px-4 py-5 px-md-5">
                  <h2 class="text-center" style="color: #82C173">Cuéntale a tus amigos qué quieres hacer</h2><br>
                    <form method="POST" enctype="multipart/form-data">
                    <!-- Post Title input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postTitle">Título</label>
                        <input type="text" id="postTitle" class="form-control" name="postTitle" required />
                    </div>
                    <!-- Date input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="meeting-time">Fecha</label>
                        <input type="datetime-local" id="postTime" class="form-control" name="meeting-time"
                            value="2023-04-16T19:30" required />
                    </div>
                    <!-- Location input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postLocation">Lugar</label>
                        <input type="text" id="postLocation" class="form-control" name="postTitle" required />
                    </div>
                    <!-- Description input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postText">Descripción</label>
                        <textarea id="postContent" name="postText" class="form-control" required></textarea>
                    </div>
                    <!-- Image -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postImage">Imagen</label>
                        <input class="form-control" type="file" id="postImage" name="postImage" />
                    </div>
                    <!-- Image -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="postPrivacy">Privacidad</label>
                        <select class="form-control" id="postPrivacy" name="postPrivacy">
                            <option value="public">Publico</option>
                            <option value="friends">Amigos</option>
                            <option value="private">Privado</option>
                        </select>
                    </div>
                        <!-- Submit button -->
                        <div class="form-check d-flex justify-content-center mb-4">
                            <button id="addPostButton" class="btn btn-primary btn-block mb-4" type="submit">Create
                                post</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
`
