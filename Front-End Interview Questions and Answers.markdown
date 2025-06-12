# 150 Front-End Interview Questions with Detailed Answers

## HTML Questions

1. **What is the purpose of the DOCTYPE declaration?**
   - **Answer**: The DOCTYPE declaration, placed at the beginning of an HTML document (e.g., `<!DOCTYPE html>`), informs browsers about the document type and version of HTML being used (HTML5 in this case). It ensures the browser renders the page in standards mode, preventing quirks mode, which can lead to inconsistent rendering across browsers.

2. **What are semantic HTML elements?**
   - **Answer**: Semantic HTML elements clearly describe their meaning to both browsers and developers. Examples include `<header>`, `<footer>`, `<article>`, `<section>`, `<nav>`, and `<aside>`. They improve accessibility, SEO, and code readability compared to non-semantic elements like `<div>` or `<span>`.

3. **What is the difference between `<div>` and `<section>`?**
   - **Answer**: `<div>` is a generic, non-semantic container used for styling or grouping content without specific meaning. `<section>` is a semantic element representing a standalone section of content, typically with a heading, conveying meaning about the document structure.

4. **Explain the difference between block and inline elements.**
   - **Answer**: Block elements (e.g., `<div>`, `<p>`, `<h1>`) take up the full width of their parent container, start on a new line, and stack vertically. Inline elements (e.g., `<span>`, `<a>`, `<img>`) take only the width of their content, do not start on a new line, and flow within the text.

5. **What is the purpose of the `alt` attribute in images?**
   - **Answer**: The `alt` attribute provides alternative text for an `<img>` element, describing its content or purpose. It’s used by screen readers for accessibility, displayed if the image fails to load, and helps search engines understand the image for SEO.

6. **What is the difference between `id` and `class` attributes?**
   - **Answer**: The `id` attribute is unique to a single element on a page, used for specific targeting in CSS or JavaScript. The `class` attribute can be applied to multiple elements for shared styling or functionality. IDs have higher CSS specificity than classes.

7. **What are data attributes in HTML?**
   - **Answer**: Data attributes (e.g., `data-xyz="value"`) allow developers to store custom data on HTML elements. They are accessible via JavaScript (`element.dataset.xyz`) and CSS (`[data-xyz]`), useful for attaching metadata without affecting the DOM structure.

8. **What is the purpose of the `<meta>` tag?**
   - **Answer**: The `<meta>` tag provides metadata about the HTML document, such as character encoding (`<meta charset="UTF-8">`), viewport settings for responsive design (`<meta name="viewport" content="width=device-width, initial-scale=1.0">`), or SEO-related information like descriptions and keywords.

9. **What is the difference between `<script>` with and without the `defer` attribute?**
   - **Answer**: Without `defer`, a `<script>` tag blocks HTML parsing while the script is fetched and executed. With `defer`, the script is downloaded asynchronously and executed only after the HTML is fully parsed, improving page load performance.

10. **What are void elements in HTML?**
    - **Answer**: Void elements are self-closing and cannot contain content or have a closing tag. Examples include `<img>`, `<br>`, `<hr>`, `<input>`, and `<meta>`. In HTML5, the trailing slash (e.g., `<br/>`) is optional.

11. **What is the purpose of the `lang` attribute in the `<html>` tag?**
    - **Answer**: The `lang` attribute (e.g., `<html lang="en">`) specifies the primary language of the document’s content. It aids screen readers, search engines, and browsers in rendering content correctly, enhancing accessibility and SEO.

12. **Explain the difference between `<em>` and `<i>` tags.**
    - **Answer**: `<em>` is a semantic tag indicating emphasized text, typically rendered in italics, conveying meaning to assistive technologies. `<i>` is a non-semantic tag used for stylistic italics without implying emphasis, such as for icons or foreign words.

13. **What is the `contenteditable` attribute?**
    - **Answer**: The `contenteditable` attribute (e.g., `<div contenteditable="true">`) makes an element’s content editable by users. It’s commonly used for rich text editors or inline editing features in web applications.

14. **What are HTML entities and why are they used?**
    - **Answer**: HTML entities are special codes (e.g., `&amp;` for `&`, `&lt;` for `<`) used to display reserved characters or symbols that might otherwise be interpreted as code. They ensure proper rendering and prevent parsing errors.

15. **What is the purpose of the `<base>` tag?**
    - **Answer**: The `<base>` tag specifies a base URL or target for all relative URLs in a document (e.g., `<base href="https://example.com/">`). It must be placed in the `<head>` and applies to links, images, and other resources.

16. **What is the difference between `<strong>` and `<b>` tags?**
    - **Answer**: `<strong>` is a semantic tag indicating important text, typically rendered in bold, conveying meaning to assistive technologies. `<b>` is a non-semantic tag used for stylistic bold text without implying importance.

17. **What is the `rel` attribute in the `<a>` tag?**
    - **Answer**: The `rel` attribute specifies the relationship between the current document and the linked resource. Common values include `nofollow` (instructs search engines not to follow the link), `noopener` (prevents new window from accessing opener), and `alternate` (e.g., for RSS feeds).

