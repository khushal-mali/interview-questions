# 50 CSS Interview Questions with Detailed Answers and Code Examples

1. **What is the CSS Box Model?**
   - **Answer**: The CSS Box Model represents an element as a rectangular box, consisting of content, padding (space inside the border), border (surrounds padding), and margin (space outside the border). It determines how an element’s size and spacing are calculated.
   - **Code Example**:
     ```html
     <div class="box">Content</div>
     <style>
       .box {
         width: 100px;
         padding: 10px;
         border: 5px solid black;
         margin: 20px;
         /* Total width: 100 + 10 + 10 + 5 + 5 + 20 + 20 = 170px */
       }
     </style>
     ```

2. **What is the difference between `relative`, `absolute`, `fixed`, and `sticky` positioning?**
   - **Answer**: `relative` positions an element relative to its normal position; `absolute` positions it relative to the nearest positioned ancestor; `fixed` positions it relative to the viewport; `sticky` toggles between relative and fixed based on scroll position.
   - **Code Example**:
     ```html
     <div class="relative">Relative
       <div class="absolute">Absolute</div>
     </div>
     <div class="sticky">Sticky</div>
     <div class="fixed">Fixed</div>
     <style>
       .relative { position: relative; top: 10px; }
       .absolute { position: absolute; top: 20px; left: 20px; }
       .fixed { position: fixed; bottom: 10px; right: 10px; }
       .sticky { position: sticky; top: 0; }
     </style>
     ```

3. **What is the difference between `display: none` and `visibility: hidden`?**
   - **Answer**: `display: none` removes the element from the document flow, taking no space. `visibility: hidden` hides the element but reserves its space in the layout.
   - **Code Example**:
     ```html
     <div class="none">Gone</div>
     <div class="hidden">Hidden</div>
     <style>
       .none { display: none; }
       .hidden { visibility: hidden; }
     </style>
     ```

4. **What are CSS pseudo-classes and pseudo-elements?**
   - **Answer**: Pseudo-classes (e.g., `:hover`, `:focus`) style elements based on state or position. Pseudo-elements (e.g., `::before`, `::after`) style specific parts of an element or insert content.
   - **Code Example**:
     ```html
     <button class="btn">Hover me</button>
     <style>
       .btn:hover { background: blue; } /* Pseudo-class */
       .btn::before { content: "★ "; } /* Pseudo-element */
     </style>
     ```

5. **What is CSS specificity, and how is it calculated?**
   - **Answer**: Specificity determines which CSS rule applies when multiple rules target the same element. It’s calculated as: inline styles (1000), IDs (100), classes/attributes/pseudo-classes (10), elements/pseudo-elements (1). Higher specificity wins; ties go to the last rule.
   - **Code Example**:
     ```html
     <div id="box" class="container">Text</div>
     <style>
       div { color: red; } /* Specificity: 1 */
       .container { color: blue; } /* Specificity: 10 */
       #box { color: green; } /* Specificity: 100, wins */
     </style>
     ```

6. **What is the difference between `em` and `rem` units?**
   - **Answer**: `em` is relative to the font size of the element or its parent (if inherited). `rem` is relative to the root (`<html>`) font size, providing consistent scaling.
   - **Code Example**:
     ```html
     <div class="parent">
       <p class="em">EM text</p>
       <p class="rem">REM text</p>
     </div>
     <style>
       html { font-size: 16px; }
       .parent { font-size: 20px; }
       .em { font-size: 1.5em; } /* 1.5 * 20px = 30px */
       .rem { font-size: 1.5rem; } /* 1.5 * 16px = 24px */
     </style>
     ```

7. **What is the purpose of the `z-index` property?**
   - **Answer**: The `z-index` property controls the stacking order of positioned elements. Higher values place elements in front. It only works on elements with `position` (except `static`).
   - **Code Example**:
     ```html
     <div class="box1">Box 1</div>
     <div class="box2">Box 2</div>
     <style>
       .box1, .box2 { position: absolute; }
       .box1 { z-index: 10; background: red; }
       .box2 { z-index: 5; background: blue; }
     </style>
     ```

