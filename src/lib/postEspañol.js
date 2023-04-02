// Importar los módulos necesarios de Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  // Configuración de tu proyecto de Firebase
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener la referencia de la base de datos en tiempo real de Firebase
const database = firebase.database();

// Obtener la referencia del almacenamiento de Firebase
const storage = firebase.storage();

// Obtener el usuario actual autenticado
const user = firebase.auth().currentUser;

// Función para crear una nueva publicación
function crearPublicacion(titulo, contenido, privacidad, imagen) {
  // Crear una nueva referencia de publicación en la base de datos de Firebase
  const nuevaPublicacionRef = database.ref("publicaciones").push();
  // Obtener el ID de la nueva publicación
  const publicacionId = nuevaPublicacionRef.key;

  // Subir la imagen a Firebase Storage
  const imagenRef = storage.ref("publicaciones").child(publicacionId);
  imagenRef
    .put(imagen)
    .then((snapshot) => {
      // Obtener la URL de la imagen subida
      return snapshot.ref.getDownloadURL();
    })
    .then((url) => {
      // Guardar la URL de la imagen en la base de datos
      nuevaPublicacionRef.update({
        imagenUrl: url,
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // Guardar la nueva publicación en la base de datos de Firebase
  nuevaPublicacionRef.set({
    titulo: titulo,
    contenido: contenido,
    privacidad: privacidad,
    usuarioId: user.uid,
    likes: 0,
    comentarios: 0,
  });
}

// Función para editar una publicación existente
function editarPublicacion(
  publicacionId,
  titulo,
  contenido,
  privacidad,
  imagen
) {
  // Obtener la referencia de la publicación en la base de datos de Firebase
  const publicacionRef = database.ref("publicaciones").child(publicacionId);

  // Actualizar los datos de la publicación
  publicacionRef.update({
    titulo: titulo,
    contenido: contenido,
    privacidad: privacidad,
  });

  // Si se proporciona una nueva imagen, subirla a Firebase Storage
  if (imagen) {
    const imagenRef = storage.ref("publicaciones").child(publicacionId);
    imagenRef
      .put(imagen)
      .then((snapshot) => {
        // Obtener la URL de la imagen subida
        return snapshot.ref.getDownloadURL();
      })
      .then((url) => {
        // Guardar la URL de la imagen en la base de datos
        publicacionRef.update({
          imagenUrl: url,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

// Función para eliminar una publicación existente
function eliminarPublicacion(publicacionId) {
  // Obtener la referencia de la publicación en la base de datos de Firebase
  const publicacionRef = database.ref("publicaciones").child(publicacionId);

  // Eliminar la imagen asociada a la publicación de Firebase Storage
  const imagenRef = storage.ref("publicaciones").child(publicacionId);
  imagenRef
    .delete()
    .then(() => {
      // Eliminar la public
      publicacionRef.remove();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Función para ajustar la privacidad de una publicación existente
function ajustarPrivacidad(publicacionId, privacidad) {
  // Obtener la referencia de la publicación en la base de datos de Firebase
  const publicacionRef = database.ref("publicaciones").child(publicacionId);

  // Actualizar la privacidad de la publicación
  publicacionRef.update({
    privacidad: privacidad,
  });
}

// Función para comentar una publicación existente
function comentarPublicacion(publicacionId, comentario) {
  // Obtener la referencia de la publicación en la base de datos de Firebase
  const publicacionRef = database.ref("publicaciones").child(publicacionId);

  // Incrementar el contador de comentarios de la publicación
  publicacionRef.child("comentarios").transaction((comentarios) => {
    return comentarios + 1;
  });

  // Crear una nueva referencia de comentario en la base de datos de Firebase
  const nuevoComentarioRef = publicacionRef.child("comentarios").push();

  // Guardar el comentario en la base de datos de Firebase
  nuevoComentarioRef.set({
    contenido: comentario,
    usuarioId: user.uid,
  });
}

// Función para dar like a una publicación existente
function darLikePublicacion(publicacionId) {
  // Obtener la referencia de la publicación en la base de datos de Firebase
  const publicacionRef = database.ref("publicaciones").child(publicacionId);

  // Incrementar el contador de likes de la publicación
  publicacionRef.child("likes").transaction((likes) => {
    return likes + 1;
  });

  // Crear una nueva referencia de like en la base de datos de Firebase
  const nuevoLikeRef = publicacionRef.child("likes").push();

  // Guardar el like en la base de datos de Firebase
  nuevoLikeRef.set({
    usuarioId: user.uid,
  });
}

// Función para obtener todas las publicaciones de un usuario específico
function obtenerPublicacionesUsuario(usuarioId) {
  // Obtener la referencia de la base de datos en tiempo real de Firebase
  const database = firebase.database();

  // Obtener las publicaciones del usuario de la base de datos de Firebase
  const publicacionesRef = database.ref("publicaciones");
  publicacionesRef
    .orderByChild("usuarioId")
    .equalTo(usuarioId)
    .on("value", (snapshot) => {
      const publicaciones = snapshot.val();
      // Hacer algo con las publicaciones obtenidas
    });
}