18. **What is the purpose of the `srcset` attribute in images?**
    - **Answer**: The `srcset` attribute allows specifying multiple image sources for different screen resolutions or device pixel ratios (e.g., `<img srcset="img-1x.jpg 1x, img-2x.jpg 2x">`). It enables browsers to select the most appropriate image for optimal performance and quality.

19. **What are the benefits of using HTML5 over older versions?**
    - **Answer**: HTML5 introduces semantic elements (`<header>`, `<footer>`), new APIs (Canvas, Web Storage, WebSockets), multimedia tags (`<video>`, `<audio>`), better accessibility, and improved mobile support. It reduces reliance on plugins like Flash and enhances performance.

20. **What is the `aria-label` attribute used for?**
    - **Answer**: The `aria-label` attribute provides a label for elements lacking visible text, improving accessibility for screen readers (e.g., `<button aria-label="Close">X</button>`). It describes the element’s purpose to assistive technologies.

21. **What is the difference between `<figure>` and `<img>`?**
    - **Answer**: `<img>` is used to embed an image. `<figure>` is a semantic container for images, illustrations, or diagrams, often paired with `<figcaption>` for captions, providing context and improving accessibility.

22. **What is the `async` attribute in the `<script>` tag?**
    - **Answer**: The `async` attribute allows a script to load and execute asynchronously without blocking HTML parsing. Unlike `defer`, it executes as soon as it’s downloaded, potentially out of order, suitable for independent scripts like analytics.

23. **What is the purpose of the `<picture>` element?**
    - **Answer**: The `<picture>` element allows multiple image sources and formats (e.g., WebP, JPEG) for responsive or art-directed images. It contains `<source>` elements with media queries or format types and a fallback `<img>` tag.

24. **What is the `tabindex` attribute?**
    - **Answer**: The `tabindex` attribute controls the order in which elements receive focus during keyboard navigation. A value of `0` makes an element focusable in the natural order, a positive value sets a custom order, and `-1` makes it focusable but not in the tab order.

25. **What is the difference between `localStorage` and `sessionStorage`?**
    - **Answer**: Both are HTML5 Web Storage APIs. `localStorage` persists data until explicitly cleared, with no expiration. `sessionStorage` stores data only for the duration of the browser session (tab), clearing when the tab closes.

26. **What is the `role` attribute in HTML?**
    - **Answer**: The `role` attribute, part of ARIA (Accessible Rich Internet Applications), defines the purpose of an element for assistive technologies (e.g., `<div role="button">`). It enhances accessibility by providing semantic meaning to non-standard elements.

27. **What is the purpose of the `<canvas>` element?**
    - **Answer**: The `<canvas>` element provides a drawing surface for rendering graphics, animations, or games using JavaScript and the Canvas API. It’s used for dynamic content like charts, visualizations, or interactive applications.

28. **What is the difference between `<link>` and `<a>` tags?**
    - **Answer**: `<link>` is used in the `<head>` to reference external resources like CSS files (e.g., `<link rel="stylesheet" href="styles.css">`). `<a>` creates a hyperlink to navigate to another page or resource (e.g., `<a href="page.html">Link</a>`).

29. **What is the `loading` attribute for images?**
    - **Answer**: The `loading` attribute (e.g., `<img loading="lazy">`) controls image loading behavior. `lazy` defers loading until the image is near the viewport, improving performance. `eager` loads immediately, and `auto` lets the browser decide.

30. **What are the advantages of using the `<template>` tag?**
    - **Answer**: The `<template>` tag holds HTML content that is not rendered until activated via JavaScript (e.g., `template.content.cloneNode(true)`). It’s useful for reusable UI components, reducing DOM manipulation and improving performance.

31. **What is the purpose of the `<noscript>` tag?**
    - **Answer**: The `<noscript>` tag defines content to display if JavaScript is disabled or unsupported in the browser. It’s useful for providing fallback content or messages to ensure functionality for non-JavaScript users.

32. **What is the difference between `<meter>` and `<progress>` tags?**
    - **Answer**: `<meter>` represents a scalar measurement within a known range (e.g., disk usage, `<meter value="0.6">60%</meter>`). `<progress>` indicates the completion progress of a task (e.g., file upload, `<progress value="50" max="100">50%</progress>`).

33. **What is the `autocomplete` attribute in forms?**
    - **Answer**: The `autocomplete` attribute (e.g., `<input autocomplete="on">`) controls whether browsers can autofill form fields based on user data. Values include `on`, `off`, or specific types like `email` or `name` for precise autofill suggestions.

34. **What is the purpose of the `<details>` and `<summary>` tags?**
    - **Answer**: The `<details>` tag creates a collapsible section that is closed by default, with `<summary>` defining the visible heading. Clicking the summary toggles the content (e.g., `<details><summary>More</summary>Details here</details>`), useful for FAQs or accordions.

35. **What is the `accept` attribute in `<input>` tags?**
    - **Answer**: The `accept` attribute (e.g., `<input type="file" accept=".pdf,.doc">`) specifies the file types a file input can accept, filtering the file picker dialog to improve user experience.

36. **What is the difference between `required` and `disabled` attributes in forms?**
    - **Answer**: The `required` attribute (e.g., `<input required>`) makes a form field mandatory, preventing submission if empty. The `disabled` attribute (e.g., `<input disabled>`) makes a field uneditable and excludes it from form submission.

