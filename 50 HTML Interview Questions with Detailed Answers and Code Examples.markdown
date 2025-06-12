# 50 HTML Interview Questions with Detailed Answers and Code Examples

1. **What is the purpose of the DOCTYPE declaration in HTML?**
   - **Answer**: The DOCTYPE declaration, placed at the start of an HTML document, informs browsers about the document type and HTML version (e.g., HTML5). It ensures rendering in standards mode, preventing quirks mode, which can cause inconsistent layouts across browsers.
   - **Code Example**:
     ```html
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <title>My Page</title>
       </head>
       <body>
         <p>Content renders correctly in standards mode.</p>
       </body>
     </html>
     ```

2. **What are semantic HTML elements, and why are they important?**
   - **Answer**: Semantic elements like `<header>`, `<footer>`, `<article>`, and `<nav>` describe their purpose clearly, improving accessibility (for screen readers), SEO (search engines understand structure), and code readability compared to non-semantic `<div>` or `<span>`.
   - **Code Example**:
     ```html
     <header>
       <nav>
         <ul>
           <li><a href="#home">Home</a></li>
           <li><a href="#about">About</a></li>
         </ul>
       </nav>
     </header>
     ```

3. **What is the difference between `<div>` and `<section>` elements?**
   - **Answer**: `<div>` is a non-semantic container for styling or grouping without specific meaning. `<section>` is a semantic element for thematic content, often with a heading, enhancing document structure and accessibility.
   - **Code Example**:
     ```html
     <div class="container"> <!-- Non-semantic -->
       <p>Generic content</p>
     </div>
     <section> <!-- Semantic -->
       <h2>Blog Post</h2>
       <p>Content about a topic</p>
     </section>
     ```

4. **Explain the difference between block and inline elements in HTML.**
   - **Answer**: Block elements (`<div>`, `<p>`, `<h1>`) take the full width, start on a new line, and stack vertically. Inline elements (`<span>`, `<a>`, `<img>`) take only content width, flow within text, and don’t force a new line.
   - **Code Example**:
     ```html
     <div style="background: lightblue;">Block element (full width)</div>
     <span style="background: lightgreen;">Inline element (content width)</span>
     <span>Another inline element</span>
     ```

5. **What is the purpose of the `alt` attribute in the `<img>` tag?**
   - **Answer**: The `alt` attribute provides alternative text describing an image’s content or purpose, used by screen readers, displayed if the image fails to load, and indexed by search engines for SEO.
   - **Code Example**:
     ```html
     <img src="cat.jpg" alt="A fluffy cat sitting on a couch">
     <img src="decor.png" alt="" title="Decorative image"> <!-- Decorative -->
     ```

6. **What is the difference between `id` and `class` attributes?**
   - **Answer**: `id` is a unique identifier for a single element, used for specific targeting in CSS/JavaScript. `class` can be applied to multiple elements for shared styling or functionality. IDs have higher CSS specificity.
   - **Code Example**:
     ```html
     <div id="unique-header" class="box">Header</div>
     <div class="box">Content</div>
     <style>
       #unique-header { background: blue; }
       .box { border: 1px solid black; }
     </style>
     ```

7. **What are data attributes in HTML?**
   - **Answer**: Data attributes (`data-*`) store custom data on elements, accessible via JavaScript (`element.dataset`) or CSS. They’re useful for attaching metadata without affecting the DOM structure.
   - **Code Example**:
     ```html
     <div data-user-id="123" data-role="admin">User</div>
     <script>
       const div = document.querySelector('div');
       console.log(div.dataset.userId); // "123"
     </script>
     ```

8. **What is the purpose of the `<meta>` tag?**
   - **Answer**: The `<meta>` tag provides metadata like character encoding, viewport settings for responsiveness, or SEO information (description, keywords), placed in the `<head>`.
   - **Code Example**:
     ```html
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta name="description" content="A sample webpage">
     </head>
     ```

9. **What is the difference between `<script>` with and without the `defer` attribute?**
   - **Answer**: Without `defer`, `<script>` blocks HTML parsing while fetching/executing. With `defer`, the script loads asynchronously and executes after HTML parsing, improving page load speed.
   - **Code Example**:
     ```html
     <script defer src="script.js"></script>
     <!-- HTML parses without waiting for script.js -->
     <p>Content loads faster with defer.</p>
     ```

10. **What are void elements in HTML?**
    - **Answer**: Void elements are self-closing, cannot contain content, and don’t need a closing tag. Examples include `<img>`, `<br>`, `<hr>`, and `<meta>`. The trailing slash is optional in HTML5.
    - **Code Example**:
      ```html
      <img src="logo.png" alt="Logo">
      <br>
      <meta charset="UTF-8">
      ```

