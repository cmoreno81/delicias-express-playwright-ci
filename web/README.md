# Delicias Express

Web local-first para laboratorio de Playwright, organización de tests, Page Objects, Component Objects, fixtures y patrones.

## Páginas incluidas

- `index.html`: presentación de la empresa.
- `productos.html`: catálogo con buscador y cards filtrables.
- `consejos.html`: consejos y preguntas frecuentes.

## Cómo abrir la web

Opción sencilla:

1. Descomprime el ZIP.
2. Abre `index.html` en el navegador.

Opción recomendada para Playwright:

```bash
npx http-server . -p 3000
```

Después abre:

```text
http://localhost:3000/index.html
```

## Qué pueden probar los alumnos

- Navegación del menú común.
- Carga de páginas principales.
- Búsqueda de productos por nombre, categoría, etiqueta o descripción.
- Cards visibles.
- Contador de productos.
- Mensaje de sin resultados.
- Responsive básico.
- Localizadores accesibles con `getByRole`, `getByLabel` y `getByText`.

## Búsquedas sugeridas

- `pollo`
- `pasta`
- `vegetal`
- `saludable`
- `tradicional`
- `xyz`