37. **What is the `pattern` attribute in `<input>` tags?**
    - **Answer**: The `pattern` attribute (e.g., `<input pattern="[0-9]{3}">`) specifies a regular expression that the input’s value must match for form validation. It’s used for custom validation, like ensuring a specific format.

38. **What is the purpose of the `<output>` tag?**
    - **Answer**: The `<output>` tag represents the result of a calculation or user action in a form (e.g., `<output name="result">0</output>`). It’s typically updated via JavaScript and enhances semantic form structure.

39. **What is the `preload` attribute for `<video>` and `<audio>` tags?**
    - **Answer**: The `preload` attribute (e.g., `<video preload="auto">`) controls how much media data is preloaded. Values are `none` (no preload), `metadata` (load metadata only), and `auto` (browser decides, often preloading the entire file).

40. **What is the difference between `hidden` attribute and CSS `display: none`?**
    - **Answer**: The `hidden` attribute (e.g., `<div hidden>`) is a global HTML attribute that hides an element natively, equivalent to `display: none` in CSS. The `hidden` attribute is simpler but less flexible than CSS, which allows more styling control.

41. **What is the purpose of the `<dialog>` tag?**
    - **Answer**: The `<dialog>` tag creates a native modal or non-modal dialog box (e.g., `<dialog open>Content</dialog>`). It can be controlled via JavaScript (`dialog.showModal()` or `dialog.close()`) and styled for custom popups.

42. **What is the `form` attribute in HTML?**
    - **Answer**: The `form` attribute (e.g., `<input form="formId">`) associates an input element with a specific `<form>` by its ID, even if the input is outside the form’s DOM structure, allowing flexible form layouts.

43. **What is the `download` attribute in `<a>` tags?**
    - **Answer**: The `download` attribute (e.g., `<a href="file.pdf" download="filename.pdf">`) prompts the browser to download the linked resource instead of navigating to it, optionally specifying a filename.

44. **What is the `referrerpolicy` attribute?**
    - **Answer**: The `referrerpolicy` attribute (e.g., `<a href="url" referrerpolicy="no-referrer">`) controls the information sent in the HTTP referrer header when clicking links or loading resources. Values include `no-referrer`, `origin`, and `strict-origin`.

45. **What is the purpose of the `<slot>` element in Web Components?**
    - **Answer**: The `<slot>` element, used within a `<template>` in Web Components, acts as a placeholder for content injected into a custom element. It enables reusable components with dynamic content (e.g., `<slot name="header">`).

46. **What is the `crossorigin` attribute for `<script>` and `<img>` tags?**
    - **Answer**: The `crossorigin` attribute (e.g., `<script crossorigin="anonymous">`) specifies how cross-origin requests are handled. Values are `anonymous` (no credentials) or `use-credentials` (send credentials), used for CORS-enabled resources.

47. **What is the `spellcheck` attribute?**
    - **Answer**: The `spellcheck` attribute (e.g., `<input spellcheck="true">`) enables or disables browser spell-checking on editable elements. Values are `true`, `false`, or `default` (browser-dependent).

48. **What is the `draggable` attribute?**
    - **Answer**: The `draggable` attribute (e.g., `<div draggable="true">`) indicates whether an element can be dragged using the HTML5 Drag and Drop API. Values are `true`, `false`, or `auto` (browser default).

49. **What is the `inert` attribute?**
    - **Answer**: The `inert` attribute (e.g., `<div inert>`) makes an element and its descendants non-focusable and non-interactive, useful for disabling sections of a page (e.g., during modals). It’s a newer HTML5 feature with limited browser support.

50. **What is the purpose of the `<main>` tag?**
    - **Answer**: The `<main>` tag represents the primary content of a document, excluding headers, footers, or sidebars. It enhances accessibility by identifying the main content area for screen readers and improves SEO.

## CSS Questions

51. **What is the CSS Box Model?**
    - **Answer**: The CSS Box Model describes the rectangular boxes generated for elements, consisting of content (width/height), padding (space inside the border), border (surrounds padding), and margin (space outside the border). It determines an element’s size and spacing.

52. **What is the difference between `relative`, `absolute`, `fixed`, and `sticky` positioning?**
    - **Answer**:
      - `relative`: Positioned relative to its normal position; offsets (`top`, `left`) shift it without affecting others.
      - `absolute`: Positioned relative to the nearest positioned ancestor or the document; removes it from normal flow.
      - `fixed`: Positioned relative to the viewport; stays in place during scrolling.
      - `sticky`: Toggles between `relative` and `fixed` based on scroll position, sticking within its parent.

53. **What is the difference between `display: none` and `visibility: hidden`?**
    - **Answer**: `display: none` removes the element from the document flow, taking no space. `visibility: hidden` hides the element but preserves its space in the layout. Both prevent interaction, but `display: none` affects layout.

54. **What are CSS pseudo-classes and pseudo-elements?**
    - **Answer**: Pseudo-classes (e.g., `:hover`, `:focus`) style elements based on state or position (e.g., `:nth-child(2n)`). Pseudo-elements (e.g., `::before`, `::after`) style specific parts of an element or insert content, like adding a decorative icon.