11. **What is the purpose of the `lang` attribute in the `<html>` tag?**
    - **Answer**: The `lang` attribute specifies the document’s primary language, aiding screen readers, search engines, and browsers for proper rendering and accessibility.
    - **Code Example**:
      ```html
      <html lang="en">
        <body>
          <p>This page is in English.</p>
        </body>
      </html>
      ```

12. **Explain the difference between `<em>` and `<i>` tags.**
    - **Answer**: `<em>` is semantic, indicating emphasized text (often italicized) with meaning for accessibility. `<i>` is non-semantic, used for stylistic italics (e.g., icons, foreign words).
    - **Code Example**:
      ```html
      <p>Learn <em>important</em> concepts.</p>
      <p><i>Foreign phrase:</i> C'est la vie.</p>
      ```

13. **What is the `contenteditable` attribute?**
    - **Answer**: The `contenteditable` attribute makes an element’s content editable by users, useful for rich text editors or inline editing.
    - **Code Example**:
      ```html
      <div contenteditable="true">Edit this text!</div>
      ```

14. **What are HTML entities, and why are they used?**
    - **Answer**: HTML entities (e.g., `&` for `&`, `<` for `<`) display reserved characters or symbols that might be parsed as code, ensuring proper rendering and preventing errors.
    - **Code Example**:
      ```html
      <p>Copyright &copy; 2025 &lt;Company&gt;</p>
      <!-- Renders as: Copyright © 2025 <Company> -->
      ```

15. **What is the purpose of the `<base>` tag?**
    - **Answer**: The `<base>` tag sets a base URL or target for all relative URLs in a document, placed in the `<head>`.
    - **Code Example**:
      ```html
      <head>
        <base href="https://example.com/">
      </head>
      <body>
        <a href="page.html">Link</a> <!-- Resolves to https://example.com/page.html -->
      </body>
      ```

16. **What is the difference between `<strong>` and `<b>` tags?**
    - **Answer**: `<strong>` is semantic, indicating important text (often bolded) with accessibility meaning. `<b>` is non-semantic, used for stylistic bold text without implying importance.
    - **Code Example**:
      ```html
      <p><strong>Warning:</strong> Critical update needed.</p>
      <p><b>Bold</b> text for style.</p>
      ```

17. **What is the `rel` attribute in the `<a>` tag?**
    - **Answer**: The `rel` attribute defines the relationship between the current document and the linked resource (e.g., `nofollow`, `noopener`, `alternate`).
    - **Code Example**:
      ```html
      <a href="external.com" rel="nofollow noopener">External Link</a>
      ```

18. **What is the purpose of the `srcset` attribute in images?**
    - **Answer**: The `srcset` attribute provides multiple image sources for different screen resolutions or pixel ratios, enabling browsers to select the optimal image.
    - **Code Example**:
      ```html
      <img src="low-res.jpg" srcset="high-res.jpg 2x, medium-res.jpg 1.5x" alt="Image">
      ```

19. **What are the benefits of using HTML5 over older versions?**
    - **Answer**: HTML5 introduces semantic elements, new APIs (Canvas, Web Storage), multimedia tags (`<video>`, `<audio>`), better accessibility, and mobile support, reducing plugin reliance (e.g., Flash).
    - **Code Example**:
      ```html
      <video controls>
        <source src="video.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      ```

20. **What is the `aria-label` attribute used for?**
    - **Answer**: The `aria-label` attribute provides a text description for elements without visible text, enhancing accessibility for screen readers.
    - **Code Example**:
      ```html
      <button aria-label="Close window">X</button>
      ```

21. **What is the difference between `<figure>` and `<img>`?**
    - **Answer**: `<img>` embeds an image. `<figure>` is a semantic container for images or illustrations, often with `<figcaption>` for captions, improving context and accessibility.
    - **Code Example**:
      ```html
      <figure>
        <img src="photo.jpg" alt="Scenic view">
        <figcaption>A beautiful landscape</figcaption>
      </figure>
      ```

22. **What is the `async` attribute in the `<script>` tag?**
    - **Answer**: The `async` attribute allows a script to load and execute asynchronously without blocking HTML parsing, suitable for independent scripts like analytics.
    - **Code Example**:
      ```html
      <script async src="analytics.js"></script>
      <p>Content loads without waiting.</p>
      ```

23. **What is the purpose of the `<picture>` element?**
    - **Answer**: The `<picture>` element provides multiple image sources/formats for responsive or art-directed images, with a fallback `<img>` tag.
    - **Code Example**:
      ```html
      <picture>
        <source media="(min-width: 800px)" srcset="large.jpg">
        <img src="small.jpg" alt="Image">
      </picture>
      ```

