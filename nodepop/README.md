# NodePOP

## Desarrollo

Para arrancar el proyecto en modo desarrollo usamos:

```sh
npm run dev
```

Y para arrancarlo de forma normal sería simplemente:

```sh
npm start
```

## Inicializar la base de datos

Para inicicializar la base de datos, eliminando todo lo existente y creando los objetos incluidos en *anunciosiniciales.json*:

```sh
npm run initDB
```

## Página principal

En ella encontraremos una lista completa de nuestra base de datos de anuncios, la cual podremos filtrar en la url por cualquiera de sus propiedades, además de paginación y demases. He añadido un par de links a filtros rápidos y básicos como ejemplo.

## Rutas del API

- ### Para obtener una lista JSON de anuncios: 
> /api/anuncios

Estos objetos (anuncios) tienen los mismos filtros disponibles que en la página principal, pero además he añadido la opción de buscar por nombre sin necesitar el exacto (e ignorando mayúsculas y minúsculas) //y de filtrar por rango de precios//. Está mejor documentado en *anuncios.js*.

- ### Para obtener una lista de los tags disponibles:
>/tags