55. **What is CSS specificity and how is it calculated?**
    - **Answer**: Specificity determines which CSS rule applies when multiple rules target the same element. It’s calculated using a hierarchy: inline styles (1000), IDs (100), classes/attributes/pseudo-classes (10), elements/pseudo-elements (1). Higher specificity wins; ties are resolved by the last rule.

56. **What is the difference between `em` and `rem` units?**
    - **Answer**: `em` is relative to the font size of the element or its parent (if inherited). `rem` is relative to the root (`<html>`) font size. `rem` provides consistent scaling, while `em` can compound based on nesting.

57. **What is the purpose of the `z-index` property?**
    - **Answer**: The `z-index` property controls the stacking order of positioned elements (e.g., `position: absolute`). Higher `z-index` values place elements in front. It only works on positioned elements and depends on stacking contexts.

58. **What are CSS Flexbox and Grid, and how do they differ?**
    - **Answer**: Flexbox is a one-dimensional layout system for aligning items in a row or column, ideal for navigation bars or form layouts. Grid is a two-dimensional system for rows and columns, perfect for complex layouts like dashboards. Flexbox is simpler; Grid offers precise control.

59. **What is the `box-sizing` property?**
    - **Answer**: The `box-sizing` property defines how width and height are calculated. `content-box` (default) includes only content, excluding padding and border. `border-box` includes content, padding, and border, simplifying sizing calculations.

60. **What is the purpose of the `transition` property?**
    - **Answer**: The `transition` property enables smooth changes between CSS property values over time (e.g., `transition: background-color 0.3s ease`). It specifies the property, duration, timing function, and delay for animations like hover effects.

61. **What is the difference between `margin` and `padding`?**
    - **Answer**: `margin` is the space outside an element’s border, affecting its position relative to others. `padding` is the space inside the border, between the content and the border, affecting the content’s positioning within the element.

62. **What are CSS media queries?**
    - **Answer**: Media queries apply styles based on device characteristics like screen width or orientation (e.g., `@media (max-width: 600px) { body { font-size: 16px; } }`). They enable responsive design for different devices.

63. **What is the `calc()` function in CSS?**
    - **Answer**: The `calc()` function performs mathematical calculations to determine CSS property values (e.g., `width: calc(100% - 20px)`). It supports addition, subtraction, multiplication, and division, mixing units like `%` and `px`.

64. **What is the purpose of the `transform` property?**
    - **Answer**: The `transform` property applies 2D or 3D transformations like `rotate`, `scale`, `translate`, or `skew` (e.g., `transform: rotate(45deg)`). It’s used for animations or visual effects without affecting the document flow.

65. **What is the difference between `inline`, `inline-block`, and `block` in `display`?**
    - **Answer**:
      - `inline`: Elements flow within text, respecting only left/right margins; width/height are ignored.
      - `inline-block`: Like `inline`, but respects width/height and top/bottom margins, allowing block-like sizing.
      - `block`: Takes full width, starts on a new line, and respects all margins and dimensions.

66. **What is the `float` property, and what are its drawbacks?**
    - **Answer**: The `float` property (e.g., `float: left`) removes elements from the normal flow, aligning them to the left or right, often used for text wrapping around images. Drawbacks include collapsing parent containers, requiring `clear` fixes, and being less flexible than Flexbox or Grid.

67. **What is the purpose of the `::before` and `::after` pseudo-elements?**
    - **Answer**: `::before` and `::after` insert content before or after an element’s content (e.g., `content: "★"`). They’re used for decorative elements, icons, or counters, styled via CSS but not part of the DOM.

68. **What is the `position: sticky` behavior?**
    - **Answer**: `position: sticky` toggles between `relative` and `fixed` based on the scroll position. The element stays in its normal flow until it reaches a specified offset (e.g., `top: 0`), then sticks to the viewport until its parent scrolls out of view.

69. **What is the `flex-grow` property in Flexbox?**
    - **Answer**: The `flex-grow` property specifies how much a flex item grows relative to others to fill available space (e.g., `flex-grow: 1`). A value of `0` prevents growth, while higher values allocate more space proportionally.

70. **What is the purpose of the `@keyframes` rule?**
    - **Answer**: The `@keyframes` rule defines animation sequences by specifying styles at different points (e.g., `@keyframes slide { 0% { left: 0; } 100% { left: 100px; } }`). It’s used with the `animation` property for custom animations.

71. **What is the difference between `vh`, `vw`, `vmin`, and `vmax` units?**
    - **Answer**:
      - `vh`: 1% of the viewport’s height.
      - `vw`: 1% of the viewport’s width.
      - `vmin`: 1% of the smaller viewport dimension (width or height).
      - `vmax`: 1% of the larger viewport dimension. They’re used for responsive sizing.

72. **What is the `object-fit` property for images?**
    - **Answer**: The `object-fit` property controls how an image or video fits within its container (e.g., `object-fit: cover`). Values include `fill` (stretches), `contain` (scales to fit), `cover` (scales to cover, cropping excess), and `none` (original size).

73. **What is the purpose of the `clip-path` property?**
    - **Answer**: The `clip-path` property defines a clipping region to show only part of an element (e.g., `clip-path: circle(50%)`). It supports shapes like circles, polygons, or SVGs for creative layouts.

