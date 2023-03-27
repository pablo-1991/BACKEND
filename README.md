# BACKEND

Rutas:

Products:

'/api/products/' GET: trae todos los productos
'/api/products/' POST: agrega un nuevo producto
'/api/products/:pid' GET: trae un producto por id
'/api/products/:pid' PUT: edita un producto por id
'/api/products/:pid' DELETE: elimina un producto por id


Carts:

'/api/carts/' GET: trae todos los carritos
'/api/carts/' POST: agrega un nuevo carrito
'/api/carts/:cid' GET trae un carrito por id
'/api/carts/:cid' DELETE vacía un carrito por id
'/api/carts/:cid' PUT edita un carrit por id
'/api/carts/:cid/product/:pid' POST agrega un producto por id a un carrito por su id
'/api/carts/:cid/product/:pid' DELETE elimina un producto por id de un carrito por id
'/api/carts/:cid/product/:pid' PUT modifica un producto por id de un carrito por id


Users:

'/users/registro' POST registra usuarios
'/users/login' POST loguea usuarios
'/users/logout' GET cierra sessión de usuarios
'/users/registroGithub' GET registra usuarios por Github
'/users/' GET recibe datos del usuario desde Github


JWT:

'/jwt/login' POST genera token
'/jwt/login' GET valida token
'/jwt/current' GET devuelve usuario desde cookies si existe el token


Views:

'/views/login' GET renderiza login
'/views/registro' GET renderiza registro
'/views/errorLogin' GET renderiza error en el login
'/views/errorRegistro' GET renderiza error en el registro


Real Time:

'/realtimeproducts/' GET renderiza productos en tiempo real