8. **What are CSS Flexbox and Grid, and how do they differ?**
   - **Answer**: Flexbox is a one-dimensional layout system for rows or columns, ideal for simple alignments. Grid is a two-dimensional system for rows and columns, suited for complex layouts.
   - **Code Example**:
     ```html
     <div class="flex">Flex items</div>
     <div class="grid">Grid items</div>
     <style>
       .flex { display: flex; justify-content: space-around; }
       .grid { display: grid; grid-template-columns: 1fr 1fr; }
     </style>
     ```

9. **What is the `box-sizing` property?**
   - **Answer**: The `box-sizing` property defines how width and height are calculated. `content-box` (default) excludes padding and border; `border-box` includes them.
   - **Code Example**:
     ```html
     <div class="box">Content</div>
     <style>
       .box {
         box-sizing: border-box;
         width: 100px;
         padding: 10px;
         border: 5px solid black;
         /* Total width: 100px (includes padding and border) */
       }
     </style>
     ```

10. **What is the purpose of the `transition` property?**
    - **Answer**: The `transition` property enables smooth changes between CSS property values over time, specifying property, duration, timing function, and delay.
    - **Code Example**:
      ```html
      <div class="box">Hover me</div>
      <style>
        .box {
          background: blue;
          transition: background-color 0.3s ease;
        }
        .box:hover { background: red; }
      </style>
      ```

11. **What is the difference between `margin` and `padding`?**
    - **Answer**: `margin` is the space outside an element’s border, affecting its position relative to others. `padding` is the space inside the border, between content and border.
    - **Code Example**:
      ```html
      <div class="box">Content</div>
      <style>
        .box {
          margin: 20px; /* Space outside */
          padding: 10px; /* Space inside */
          border: 1px solid black;
        }
      </style>
      ```

12. **What are CSS media queries?**
    - **Answer**: Media queries apply styles based on device characteristics like screen width or orientation, enabling responsive design.
    - **Code Example**:
      ```html
      <div class="box">Responsive</div>
      <style>
        .box { font-size: 16px; }
        @media (max-width: 600px) {
          .box { font-size: 14px; }
        }
      </style>
      ```

13. **What is the `calc()` function in CSS?**
    - **Answer**: The `calc()` function performs mathematical calculations for CSS property values, mixing units like `%` and `px`.
    - **Code Example**:
      ```html
      <div class="box">Calculated width</div>
      <style>
        .box { width: calc(100% - 20px); }
      </style>
      ```

14. **What is the purpose of the `transform` property?**
    - **Answer**: The `transform` property applies 2D or 3D transformations like rotate, scale, or translate, used for animations or visual effects without affecting layout.
    - **Code Example**:
      ```html
      <div class="box">Transform me</div>
      <style>
        .box:hover { transform: rotate(45deg); }
      </style>
      ```

15. **What is the difference between `inline`, `inline-block`, and `block` in `display`?**
    - **Answer**: `inline` flows within text, ignoring width/height; `inline-block` flows inline but respects width/height; `block` takes full width and starts on a new line.
    - **Code Example**:
      ```html
      <span class="inline">Inline</span>
      <span class="inline-block">Inline-block</span>
      <div class="block">Block</div>
      <style>
        .inline { display: inline; }
        .inline-block { display: inline-block; width: 100px; }
        .block { display: block; }
      </style>
      ```

16. **What is the `float` property, and what are its drawbacks?**
    - **Answer**: `float` aligns elements left or right, removing them from normal flow. Drawbacks include collapsing parent containers and less flexibility compared to Flexbox/Grid.
    - **Code Example**:
      ```html
      <div class="float">Float left</div>
      <div style="clear: both;">Next content</div>
      <style>
        .float { float: left; width: 100px; }
      </style>
      ```

17. **What is the purpose of the `::before` and `::after` pseudo-elements?**
    - **Answer**: `::before` and `::after` insert content before or after an element’s content, used for decorative elements or counters.
    - **Code Example**:
      ```html
      <p class="item">Item</p>
      <style>
        .item::before { content: "✔ "; }
      </style>
      ```