74. **What is the difference between `relative` and `absolute` units in CSS?**
    - **Answer**: Relative units (`%`, `vw`, `vh`, `rem`, `em`) scale based on another value (e.g., parent size or root font size). Absolute units (`px`, `cm`, `in`) have fixed sizes regardless of context, suitable for print or precise layouts.

75. **What is the `will-change` property?**
    - **Answer**: The `will-change` property (e.g., `will-change: transform`) hints to browsers about properties that will change, optimizing animations or transitions by preparing the rendering engine, though overuse can increase memory consumption.

76. **What is the purpose of the `aspect-ratio` property?**
    - **Answer**: The `aspect-ratio` property (e.g., `aspect-ratio: 16 / 9`) sets a preferred width-to-height ratio for an element, useful for images, videos, or containers to maintain proportions without manual calculations.

77. **What is the `gap` property in Flexbox and Grid?**
    - **Answer**: The `gap` property (e.g., `gap: 20px`) sets the spacing between flex items or grid cells. It’s a shorthand for `row-gap` and `column-gap`, simplifying layout spacing compared to margins.

78. **What is the difference between `opacity` and `rgba` for transparency?**
    - **Answer**: `opacity` (e.g., `opacity: 0.5`) affects an element and its children, making everything semi-transparent. `rgba` (e.g., `background: rgba(0, 0, 0, 0.5)`) applies transparency only to a specific property (like background) without affecting children.

79. **What is the purpose of the `currentColor` keyword?**
    - **Answer**: The `currentColor` keyword inherits the element’s `color` property value for other properties (e.g., `border: 1px solid currentColor`). It ensures consistency in color schemes across properties.

80. **What is the `pointer-events` property?**
    - **Answer**: The `pointer-events` property controls whether an element responds to mouse events (e.g., `pointer-events: none` disables clicks). It’s useful for overlay elements or disabling interactions without hiding the element.

81. **What is the `filter` property in CSS?**
    - **Answer**: The `filter` property applies graphical effects like `blur`, `grayscale`, or `brightness` to an element (e.g., `filter: blur(5px)`). It’s used for visual enhancements, often in animations or hover effects.

82. **What is the difference between `:hover` and `:active` pseudo-classes?**
    - **Answer**: `:hover` applies styles when the mouse pointer is over an element. `:active` applies styles when an element is being clicked or activated (e.g., during a mouse press), typically used for button feedback.

83. **What is the purpose of the `grid-template-areas` property?**
    - **Answer**: The `grid-template-areas` property defines a grid layout using named areas (e.g., `grid-template-areas: "header header" "sidebar main"`). It makes complex layouts intuitive by assigning grid items to named regions.

84. **What is the `backdrop-filter` property?**
    - **Answer**: The `backdrop-filter` property applies effects like `blur` or `grayscale` to the area behind an element (e.g., `backdrop-filter: blur(10px)`). It’s useful for frosted glass effects in modals or overlays.

85. **What is the purpose of the `@supports` rule?**
    - **Answer**: The `@supports` rule checks if a browser supports a CSS feature before applying styles (e.g., `@supports (display: grid) { .container { display: grid; } }`). It ensures fallback styles for unsupported features.

86. **What is the difference between `min-width` and `max-width`?**
    - **Answer**: `min-width` sets the minimum width an element can have, preventing it from shrinking below that value. `max-width` sets the maximum width, preventing it from growing beyond that value, useful for responsive layouts.

87. **What is the `content-visibility` property?**
    - **Answer**: The `content-visibility` property (e.g., `content-visibility: auto`) optimizes rendering by skipping off-screen content, improving performance. It’s paired with `contain-intrinsic-size` to reserve space for layout stability.

88. **What is the purpose of the `::marker` pseudo-element?**
    - **Answer**: The `::marker` pseudo-element styles the markers of list items (e.g., bullets or numbers, `li::marker { color: red; }`). It provides precise control over list marker appearance.

89. **What is the `line-clamp` property?**
    - **Answer**: The `line-clamp` property (e.g., `-webkit-line-clamp: 3`) limits text to a specified number of lines, adding an ellipsis (`...`) for overflow. It’s useful for truncating multi-line text in previews.

90. **What is the difference between `rem` and `vw` units?**
    - **Answer**: `rem` is relative to the root font size (e.g., `16px` by default). `vw` is relative to 1% of the viewport’s width. `rem` is consistent for typography, while `vw` adapts to screen size for responsive layouts.

91. **What is the `all` property in CSS?**
    - **Answer**: The `all` property resets all CSS properties for an element to their initial or inherited values (e.g., `all: initial`). It’s useful for resetting styles in specific contexts, though it’s rarely used due to its broad impact.

92. **What is the purpose of the `var()` function in CSS?**
    - **Answer**: The `var()` function accesses CSS custom properties (e.g., `--main-color: blue; color: var(--main-color);`). It enables reusable, maintainable values, often used for theming or dynamic styling.

93. **What is the `place-items` shorthand in CSS Grid?**
    - **Answer**: The `place-items` property is a shorthand for `align-items` and `justify-items` in Grid (e.g., `place-items: center`). It aligns grid items along both axes, simplifying centering or alignment tasks.

