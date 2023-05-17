# BACKEND

* Rutas:

 -Products:

- '/products/' GET: trae todos los productos <br>
- '/products/' POST: agrega un nuevo producto <br>
- '/products/:pid' GET: trae un producto por id <br>
- '/products/:pid' PUT: edita un producto por id <br>
- '/products/:pid' DELETE: elimina un producto por id <br>


 -Carts:

- '/carts/' GET: trae todos los carritos <br>
- '/carts/' POST: agrega un nuevo carrito <br>
- '/carts/:cid' GET trae un carrito por id <br>
- '/carts/:cid' DELETE vacía un carrito por id <br>
- '/carts/:cid' PUT edita un carrit por id <br>
- '/carts/:cid/product/:pid' POST agrega un producto por id a un carrito por su id <br>
- '/carts/:cid/product/:pid' DELETE elimina un producto por id de un carrito por id <br>
- '/carts/:cid/product/:pid' PUT modifica un producto por id de un carrito por id <br>
- '/carts/:cid/purchase' POST para completar compra de un carrito <br>

 -Chat:

- '/chat/' GET renderiza chat <br>


 -Users:

- '/users/logout' GET cierra sessión de usuarios <br>
- '/users/registroGithub' GET registra usuarios por Github <br>
- '/users/' GET recibe datos del usuario desde Github <br>
- '/users/current' GET obtiene los datos del usuario actual <br>
- '/users/forgot-password' POST envía mail para recuperar contraseña <br>
- '/users/create-new-password/:user/:token' POST envía el nuevo password al back <br>


 -JWT:

- '/jwt/login' POST genera token <br>
- '/jwt/login' GET valida token <br>
- '/jwt/current' GET devuelve usuario desde cookies si existe el token <br>


 -Views:

- '/views/login' GET renderiza login <br>
- '/views/registro' GET renderiza registro <br>
- '/views/errorLogin' GET renderiza error en el login <br>
- '/views/errorRegistro' GET renderiza error en el registro <br>
- '/views/forgot-password' GET renderiza el ingreso de mail para recuperar contraseña <br>
- '/views/resetpassword/:user/:token' GET renderiza input para ingresar nuevo password <br>


 -Real Time:

- '/realtimeproducts/' GET renderiza productos en tiempo real <br>


 -Mock:
- '/products/mockingproducts/products' mock de productos <br>