18. **What is the `position: sticky` behavior?**
    - **Answer**: `position: sticky` toggles between relative and fixed based on scroll position, sticking within its parent until it scrolls out of view.
    - **Code Example**:
      ```html
      <div class="sticky">Sticky Header</div>
      <style>
        .sticky { position: sticky; top: 0; background: lightgray; }
      </style>
      ```

19. **What is the `flex-grow` property in Flexbox?**
    - **Answer**: `flex-grow` specifies how much a flex item grows relative to others to fill available space. `0` prevents growth; higher values allocate more space.
    - **Code Example**:
      ```html
      <div class="flex">
        <div class="item">1</div>
        <div class="item grow">2</div>
      </div>
      <style>
        .flex { display: flex; }
        .item { width: 50px; }
        .grow { flex-grow: 1; }
      </style>
      ```

20. **What is the purpose of the `@keyframes` rule?**
    - **Answer**: The `@keyframes` rule defines animation sequences by specifying styles at different points, used with the `animation` property.
    - **Code Example**:
      ```html
      <div class="box">Animate me</div>
      <style>
        .box { animation: slide 2s infinite; }
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(100px); }
        }
      </style>
      ```

21. **What is the difference between `vh`, `vw`, `vmin`, and `vmax` units?**
    - **Answer**: `vh` is 1% of viewport height; `vw` is 1% of width; `vmin` is 1% of the smaller dimension; `vmax` is 1% of the larger dimension.
    - **Code Example**:
      ```html
      <div class="box">Viewport units</div>
      <style>
        .box { height: 50vh; width: 50vw; }
      </style>
      ```

22. **What is the `object-fit` property for images?**
    - **Answer**: The `object-fit` property controls how an image fits its container: `fill` (stretches), `contain` (scales to fit), `cover` (scales to cover, crops excess).
    - **Code Example**:
      ```html
      <img src="image.jpg" class="img">
      <style>
        .img { width: 200px; height: 100px; object-fit: cover; }
      </style>
      ```

23. **What is the purpose of the `clip-path` property?**
    - **Answer**: The `clip-path` property defines a clipping region, showing only part of an element, using shapes like circles or polygons.
    - **Code Example**:
      ```html
      <div class="box">Clipped</div>
      <style>
        .box { clip-path: circle(50% at center); background: blue; }
      </style>
      ```

24. **What is the difference between relative and absolute units in CSS?**
    - **Answer**: Relative units (`%`, `vw`, `rem`) scale based on another value (e.g., parent or root). Absolute units (`px`, `cm`) are fixed, ideal for precise layouts.
    - **Code Example**:
      ```html
      <div class="box">Units</div>
      <style>
        .box { width: 50%; height: 100px; /* % is relative, px is absolute */ }
      </style>
      ```

25. **What is the `will-change` property?**
    - **Answer**: The `will-change` property hints to browsers about properties that will change, optimizing animations or transitions, but overuse increases memory usage.
    - **Code Example**:
      ```html
      <div class="box">Animated</div>
      <style>
        .box { will-change: transform; transition: transform 0.3s; }
        .box:hover { transform: scale(1.2); }
      </style>
      ```

26. **What is the purpose of the `aspect-ratio` property?**
    - **Answer**: The `aspect-ratio` property sets a preferred width-to-height ratio, maintaining proportions for images or containers.
    - **Code Example**:
      ```html
      <div class="box">Video</div>
      <style>
        .box { aspect-ratio: 16 / 9; width: 100%; background: gray; }
      </style>
      ```

27. **What is the `gap` property in Flexbox and Grid?**
    - **Answer**: The `gap` property sets spacing between flex items or grid cells, a shorthand for `row-gap` and `column-gap`.
    - **Code Example**:
      ```html
      <div class="grid">
        <div>1</div>
        <div>2</div>
      </div>
      <style>
        .grid { display: grid; gap: 20px; }
      </style>
      ```

28. **What is the difference between `opacity` and `rgba` for transparency?**
    - **Answer**: `opacity` affects an element and its children, making everything transparent. `rgba` applies transparency to a specific property (e.g., background) without affecting children.
    - **Code Example**:
      ```html
      <div class="opacity">Text</div>
      <div class="rgba">Text</div>
      <style>
        .opacity { opacity: 0.5; }
        .rgba { background: rgba(0, 0, 0, 0.5); }
      </style>
      ```

