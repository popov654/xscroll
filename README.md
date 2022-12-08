# xscroll
A library adding "native" scrolling behavior to any HTML element (textareas, divs, etc.)
Inertial scrolling on touch devices is also supported by default

### Usage

Please see the exa,ples, they are quite self-explanatory.

Some hints:

1. You have to initialize the containers explicitly in your code somewhere, e.g. on page load.
2. CSS ctyling is up to you, you can find all class names in the examples
3. You can use `scrollLeft`, `scrollTop`, `scrollWidth` and `scrollHeight` as it would be a native scroll
4. When there is little content the scrollbars will disappear and then come back when necessary thanks to the DOM modification watching
5. Everything about sizing and behavior is controlled via attributes. The most useful are:

|  Attribute              |  Description                                       |
|-------------------------|----------------------------------------------------|
| __scroll-size__         |  the width of the scrollbar                        |
| __button-size__         |  the width of the buttons along the scroll axis    |
| __thumb-length__        |  the width of the thumb along the scroll axis      |
| __thumb-width__         |  the width of the thumb along the cross-axis<br>(the thumb can be narrower or wider than the scrollbar) |
| __scroll-delta__        |  one mouse wheel tick will scroll the contents by this amount of pixels |
| __viewport-width__      |  the width of the viewport                             |
| __viewport-height__     |  the height of the viewport                            |
| __xscroll-allow-async__ |  allow delayed initialization for more accurate container's width calculation |
