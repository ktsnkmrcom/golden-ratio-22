# Created a script for the golden ratio drawing

Type: Illustrator Script  
Name: Golden Ratio Draw  
File Name: golden-ratio-draw.jsx  
Version: 1.0.0

## How to use

Script for Adobe Illustrator.

File > Script > Other Script

Default Keyboard Shortcuts  
Ctrl + F12, command + F12

### If the document is not open

Create a new document with the following settings.

```js
// Preferences
//
var newFileColorSpace = 1; // RGB:0 CMYK:1
var newFileWidth = 2560; // point
var newFileHeight = 1600; // point
var largestSquareWidth = 1536; // point
var lineWidth = 1.0; // point
var rgbColorRed = 0; // 0-255
var rgbColorGreen = 0;
var rgbColorBlue = 0;
var cmykColorCyan = 0; // 0-100
var cmykColorMagenta = 0;
var cmykColorYellow = 0;
var cmykColorBlack = 100;
//
//
```

### If the document is open

Draws in the size and color space of the open document.  
Line width adjustment is the same as above.

## License

Copyright (C) 2021 Katsushi Nakamura

This program is free software; you can redistribute it and/or modifyit under the terms of the GNU General Public License as published bythe Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty ofMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public Licensealong with this program. If not, see <https://www.gnu.org/licenses/>.