29. **What is the purpose of the `currentColor` keyword?**
    - **Answer**: The `currentColor` keyword inherits the element’s `color` value for other properties, ensuring color consistency.
    - **Code Example**:
      ```html
      <div class="box">Border</div>
      <style>
        .box { color: blue; border: 1px solid currentColor; }
      </style>
      ```

30. **What is the `pointer-events` property?**
    - **Answer**: The `pointer-events` property controls whether an element responds to mouse events. `none` disables interactions without hiding the element.
    - **Code Example**:
      ```html
      <button class="btn">No click</button>
      <style>
        .btn { pointer-events: none; }
      </style>
      ```

31. **What is the `filter` property in CSS?**
    - **Answer**: The `filter` property applies graphical effects like blur, grayscale, or brightness to an element, often used for visual enhancements.
    - **Code Example**:
      ```html
      <img src="image.jpg" class="img">
      <style>
        .img { filter: grayscale(100%); }
      </style>
      ```

32. **What is the difference between `:hover` and `:active` pseudo-classes?**
    - **Answer**: `:hover` applies styles when the mouse is over an element. `:active` applies during a click or activation (e.g., mouse press).
    - **Code Example**:
      ```html
      <button class="btn">Click me</button>
      <style>
        .btn:hover { background: blue; }
        .btn:active { background: red; }
      </style>
      ```

33. **What is the purpose of the `grid-template-areas` property?**
    - **Answer**: The `grid-template-areas` property defines a grid layout using named areas, making complex layouts intuitive.
    - **Code Example**:
      ```html
      <div class="grid">
        <header>Header</header>
        <main>Main</main>
      </div>
      <style>
        .grid { display: grid; grid-template-areas: "header" "main"; }
        header { grid-area: header; }
        main { grid-area: main; }
      </style>
      ```

34. **What is the `backdrop-filter` property?**
    - **Answer**: The `backdrop-filter` property applies effects like blur to the area behind an element, often used for frosted glass effects.
    - **Code Example**:
      ```html
      <div class="box">Blurred background</div>
      <style>
        .box { backdrop-filter: blur(5px); background: rgba(255, 255, 255, 0.5); }
      </style>
      ```

35. **What is the purpose of the `@supports` rule?**
    - **Answer**: The `@supports` rule checks if a browser supports a CSS feature, applying styles if true, ensuring fallbacks for unsupported features.
    - **Code Example**:
      ```html
      <div class="box">Content</div>
      <style>
        .box { display: block; }
        @supports (display: grid) {
          .box { display: grid; }
        }
      </style>
      ```

36. **What is the difference between `min-width` and `max-width`?**
    - **Answer**: `min-width` prevents an element from shrinking below a value. `max-width` prevents it from growing beyond a value, useful for responsive layouts.
    - **Code Example**:
      ```html
      <div class="box">Resizable</div>
      <style>
        .box { min-width: 100px; max-width: 500px; }
      </style>
      ```

37. **What is the `content-visibility` property?**
    - **Answer**: The `content-visibility` property optimizes rendering by skipping off-screen content, improving performance when paired with `contain-intrinsic-size`.
    - **Code Example**:
      ```html
      <div class="box">Long content</div>
      <style>
        .box { content-visibility: auto; contain-intrinsic-size: 1000px; }
      </style>
      ```

38. **What is the purpose of the `::marker` pseudo-element?**
    - **Answer**: The `::marker` pseudo-element styles list item markers (e.g., bullets or numbers), providing precise control over their appearance.
    - **Code Example**:
      ```html
      <ul>
        <li>Item</li>
      </ul>
      <style>
        li::marker { color: red; }
      </style>
      ```

39. **What is the `line-clamp` property?**
    - **Answer**: The `line-clamp` property limits text to a specified number of lines, adding an ellipsis for overflow, useful for text truncation.
    - **Code Example**:
      ```html
      <p class="text">Long text that needs truncation...</p>
      <style>
        .text {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      </style>
      ```

