# Bidder

Bidder (del inglés _bidder_, postor) es una página web de subastas hecha con React.

Puedes ver el código en este mismo repositorio o [ver la página en línea](https://bidder.onrender.com/).

## Tecnologías, herramientas y librerías

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/en/main)
- [Styled Components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Autenticación y base de datos

- [Firebase Authentication](https://firebase.google.com/)
- [Firestore](https://firebase.google.com/)

## ¿Cómo se usa Bidder?

Cualquier usuario puede registrarse, publicar anuncios y pujar por los anuncios de otros usuarios.

Cuando creas un anuncio puedes decidir cuánto dura la subasta: 1, 3, 5 o 7 días. Además, hay una opción de 5 minutos para que puedas hacer pruebas en el momento. Además de título y descripción, deberás incluir al menos una foto.

Puedes modificar un anuncio que ya has creado. Sin embargo, no podrás cambiar el precio ni la duración.

Las subastas son ocultas, al igual que otros sitios como eBay. Cuando haces una puja estás enviando el precio máximo que estás dispuesto a pagar. Si tu puja es inferior al precio máximo de otro usuario, el precio actual del producto incrementará hasta 1€ más de tu precio máximo.

Habrás ganado el producto si al terminar la subasta eres el mayor postor.

## ¿Cómo se hizo Bidder?

Bidder es el proyecto final de mis cursos de HTML, CSS, JavaScript y Frameworks en la escuela Trazos. En el curso aprendimos las operaciones CRUD en bases de datos _(Create, Read, Update, Delete)_, así que me figuré que una aplicación de subastas se podría resolver con estas cuatro operaciones básicas.

El primer desafío fue cómo programar una serie de funciones para modificar el precio de la subasta. Firestore permite la lectura de datos en tiempo real, con lo que cualquier modificación se refleja al instante. Me serví de esta utilidad para programar una función que compara la puja que estás emitiendo con el precio máximo en la base de datos y modificarlo si fuera el caso.

El módulo de autenticación de Firebase es seguro y fácil de usar, pero requiere adaptar todo el código y las rutas a condiciones que comprueben si hay un usuario conectado. Además, en cada anuncio se comprueba si el usuario en línea es el propio vendedor para impedirle que puje por sus propios productos.

La capacidad de subir fotos me presentó varias dificultades que pude resolver después de programar varias versiones distintas. Se trataba de crear un método para enviar varias fotos con un botón personalizado, cancelar cada una de ellas y vincular los archivos en lugares distintos de la base de datos, de tal manera que las fotos se eliminaran automáticamente al borrar el anuncio.

Cuando estaba a punto de dar por terminado el proyecto decidí habilitar la opción de artículos favoritos. Esto requirió modificar algunos de los planteamientos iniciales. Sin la opción de favoritos la base de datos simplemente lee la lista de items. Pero al habilitar los favoritos se requiere hacer una serie de comprobaciones previas sobre cada uno de los items.

Los estilos CSS están resueltos con Styled Components, que permite una inmensa flexibilidad para combinar CSS y JavaScript.

Las tipografías usadas son [Manrope](https://fonts.google.com/specimen/Manrope) y [Comfortaa](https://fonts.google.com/specimen/Comfortaa). Los iconos son de [Phosphor Icons](https://phosphoricons.com/).
