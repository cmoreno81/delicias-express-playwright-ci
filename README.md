# Delicias Express · Laboratorio Playwright completo

Este proyecto contiene el **resultado terminado del laboratorio** para que los alumnos puedan ver una solución completa y organizada.

La web es local-first y está incluida en la carpeta `web/`. La suite de pruebas está construida con Playwright y TypeScript.

## Qué incluye

- Web local-first de Delicias Express.
- Tests E2E terminados.
- Page Object Model.
- Component Objects.
- Fixtures propias.
- Builder para casos de búsqueda.
- Factory Method para crear páginas y componentes.
- Decorator para añadir logs y medición sin tocar el Page Object original.
- AppObject como punto de entrada de alto nivel.
- Strategy con inyección de dependencias para cambiar la forma de buscar.
- Tests responsive básicos.

## Instalación

```bash
npm install
npx playwright install
```

## Ejecutar la web

```bash
npm run start
```

La web se sirve en:

```text
http://127.0.0.1:4173
```

## Ejecutar los tests

```bash
npm test
```

Modo UI:

```bash
npm run test:ui
```

Modo headed:

```bash
npm run test:headed
```

Ver reporte:

```bash
npm run report
```

## Estructura principal

```text
web/
  index.html
  productos.html
  consejos.html
  css/
  js/

tests/
  specs/          # escenarios de prueba
  pages/          # Page Objects
  components/     # Component Objects
  fixtures/       # fixtures propias
  builders/       # Builder de datos/casos
  factories/      # Factory Method y TestDataFactory
  decorators/     # Decorators de ProductosPage
  strategies/     # Strategy de búsqueda
  app/            # AppObject y creación con DI
  data/           # datos esperados del dominio
```

## Lectura didáctica recomendada

### 1. Specs

Empieza por `tests/specs/`. Ahí se ve qué valida la suite.

Los tests no deberían contar detalles de CSS o DOM. Deben contar historias:

```ts
await app.abrirInicioYBuscarProductoSaludable();
```

### 2. Page Objects

Después revisa `tests/pages/`.

Cada página encapsula cómo se interactúa con una pantalla concreta:

- `InicioPage`
- `ProductosPage`
- `ConsejosPage`

### 3. Component Objects

Luego revisa `tests/components/`.

Los componentes representan piezas reutilizables:

- `MenuComponent`
- `SearchBoxComponent`
- `ProductoCardComponent`

### 4. Fixtures

`tests/fixtures/app.fixture.ts` prepara objetos para que el test no tenga ruido de construcción.

Ejemplo:

```ts
test('muestra todas las cards', async ({ productosPage }) => {
  await productosPage.abrir();
  await productosPage.comprobarCantidad(10);
});
```

### 5. Builder

`BusquedaProductoBuilder` permite construir casos de búsqueda expresivos:

```ts
const caso = BusquedaProductoBuilder.unaBusqueda()
  .conTexto('pollo')
  .esperaProductos(['Pollo al curry'])
  .build();
```

### 6. Factory Method

`PageFactory` centraliza la creación de Page Objects.

```ts
const productosPage = PageFactory.crear('productos', page);
```

### 7. Decorator

Los decoradores añaden comportamiento sin modificar la clase original:

- `ProductosPageConLogs`
- `ProductosPageConMedicion`

### 8. AppObject + Strategy + DI

`TestApp` agrupa páginas y flujos.

`createTestApp` permite inyectar dependencias.

```ts
const app = createTestApp(page, {
  busquedaStrategy: new BusquedaConTecladoStrategy()
});
```

Así el mismo test puede cambiar la forma de ejecutar la búsqueda sin modificar el Page Object ni el spec.

## Objetivo docente

El objetivo no es usar patrones porque sí.

El objetivo es que los alumnos vean que una suite E2E también es software y, por tanto, necesita:

- organización;
- nombres claros;
- separación de responsabilidades;
- reducción de duplicación;
- criterios para introducir abstracciones;
- patrones cuando realmente reducen dolor.

## Tests incluidos

- `inicio.spec.ts`
- `menu.spec.ts`
- `productos.spec.ts`
- `buscador.spec.ts`
- `flujos-e2e.spec.ts`
- `responsive.spec.ts`
- `patrones.spec.ts`
- `app-object-strategy-di.spec.ts`

## Mensaje final para alumnos

> Un test que pasa es útil.  
> Una suite que se entiende, se mantiene y evoluciona es profesional.
