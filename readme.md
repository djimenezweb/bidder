![Bidder](/public/assets/samples/bidder.jpg)

# Bidder

Bidder (del inglés _bidder_, postor) es una página web de subastas hecha con React.

Puedes ver el código en este mismo repositorio o [ver la página en línea](https://bidder.onrender.com/). La página está adaptada a móvil, tableta y escritorio.

## Tecnologías, herramientas y librerías

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/en/main)
- [Styled Components](https://styled-components.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/)

### Autenticación y base de datos

- [Firebase Authentication](https://firebase.google.com/)
- [Firestore](https://firebase.google.com/)

## ¿Cómo se usa Bidder?

![Sign up](/public/assets/samples/signup.jpg)

Cualquier usuario puede registrarse, publicar anuncios y pujar por los anuncios de otros usuarios.

![Add item](/public/assets/samples/add-item.jpg)

Cuando creas un anuncio puedes decidir cuánto dura la subasta: 1, 3, 5 o 7 días. Además, hay una opción de 5 minutos para hacer pruebas en el momento. Puedes elegir el precio de salida, que nunca será menos de 1 EUR. Deberás añadir un título, descripción y al menos una foto.

![Upload pictures](/public/assets/samples/upload-pictures.jpg)

Puedes modificar un anuncio que ya hayas creado. Sin embargo, no podrás cambiar el precio ni la duración.

Las subastas son ocultas y funcionan de manera parecida a otros sitios como eBay o Catawiki. Cuando haces una puja envías el precio máximo que estás dispuesto a pagar, pero los demás usuarios no pueden verlo. Si tu puja es inferior al precio máximo de otro usuario, el precio actual del producto incrementará hasta 1€ más de tu precio máximo.

![Item](/public/assets/samples/item.jpg)
![Outbid](/public/assets/samples/outbid.jpg)

Habrás ganado el producto si al terminar la subasta eres el mayor postor. Si ningún otro usuario puja por el producto, lo conseguirás por el precio de lanzamiento.

<!-- ![Place bid](/public/assets/samples/place-bid.jpg) -->

## ¿Cómo se hizo Bidder?

Bidder es el proyecto final de mis cursos de HTML, CSS, JavaScript y Frameworks en la [escuela Trazos](https://trazos.net/desarrollo-web/). En el curso aprendimos las operaciones CRUD en bases de datos _(Create, Read, Update, Delete)_, así que me figuré que una aplicación de subastas se podría resolver con estas cuatro operaciones básicas.

El primer desafío fue programar una serie de funciones para modificar el precio de la subasta. La base de datos Firebase permite la lectura de datos en tiempo real, con lo que cualquier modificación se refleja al instante. Me serví de esta utilidad para programar una función para comparar la puja con el precio máximo en la base de datos y modificarlo si fuera el caso.

El módulo de autenticación de Firebase es seguro y fácil de usar, pero requiere adaptar todo el código y las rutas a condiciones que comprueben si hay un usuario conectado. Además, en cada anuncio se comprueba si el usuario en línea es el propio vendedor para impedirle que puje por sus propios productos.

Cuando un usuario se registra por primera vez se crea un perfil básico en la base de datos. ¿Pero qué hacer si el usuario inicia sesión a través de su cuenta de Google o Github? En este caso registrarse e inciar sesión es exactamente la misma función. ¿Cómo distinguir, entonces, entre usuarios nuevos y ya existentes? Después de varias búsquedas e intentos, descubrí la propiedad isNewUser dentro de las credenciales que devuelve el proveedor de autenticación.

La capacidad de subir fotos me presentó varias dificultades que resolví después de programar varias versiones distintas. El objetivo era un sistema que permitiera enviar varias fotos con un botón personalizado, visualizarlas previamente, cancelar cada una de ellas y vincular los archivos en lugares distintos de la base de datos, de tal manera que las fotos se eliminaran automáticamente al borrar el anuncio. En este proceso aprendí que los bucles forEach no se pueden usar en funciones asíncronas.

Cuando estaba a punto de dar por terminado el proyecto decidí habilitar la opción de artículos favoritos. Esto requirió modificar algunos de los planteamientos iniciales. Sin la opción de favoritos la base de datos simplemente lee la lista de anuncios. Pero al habilitar los favoritos se requiere comprobar previamente si cada anuncio ha sido marcado como favorito por el usuario en línea.

Los estilos CSS están resueltos con Styled Components, que permite una inmensa flexibilidad para combinar CSS y JavaScript.

Las tipografías usadas son [Manrope](https://fonts.google.com/specimen/Manrope) y [Comfortaa](https://fonts.google.com/specimen/Comfortaa). Los iconos son de [Phosphor Icons](https://phosphoricons.com/).

## Dependencias

- [eslint 8.36.0](https://www.npmjs.com/package/eslint)
- [firebase 9.21.0](https://www.npmjs.com/package/firebase)
- [framer-motion 10.12.16](https://www.npmjs.com/package/framer-motion)
- [prettier 2.8.5](https://www.npmjs.com/package/prettier)
- [react 18.2.0](https://www.npmjs.com/package/react)
- [react-dom 18.2.0](https://www.npmjs.com/package/react-dom)
- [react-hook-form 7.43.9](https://www.npmjs.com/package/react-hook-form)
- [react-router-dom 6.11.1](https://www.npmjs.com/package/react-router-dom)
- [styled-components 5.3.9](https://www.npmjs.com/package/styled-components)
- [uuid 9.0.0](https://www.npmjs.com/package/uuid)
- [vite 4.3.9](https://www.npmjs.com/package/vite)
- [@phosphor-icons/react 2.0.9](https://www.npmjs.com/package/@phosphor-icons/react)