94. **What is the difference between `:first-child` and `:first-of-type`?**
    - **Answer**: `:first-child` targets the first child of a parent, regardless of type. `:first-of-type` targets the first sibling of a specific element type (e.g., the first `<p>` among siblings).

95. **What is the purpose of the `counter` function in CSS?**
    - **Answer**: The `counter` function (e.g., `content: counter(chapter)` with `counter-increment: chapter`) generates dynamic content for numbering, typically used for ordered lists, chapters, or sections in conjunction with `::before` or `::after`.

96. **What is the `scroll-behavior` property?**
    - **Answer**: The `scroll-behavior` property (e.g., `scroll-behavior: smooth`) controls the scrolling animation for an element or the entire page. When set to `smooth`, scrolling transitions are animated rather than instant.

97. **What is the difference between `overflow: auto` and `overflow: scroll`?**
    - **Answer**: `overflow: auto` adds scrollbars only when content overflows, keeping the layout clean. `overflow: scroll` always displays scrollbars, even if content fits, which can reserve space but may affect aesthetics.

98. **What is the `writing-mode` property?**
    - **Answer**: The `writing-mode` property (e.g., `writing-mode: vertical-rl`) controls the text flow direction, such as horizontal (default) or vertical (e.g., for East Asian scripts). It affects layout and text orientation.

99. **What is the purpose of the `mask` property in CSS?**
    - **Answer**: The `mask` property applies a mask to an element, controlling which parts are visible (e.g., `mask: url(mask.png)`). It’s used for creative effects, like cutting out shapes or applying transparency gradients.

100. **What is the `contain` property?**
    - **Answer**: The `contain` property (e.g., `contain: strict`) isolates an element’s rendering, layout, or painting to optimize performance. Values like `layout`, `paint`, or `strict` prevent the element from affecting others, improving rendering speed.

## JavaScript Questions

101. **What is the difference between `var`, `let`, and `const`?**
    - **Answer**: `var` is function-scoped, hoisted, and allows redeclaration. `let` is block-scoped, hoisted but not initialized (causing a Temporal Dead Zone), and allows reassignment. `const` is block-scoped, cannot be reassigned, but its object properties can be modified.

102. **What is hoisting in JavaScript?**
    - **Answer**: Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their scope during compilation. `var` variables are initialized with `undefined`; `let` and `const` are hoisted but not initialized, causing a Temporal Dead Zone.

103. **What is the difference between `==` and `===` in JavaScript?**
    - **Answer**: `==` performs loose equality, coercing types to compare values (e.g., `5 == "5"` is `true`). `===` performs strict equality, comparing both value and type without coercion (e.g., `5 === "5"` is `false`).

104. **What is the purpose of the `this` keyword?**
    - **Answer**: The `this` keyword refers to the context in which a function is executed. Its value depends on how the function is called: the global object (`window` in browsers) in global scope, the object for methods, or a specified object with `call`, `apply`, or `bind`.

105. **What are closures in JavaScript?**
    - **Answer**: A closure is a function that retains access to its outer scope’s variables even after the outer function has returned. It’s useful for data privacy, event handlers, or maintaining state (e.g., a counter function that remembers its count).

106. **What is the event loop in JavaScript?**
    - **Answer**: The event loop manages asynchronous operations in JavaScript’s single-threaded environment. It processes the call stack, then handles tasks from the callback queue (e.g., timers, events) when the stack is empty, enabling non-blocking operations like `setTimeout`.

107. **What is the difference between `null` and `undefined`?**
    - **Answer**: `null` represents an intentional absence of a value, explicitly set by the developer. `undefined` indicates a variable has been declared but not assigned a value or a property doesn’t exist. Both are falsy but differ in intent and type.

108. **What are arrow functions, and how do they differ from regular functions?**
    - **Answer**: Arrow functions (`=>`) are concise function expressions that don’t bind their own `this` or `arguments`, inheriting them from the parent scope. They’re ideal for callbacks but cannot be used as constructors or with `call`, `apply`, or `bind` to change `this`.

109. **What is the purpose of `async` and `await`?**
    - **Answer**: `async` declares a function that returns a Promise. `await` pauses execution inside an `async` function until a Promise resolves, making asynchronous code read like synchronous code, improving readability for tasks like fetching data.

110. **What is the difference between `call`, `apply`, and `bind`?**
    - **Answer**:
      - `call`: Invokes a function with a specified `this` and individual arguments (e.g., `fn.call(obj, arg1, arg2)`).
      - `apply`: Invokes a function with a specified `this` and an array of arguments (e.g., `fn.apply(obj, [arg1, arg2])`).
      - `bind`: Returns a new function with a fixed `this` and optional preset arguments, without invoking it (e.g., `fn.bind(obj)`).

111. **What is event delegation?**
    - **Answer**: Event delegation attaches a single event listener to a parent element to handle events from its children, leveraging event bubbling. It’s efficient for dynamic elements (e.g., adding a listener to a `<ul>` to handle `<li>` clicks).

112. **What is the difference between `forEach` and `map`?**
    - **Answer**: `forEach` iterates over an array, executing a callback for each element without returning a value, used for side effects. `map` creates a new array with the results of the callback for each element, used for transforming data.