40. **What is the difference between `rem` and `vw` units?**
    - **Answer**: `rem` is relative to the root font size. `vw` is relative to 1% of the viewport’s width, adapting to screen size.
    - **Code Example**:
      ```html
      <div class="box">Units</div>
      <style>
        html { font-size: 16px; }
        .box { font-size: 2rem; /* 32px */ width: 50vw; }
      </style>
      ```

41. **What is the `all` property in CSS?**
    - **Answer**: The `all` property resets all CSS properties to their initial or inherited values, useful for resetting styles in specific contexts.
    - **Code Example**:
      ```html
      <div class="box">Reset</div>
      <style>
        .box { all: initial; }
      </style>
      ```

42. **What is the purpose of the `var()` function in CSS?**
    - **Answer**: The `var()` function accesses CSS custom properties, enabling reusable and maintainable values for theming or dynamic styling.
    - **Code Example**:
      ```html
      <div class="box">Themed</div>
      <style>
        :root { --main-color: blue; }
        .box { color: var(--main-color); }
      </style>
      ```

43. **What is the `place-items` shorthand in CSS Grid?**
    - **Answer**: The `place-items` property is a shorthand for `align-items` and `justify-items`, aligning grid items along both axes.
    - **Code Example**:
      ```html
      <div class="grid">
        <div>Item</div>
      </div>
      <style>
        .grid { display: grid; place-items: center; }
      </style>
      ```

44. **What is the difference between `:first-child` and `:first-of-type`?**
    - **Answer**: `:first-child` targets the first child of a parent, regardless of type. `:first-of-type` targets the first sibling of a specific element type.
    - **Code Example**:
      ```html
      <div>
        <span>Span</span>
        <p>First p</p>
        <p>Second p</p>
      </div>
      <style>
        p:first-child { color: red; } /* No effect */
        p:first-of-type { color: blue; } /* First p */
      </style>
      ```

45. **What is the purpose of the `counter` function in CSS?**
    - **Answer**: The `counter` function generates dynamic numbering for lists or sections, used with `counter-increment` and `::before`/`::after`.
    - **Code Example**:
      ```html
      <h2>Section</h2>
      <h2>Section</h2>
      <style>
        h2 { counter-increment: section; }
        h2::before { content: counter(section) ". "; }
      </style>
      ```

46. **What is the `scroll-behavior` property?**
    - **Answer**: The `scroll-behavior` property controls scrolling animation. `smooth` animates scrolling transitions instead of instant jumps.
    - **Code Example**:
      ```html
      <a href="#bottom">Go to bottom</a>
      <div id="bottom">Bottom</div>
      <style>
        html { scroll-behavior: smooth; }
      </style>
      ```

47. **What is the difference between `overflow: auto` and `overflow: scroll`?**
    - **Answer**: `overflow: auto` adds scrollbars only when content overflows. `overflow: scroll` always shows scrollbars, even if content fits.
    - **Code Example**:
      ```html
      <div class="box">Short content</div>
      <style>
        .box { width: 100px; height: 100px; overflow: auto; }
      </style>
      ```

48. **What is the `writing-mode` property?**
    - **Answer**: The `writing-mode` property controls text flow direction, such as horizontal or vertical, useful for scripts like East Asian languages.
    - **Code Example**:
      ```html
      <div class="box">Vertical text</div>
      <style>
        .box { writing-mode: vertical-rl; }
      </style>
      ```

49. **What is the purpose of the `mask` property in CSS?**
    - **Answer**: The `mask` property applies a mask to an element, controlling visibility with shapes or images, often for creative effects.
    - **Code Example**:
      ```html
      <div class="box">Masked</div>
      <style>
        .box { mask: linear-gradient(to right, black, transparent); background: blue; }
      </style>
      ```

50. **What is the `contain` property?**
    - **Answer**: The `contain` property isolates an element’s rendering, layout, or painting to optimize performance, preventing effects on other elements.
    - **Code Example**:
      ```html
      <div class="box">Contained</div>
      <style>
        .box { contain: layout; }
      </style>
      ```