24. **What is the `tabindex` attribute?**
    - **Answer**: The `tabindex` attribute controls keyboard navigation focus order. `0` makes an element focusable naturally, positive values set a custom order, and `-1` makes it focusable but not in tab order.
    - **Code Example**:
      ```html
      <div tabindex="0">Focusable div</div>
      <button tabindex="-1">Non-tab focusable</button>
      ```

25. **What is the difference between `localStorage` and `sessionStorage`?**
    - **Answer**: `localStorage` persists data until cleared, with no expiration. `sessionStorage` stores data for the browser session (tab), clearing when the tab closes.
    - **Code Example**:
      ```html
      <script>
        localStorage.setItem('user', 'John'); // Persists
        sessionStorage.setItem('temp', 'Data'); // Tab-specific
      </script>
      ```

26. **What is the `role` attribute in HTML?**
    - **Answer**: The `role` attribute, part of ARIA, defines an element’s purpose for assistive technologies (e.g., `role="button"`), enhancing accessibility for non-standard elements.
    - **Code Example**:
      ```html
      <div role="button" onclick="doSomething()">Click me</div>
      ```

27. **What is the purpose of the `<canvas>` element?**
    - **Answer**: The `<canvas>` element provides a drawing surface for rendering graphics, animations, or games using JavaScript and the Canvas API.
    - **Code Example**:
      ```html
      <canvas id="myCanvas" width="200" height="100"></canvas>
      <script>
        const ctx = document.getElementById('myCanvas').getContext('2d');
        ctx.fillRect(10, 10, 50, 50);
      </script>
      ```

28. **What is the difference between `<link>` and `<a>` tags?**
    - **Answer**: `<link>` references external resources like CSS in the `<head>`. `<a>` creates hyperlinks for navigation to other pages or resources.
    - **Code Example**:
      ```html
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <a href="page.html">Go to page</a>
      </body>
      ```

29. **What is the `loading` attribute for images?**
    - **Answer**: The `loading` attribute controls image loading behavior. `lazy` defers loading until the image is near the viewport; `eager` loads immediately.
    - **Code Example**:
      ```html
      <img src="image.jpg" loading="lazy" alt="Lazy-loaded image">
      ```

30. **What are the advantages of using the `<template>` tag?**
    - **Answer**: The `<template>` tag holds inert HTML content that isn’t rendered until activated via JavaScript, useful for reusable components and reducing DOM manipulation.
    - **Code Example**:
      ```html
      <template id="myTemplate">
        <p>Reusable content</p>
      </template>
      <script>
        const template = document.getElementById('myTemplate').content.cloneNode(true);
        document.body.appendChild(template);
      </script>
      ```

31. **What is the purpose of the `<noscript>` tag?**
    - **Answer**: The `<noscript>` tag displays content when JavaScript is disabled or unsupported, ensuring fallback functionality.
    - **Code Example**:
      ```html
      <noscript>
        <p>Please enable JavaScript to view this content.</p>
      </noscript>
      ```

32. **What is the difference between `<meter>` and `<progress>` tags?**
    - **Answer**: `<meter>` represents a scalar measurement within a range (e.g., disk usage). `<progress>` shows task completion progress (e.g., file upload).
    - **Code Example**:
      ```html
      <meter value="0.6" min="0" max="1">60%</meter>
      <progress value="50" max="100">50%</progress>
      ```

33. **What is the `autocomplete` attribute in forms?**
    - **Answer**: The `autocomplete` attribute controls browser autofill for form fields, with values like `on`, `off`, or specific types (`email`, `name`).
    - **Code Example**:
      ```html
      <input type="text" autocomplete="name" placeholder="Full name">
      ```

34. **What is the purpose of the `<details>` and `<summary>` tags?**
    - **Answer**: `<details>` creates a collapsible section, with `<summary>` as the visible heading. Clicking the summary toggles content visibility.
    - **Code Example**:
      ```html
      <details>
        <summary>More Info</summary>
        <p>Hidden content revealed on click.</p>
      </details>
      ```

35. **What is the `accept` attribute in `<input>` tags?**
    - **Answer**: The `accept` attribute filters file types for `<input type="file">`, improving the file picker experience.
    - **Code Example**:
      ```html
      <input type="file" accept=".pdf,.docx">
      ```

36. **What is the difference between `required` and `disabled` attributes in forms?**
    - **Answer**: `required` makes a form field mandatory, preventing submission if empty. `disabled` makes a field uneditable and excludes it from form submission.
    - **Code Example**:
      ```html
      <form>
        <input type="text" required>
        <input type="text" disabled value="Read-only">
      </form>
      ```