113. **What are Promises in JavaScript?**
    - **Answer**: A Promise is an object representing the eventual completion or failure of an asynchronous operation. It has states (`pending`, `fulfilled`, `rejected`) and methods like `.then()`, `.catch()`, and `.finally()` for handling asynchronous results.

114. **What is the purpose of the `try...catch` block?**
    - **Answer**: The `try...catch` block handles errors in JavaScript. Code in the `try` block is executed, and if an error occurs, the `catch` block handles it, preventing the script from crashing (e.g., `try { JSON.parse(invalid); } catch (e) { console.error(e); }`).

115. **What is the difference between `let` and `const` in a block scope?**
    - **Answer**: `let` allows reassignment of a variable’s value within its block scope. `const` prevents reassignment, but if the value is an object or array, its properties or elements can still be modified. Both are block-scoped.

116. **What is the `spread` operator (`...`)?**
    - **Answer**: The spread operator expands elements of an iterable (e.g., array, string) or object properties. It’s used for copying arrays/objects (`[...arr]`, `{...obj}`), merging, or passing arguments (e.g., `Math.max(...numbers)`).

117. **What is the `rest` parameter in JavaScript?**
    - **Answer**: The rest parameter (`...param`) collects all remaining arguments into an array in a function (e.g., `function sum(...numbers) { return numbers.reduce((a, b) => a + b); }`). It’s useful for variable-length argument lists.

118. **What is the difference between `setTimeout` and `setInterval`?**
    - **Answer**: `setTimeout` executes a function once after a specified delay (e.g., `setTimeout(fn, 1000)`). `setInterval` repeatedly executes a function at a specified interval until cleared (e.g., `setInterval(fn, 1000)`).

119. **What is a JavaScript module?**
    - **Answer**: A module is a JavaScript file that encapsulates code, exporting specific variables or functions (e.g., `export const name = "value"`) and importing them elsewhere (`import { name } from './module.js'`). It promotes modularity and avoids global scope pollution.

120. **What is the purpose of the `addEventListener` method?**
    - **Answer**: The `addEventListener` method attaches an event handler to an element without overwriting existing handlers (e.g., `element.addEventListener('click', fn)`). It supports options like `{ once: true }` for one-time events or `capture` for event phase control.

121. **What is the `Array.prototype.filter` method?**
    - **Answer**: The `filter` method creates a new array with elements that pass a test provided by a callback (e.g., `arr.filter(x => x > 0)`). It’s non-destructive and used for selecting subsets of data based on conditions.

122. **What is the difference between `slice` and `splice`?**
    - **Answer**: `slice` returns a shallow copy of a portion of an array without modifying the original (e.g., `arr.slice(1, 3)`). `splice` modifies the original array by removing or replacing elements and returns the removed elements (e.g., `arr.splice(1, 2, 'new')`).

123. **What is the `JSON.parse` and `JSON.stringify` methods?**
    - **Answer**: `JSON.parse` converts a JSON string into a JavaScript object (e.g., `JSON.parse('{"key": "value"}')`). `JSON.stringify` converts a JavaScript object into a JSON string (e.g., `JSON.stringify({ key: "value" })`). They’re used for data serialization.

124. **What is the purpose of the `bind` method?**
    - **Answer**: The `bind` method creates a new function with a specified `this` context and optional preset arguments (e.g., `fn.bind(obj, arg1)`). It’s useful for ensuring the correct `this` in callbacks or event handlers.

125. **What is the difference between `event.preventDefault` and `event.stopPropagation`?**
    - **Answer**: `event.preventDefault()` prevents the default action of an event (e.g., stopping a form submission). `event.stopPropagation()` prevents the event from bubbling up or capturing down the DOM tree, stopping further handlers from executing.

126. **What is a JavaScript Promise chain?**
    - **Answer**: A Promise chain is a sequence of `.then()` or `.catch()` calls to handle asynchronous operations in order (e.g., `fetch(url).then(res => res.json()).then(data => console.log(data))`). It ensures sequential execution and error handling.

127. **What is the `Array.prototype.reduce` method?**
    - **Answer**: The `reduce` method applies a callback to each element to reduce the array to a single value (e.g., `arr.reduce((sum, x) => sum + x, 0)`). It’s used for aggregations like summing or transforming arrays.

128. **What is the difference between `call` and `apply`?**
    - **Answer**: Both invoke a function with a specified `this`. `call` passes arguments individually (e.g., `fn.call(obj, arg1, arg2)`). `apply` passes arguments as an array (e.g., `fn.apply(obj, [arg1, arg2])`), useful for dynamic argument lists.

129. **What is the `Object.defineProperty` method?**
    - **Answer**: The `Object.defineProperty` method defines or modifies a property on an object, allowing control over its value, writability, enumerability, and configurability (e.g., `Object.defineProperty(obj, 'key', { value: 42, writable: false })`).

130. **What is the `debounce` function in JavaScript?**
    - **Answer**: A debounce function delays execution of a function until a specified time has passed since its last call, useful for rate-limiting frequent events like window resizing or input typing (e.g., search suggestions).

131. **What is the `throttle` function in JavaScript?**
    - **Answer**: A throttle function ensures a function is called at most once per specified interval, regardless of how often it’s triggered. It’s used for controlling event frequency, like scroll or mouse move handlers.

