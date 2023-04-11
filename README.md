# BACKEND

* Rutas:

 -Products:

- '/api/products/' GET: trae todos los productos <br>
- '/api/products/' POST: agrega un nuevo producto <br>
- '/api/products/:pid' GET: trae un producto por id <br>
- '/api/products/:pid' PUT: edita un producto por id <br>
- '/api/products/:pid' DELETE: elimina un producto por id <br>


 -Carts:

- '/api/carts/' GET: trae todos los carritos <br>
- '/api/carts/' POST: agrega un nuevo carrito <br>
- '/api/carts/:cid' GET trae un carrito por id <br>
- '/api/carts/:cid' DELETE vacía un carrito por id <br>
- '/api/carts/:cid' PUT edita un carrit por id <br>
- '/api/carts/:cid/product/:pid' POST agrega un producto por id a un carrito por su id <br>
- '/api/carts/:cid/product/:pid' DELETE elimina un producto por id de un carrito por id <br>
- '/api/carts/:cid/product/:pid' PUT modifica un producto por id de un carrito por id <br>


 -Users:

- '/users/registro' POST registra usuarios <br>
- '/users/login' POST loguea usuarios <br>
- '/users/logout' GET cierra sessión de usuarios <br>
- '/users/registroGithub' GET registra usuarios por Github <br>
- '/users/' GET recibe datos del usuario desde Github <br>


 -JWT:

- '/jwt/login' POST genera token <br>
- '/jwt/login' GET valida token <br>
- '/jwt/current' GET devuelve usuario desde cookies si existe el token <br>


 -Views:

- '/views/login' GET renderiza login <br>
- '/views/registro' GET renderiza registro <br>
- '/views/errorLogin' GET renderiza error en el login <br>
- '/views/errorRegistro' GET renderiza error en el registro <br>


 -Real Time:

- '/realtimeproducts/' GET renderiza productos en tiempo real <br>