37. **What is the `pattern` attribute in `<input>` tags?**
    - **Answer**: The `pattern` attribute specifies a regular expression for input validation, ensuring the value matches a specific format.
    - **Code Example**:
      ```html
      <input type="text" pattern="[0-9]{3}" placeholder="Enter 3 digits">
      ```

38. **What is the purpose of the `<output>` tag?**
    - **Answer**: The `<output>` tag displays the result of a calculation or user action in a form, typically updated via JavaScript.
    - **Code Example**:
      ```html
      <form oninput="result.value = Number(a.value) + Number(b.value)">
        <input type="number" id="a"> + <input type="number" id="b">
        <output name="result">0</output>
      </form>
      ```

39. **What is the `preload` attribute for `<video>` and `<audio>` tags?**
    - **Answer**: The `preload` attribute controls media preloading: `none` (no preload), `metadata` (load metadata), or `auto` (browser decides).
    - **Code Example**:
      ```html
      <video preload="metadata" controls>
        <source src="video.mp4" type="video/mp4">
      </video>
      ```

40. **What is the difference between the `hidden` attribute and CSS `display: none`?**
    - **Answer**: The `hidden` attribute natively hides an element, equivalent to `display: none`. It’s simpler but less flexible than CSS, which allows more styling control.
    - **Code Example**:
      ```html
      <div hidden>Not visible</div>
      <div style="display: none;">Also not visible</div>
      ```

41. **What is the purpose of the `<dialog>` tag?**
    - **Answer**: The `<dialog>` tag creates native modal or non-modal dialogs, controlled via JavaScript (`showModal()`, `close()`).
    - **Code Example**:
      ```html
      <dialog id="myDialog">
        <p>Modal content</p>
        <button onclick="myDialog.close()">Close</button>
      </dialog>
      <button onclick="myDialog.showModal()">Open</button>
      ```

42. **What is the `form` attribute in HTML?**
    - **Answer**: The `form` attribute associates an input with a specific `<form>` by ID, even if outside the form’s DOM structure.
    - **Code Example**:
      ```html
      <form id="myForm"></form>
      <input type="text" form="myForm">
      ```

43. **What is the `download` attribute in `<a>` tags?**
    - **Answer**: The `download` attribute prompts downloading of a resource instead of navigation, optionally specifying a filename.
    - **Code Example**:
      ```html
      <a href="file.pdf" download="document.pdf">Download PDF</a>
      ```

44. **What is the `referrerpolicy` attribute?**
    - **Answer**: The `referrerpolicy` attribute controls the HTTP referrer header for links or resources, with values like `no-referrer` or `origin`.
    - **Code Example**:
      ```html
      <a href="external.com" referrerpolicy="no-referrer">Link</a>
      ```

45. **What is the purpose of the `<slot>` element in Web Components?**
    - **Answer**: The `<slot>` element acts as a placeholder in Web Components for injected content, enabling reusable components with dynamic content.
    - **Code Example**:
      ```html
      <template id="myComponent">
        <slot name="content">Default content</slot>
      </template>
      <my-component>
        <span slot="content">Custom content</span>
      </my-component>
      ```

46. **What is the `crossorigin` attribute for `<script>` and `<img>` tags?**
    - **Answer**: The `crossorigin` attribute specifies how cross-origin requests are handled, with values like `anonymous` (no credentials) or `use-credentials`.
    - **Code Example**:
      ```html
      <img src="external.com/image.jpg" crossorigin="anonymous" alt="Image">
      ```

47. **What is the `spellcheck` attribute?**
    - **Answer**: The `spellcheck` attribute enables or disables browser spell-checking on editable elements (`true`, `false`, or `default`).
    - **Code Example**:
      ```html
      <textarea spellcheck="true">Check my spelling</textarea>
      ```

48. **What is the `draggable` attribute?**
    - **Answer**: The `draggable` attribute indicates whether an element can be dragged using the HTML5 Drag and Drop API (`true`, `false`, or `auto`).
    - **Code Example**:
      ```html
      <div draggable="true" ondragstart="drag(event)">Drag me</div>
      ```

49. **What is the `inert` attribute?**
    - **Answer**: The `inert` attribute makes an element and its descendants non-focusable and non-interactive, useful for disabling page sections (e.g., during modals).
    - **Code Example**:
      ```html
      <div inert>Non-interactive content</div>
      ```

50. **What is the purpose of the `<main>` tag?**
    - **Answer**: The `<main>` tag represents the primary content of a document, excluding headers, footers, or sidebars, enhancing accessibility and SEO.
    - **Code Example**:
      ```html
      <main>
        <h1>Main Content</h1>
        <p>This is the primary content area.</p>
      </main>
      ```