132. **What is the purpose of the `Map` object?**
    - **Answer**: The `Map` object stores key-value pairs where keys can be any type (unlike objects, which use strings/symbols). It provides methods like `set`, `get`, `has`, and `delete` for efficient data management (e.g., `map.set(key, value)`).

133. **What is the `Set` object in JavaScript?**
    - **Answer**: The `Set` object stores unique values of any type, eliminating duplicates (e.g., `new Set([1, 1, 2])` results in `{1, 2}`). It provides methods like `add`, `has`, and `delete` for managing collections.

134. **What is the difference between `for...in` and `for...of` loops?**
    - **Answer**: `for...in` iterates over an object’s enumerable properties (e.g., `for (key in obj)`), including inherited ones. `for...of` iterates over iterable objects’ values (e.g., `for (value of arr)`), like arrays or strings, excluding object properties.

135. **What is the `fetch` API?**
    - **Answer**: The `fetch` API provides a modern interface for making HTTP requests (e.g., `fetch(url).then(res => res.json())`). It returns a Promise, supports JSON, text, or blob responses, and is more flexible than `XMLHttpRequest`.

136. **What is the purpose of the `class` syntax in JavaScript?**
    - **Answer**: The `class` syntax is syntactic sugar for constructor functions, providing a cleaner way to create objects and handle inheritance (e.g., `class MyClass { constructor() {} }`). It supports methods, getters/setters, and extends for inheritance.

137. **What is the `Symbol` data type?**
    - **Answer**: `Symbol` is a primitive type for creating unique identifiers (e.g., `const sym = Symbol('id')`). It’s used as object keys to avoid property collisions or to define custom behavior in objects (e.g., `Symbol.iterator`).

138. **What is the `WeakMap` object?**
    - **Answer**: A `WeakMap` is a collection of key-value pairs where keys are objects, and the references are weakly held, allowing garbage collection if the key is no longer referenced. It’s used for private data storage without memory leaks.

139. **What is the purpose of the `Object.assign` method?**
    - **Answer**: The `Object.assign` method copies enumerable own properties from one or more source objects to a target object (e.g., `Object.assign(target, source1, source2)`). It’s used for shallow copying or merging objects.

140. **What is the `Array.prototype.flat` method?**
    - **Answer**: The `flat` method creates a new array with all sub-array elements concatenated up to a specified depth (e.g., `[1, [2, [3]]].flat(2)` results in `[1, 2, 3]`). It simplifies nested array handling.

141. **What is the `requestAnimationFrame` method?**
    - **Answer**: The `requestAnimationFrame` method schedules a function to run before the next browser repaint, ideal for smooth animations (e.g., `requestAnimationFrame(animate)`). It optimizes performance by syncing with the browser’s refresh rate.

142. **What is the difference between `innerHTML` and `textContent`?**
    - **Answer**: `innerHTML` gets or sets an element’s HTML content, parsing it as HTML (e.g., `<div>Text</div>`). `textContent` gets or sets plain text, ignoring HTML tags, and is safer for preventing XSS attacks.

143. **What is the `Array.prototype.some` method?**
    - **Answer**: The `some` method tests whether at least one element in an array passes a callback test (e.g., `arr.some(x => x > 0)`). It returns `true` if any element satisfies the condition, otherwise `false`.

144. **What is the `Array.prototype.every` method?**
    - **Answer**: The `every` method tests whether all elements in an array pass a callback test (e.g., `arr.every(x => x > 0)`). It returns `true` only if all elements satisfy the condition, otherwise `false`.

145. **What is the purpose of the `Proxy` object?**
    - **Answer**: The `Proxy` object wraps another object to intercept operations like property access or assignment (e.g., `new Proxy(target, handler)`). It’s used for validation, logging, or modifying behavior of objects dynamically.

146. **What is the `Reflect` API?**
    - **Answer**: The `Reflect` API provides methods for performing common object operations (e.g., `Reflect.get(obj, key)`). It’s used with Proxies for consistent, functional access to object properties and is less error-prone than direct property access.

147. **What is the `Object.freeze` method?**
    - **Answer**: The `Object.freeze` method makes an object immutable by preventing property additions, deletions, or modifications (e.g., `Object.freeze(obj)`). It’s a shallow freeze, meaning nested objects can still be modified.

148. **What is the purpose of the `async function*` syntax?**
    - **Answer**: The `async function*` syntax defines an async generator function that yields Promises, allowing iteration over asynchronous data (e.g., `async function* gen() { yield await fetch(url); }`). It’s used for streaming or async iteration.

149. **What is the `IntersectionObserver` API?**
    - **Answer**: The `IntersectionObserver` API observes changes in an element’s visibility relative to an ancestor or viewport (e.g., `new IntersectionObserver(callback)`). It’s used for lazy loading, infinite scrolling, or triggering animations when elements enter the viewport.

150. **What is the difference between `localStorage` and `cookies`?**
    - **Answer**: `localStorage` stores data (up to 5-10MB) with no expiration, accessible only client-side. Cookies store smaller data (up to 4KB), can have expiration dates, and are sent with HTTP requests, making them suitable for server-side use but less secure.