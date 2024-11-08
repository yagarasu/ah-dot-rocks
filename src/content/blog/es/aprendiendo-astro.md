---
slug: aprendiendo-astro
title: "Aprendiendo cosas nuevas: Astro"
excerpt: "Mi página está hecha con Astro. Si quieres ver cómo se hace usa rapidísimo, dale una leída."
date: 2024-08-30T11:21:00
image: "../../../assets/blog/2024/08/astro.jpeg"
language: es
tags:
  - software-engineering
---
## TL;DR
Mi página está hecha con Astro. Si quieres ver cómo se hace usa rapidísimo, busca hasta abajo.

## Contexto
Cuando comencé a trabajar en mi sitio web tenía varias opciones en cuanto a qué stack usar. Después de tantos años de trabajar con React, esta es una solución que brinca de inmediato a la mente, pero la verdad es que para un sitio como el que quería hacer, usar React iba a darme más dolores de cabeza que ayudarme. Otra solución rápida era usar WordPress porque también lo he usado lo suficiente como para sentirme cómodo, pero sentía que usarlo me limitaría en lo que realmente quería lograr. Incluso pensé usar HTML directo, en el espíritu de regresar a la web antigua, pero recordé mis primeros años desarrollando en los que tenía un template que copiaba y pegaba cada que quería agregar un post; tampoco era opción.

Y entonces recordé un framework que apenas conocí en el trabajo y que prometía mucho: [Astro](https://astro.build/).

## ¿Qué es astro?
Es un framework para sitios web basados en contenido. Básicamente lo que tenía en mente.

La sintaxis me llamó la atención desde el principio: es super cercana a React y está basado en componentes que reciben props. Pero lo mejor es que es server-first, entonces no tenía que rebanarme la cabeza metiendo server side rendering ni nada por el estilo, ya venía de cajón. Aparte integra de forma nativa el Markdown con front matter, que siento que es la mejor forma de escribir contenido y categorizarlo porque es texto plano y los metadatos están en el mismo archivo. Nada de meterme con bases de datos y serializar texto formateado: todo funcionaría de cajón. Incluso soporta Typescript.

Con mucha emoción corrí el comando para crear un nuevo proyecto y comencé a jugar con las líneas de código. Lo más difícil ha sido detectar qué funciones se ejecutan en tiempo de compilación y qué funciones en tiempo de ejecución. Pero al final logré que mis posts en Markdown se mostraran.

La verdad es que el layout y el diseño no son lo más hermoso del mundo, pero quería publicar esto lo más rápido que pudiera para que la llama no se extinguiera.

Me sentí muy satisfecho de aprender algo nuevo y hacer algo para mí con esto. Este tipo de cosas me suman años de vida.

## Cómo hacer un sitio con Astro
Esto es la versión express de lo que he aprendido:

Debes tener Node y NPM instalado. Cálale con `node -v` para asegurarte de que tienes node 20.

Ejecuta `npm create astro@latest` en la terminal y responde las preguntas del wizard. Al terminar vas a tener una carpeta con todo listo para comenzar. Nada más asegúrate de que sí corriste `npm install` ya sea en el wizard o al terminar. Para levantar el servidor de development ejecuta `npm run dev` y abre un navegador en `http://localhost:4321`. ¡Boom! Listo.

Ahora, lo más importante a conocer:
* Todo lo que está en `src/pages/` va a ser una página que se puede visitar y el index es donde comienzas.
* La estructura de archivos se va a respetar. Las subcarpetas van a generar subcarpetas.
* Las `collections` definen tipos de contenido. En mi caso, cada post está en la collection `blog`.
* Las collections se definen en `src/content/config.ts`. Aquí puedes definir el nombre del tipo y la estructura de los metadatos.
* Para generar páginas que consuman collections hay que definir una función `getStaticPaths` que satisfaga `GetStaticPaths`. Esta función va a ser llamada en tiempo de compilación para generar todos los htmls finales. En esa función hay que llamar `getCollection('blog')`, que regresa una promesa con un array de items dentro de la collection.

Y eso es todo. Puedes definir archivos `.astro`, importarlos y usarlos como componentes. Dichos componentes pueden recibir props.

```astro
// === Heading.astro ===
---
interface Props {
  text: string;
  link?: string;
}

const { text, link } = Astro.props;
---

<h2>
  {link !== undefined ? <a href={link}>{text}</a> : text}
</h2>


// === index.astro ===
<Heading text="Home" link="/" />
```

Probablemente haga más posts respecto a lo que vaya aprendiendo de esto.
