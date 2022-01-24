/*
Type: Illustrator Script
Name: Golden Ratio Draw
File Name: golden-ratio-draw.jsx
Version: 1.0.0

Copyright (C) 2021 Katsushi Nakamura

This program is free software; you can redistribute it and/or modifyit under the terms of the GNU General Public License as published bythe Free Software Foundation; either version 3 of the License, or (at your option) any later version.
//
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty ofMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public Licensealong with this program. If not, see <https://www.gnu.org/licenses/>.
*/

(function () {
  var ver = app.version.split(".");
  if (parseInt(ver[0]) >= 15) {
    app.coordinateSystem = CoordinateSystem.ARTBOARDCOORDINATESYSTEM;
  }

  //
  //
  //
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
  //
  //
  //

  function calcHypotenuse(a, b) {
    return Math.sqrt(a * a + b * b);
  }

  var noColor = new NoColor();

  if (documents.length > 0) {
    var docWidth = activeDocument.width;
    var w1 = docWidth * 0.6;
  } else {
    var w1 = largestSquareWidth;
  }

  var h1 = w1;
  var ws = w1 * 2;
  var hs = ws;
  var xw = 0;
  var yw = 0;
  var whlfe = w1 / 2;
  var r = calcHypotenuse(whlfe, h1);
  var xc = xw;
  var yc = yw;
  var xs = xw;
  var ys = yw;

  var w2 = r - whlfe;
  var h2 = w2;
  var w2s = w2 * 2;
  var h2s = w2s;
  var xw2 = xw + w1;
  var yw2 = yw;
  var x2c = xw2;
  var y2c = yw2;
  var x2s = xw + w1 - w2;
  var y2s = yw;

  var w3 = w1 - w2;
  var h3 = w3;
  var w3s = w3 * 2;
  var h3s = w3s;
  var xw3 = xw + w1 + w2 - w3;
  var yw3 = yw - h2;
  var x3c = xw3;
  var y3c = yw3;
  var x3s = xw + w1 + w2 - w3 * 2;
  var y3s = yw - h1 + h3 * 2;

  var w4 = w2 - w3;
  var h4 = w4;
  var w4s = w4 * 2;
  var h4s = w4s;
  var xw4 = xw + w1;
  var yw4 = yw - h2 - h3 + h4;
  var x4c = xw4;
  var y4c = yw4;
  var x4s = xw + w1;
  var y4s = yw - h1 + h4 * 2;

  var w5 = w3 - w4;
  var h5 = w5;
  var w5s = w5 * 2;
  var h5s = w5s;
  var xw5 = xw + w1;
  var yw5 = yw - h2;
  var x5c = xw5;
  var y5c = yw5;
  var x5s = xw5;
  var y5s = yw5;

  var w6 = w4 - w5;
  var h6 = w6;
  var w6s = w6 * 2;
  var h6s = w6s;
  var xw6 = xw + w1 + w5;
  var yw6 = yw - h2;
  var x6c = xw6;
  var y6c = yw6;
  var x6s = xw + w1 + w4 - w6 * 2;
  var y6s = yw - h2;

  var w7 = w5 - w6;
  var h7 = w7;
  var w7s = w7 * 2;
  var h7s = w7s;
  var xw7 = xw + w1 + w4 - w7;
  var yw7 = yw - h2 - h6;
  var x7c = xw7;
  var y7c = yw7;
  var x7s = xw + w1 + w4 - w7 * 2;
  var y7s = yw - h2 - h5 + h7 * 2;

  var w8 = w6 - w7;
  var h8 = w8;
  var w8s = w8 * 2;
  var h8s = w8s;
  var xw8 = xw + w1 + w5;
  var yw8 = yw - h2 - h5 + w8;
  var x8c = xw8;
  var y8c = yw8;
  var x8s = xw + w1 + w5;
  var y8s = yw - h2 - h5 + h8 * 2;

  if (documents.length === 0) {
    // Create new file

    if (newFileColorSpace === 0) {
      var dp = DocumentPreset;
      dp.colorMode = DocumentColorSpace.RGB;
      dp.rasterResolution = DocumentRasterResolution.HighResolution;
      dp.units = RulerUnits.Millimeters;
      dp.width = newFileWidth;
      dp.height = newFileHeight;
      documents.addDocument("New File RGB", dp);

      var defaultColor = new RGBColor();
      defaultColor.red = rgbColorRed;
      defaultColor.green = rgbColorGreen;
      defaultColor.blue = rgbColorBlue;
    } else {
      var dp = DocumentPreset;
      dp.colorMode = DocumentColorSpace.CMYK;
      dp.rasterResolution = DocumentRasterResolution.HighResolution;
      dp.units = RulerUnits.Millimeters;
      dp.width = newFileWidth;
      dp.height = newFileHeight;
      documents.addDocument("New File CMYK", dp);

      var defaultColor = new CMYKColor();
      defaultColor.cyan = cmykColorCyan;
      defaultColor.magenta = cmykColorMagenta;
      defaultColor.yellow = cmykColorYellow;
      defaultColor.black = cmykColorBlack;
    }

    var layObj = activeDocument.layers.add();
    layObj.name = "Spirals";

    var spiralArray = [
      [ys, xs, ws, hs, 1],
      [y2s, x2s, w2s, h2s, 2],
      [y3s, x3s, w3s, h3s, 3],
      [y4s, x4s, w4s, h4s, 4],
      [y5s, x5s, w5s, h5s, 1],
      [y6s, x6s, w6s, h6s, 2],
      [y7s, x7s, w7s, h7s, 3],
      [y8s, x8s, w8s, h8s, 4],
    ];

    for (var i = 0; i < spiralArray.length; i++) {
      for (var j = 0; j < spiralArray[i].length; j++) {
        y = spiralArray[i][0];
        x = spiralArray[i][1];
        w = spiralArray[i][2];
        h = spiralArray[i][3];
        k = spiralArray[i][4];
      }

      if (k === 1) {
        var ellipseObj = activeDocument.pathItems.ellipse(
          y,
          x,
          w,
          h,
          false,
          true
        );
        ellipseObj.fillColor = noColor;
        ellipseObj.stroked = true;
        ellipseObj.strokeWidth = lineWidth;
        ellipseObj.strokeColor = defaultColor;
        ellipseObj.pathPoints[3].remove();
        ellipseObj.pathPoints[2].remove();
        ellipseObj.closed = false;
      } else if (k === 2) {
        var ellipseObj = activeDocument.pathItems.ellipse(
          y,
          x,
          w,
          h,
          false,
          true
        );
        ellipseObj.fillColor = noColor;
        ellipseObj.stroked = true;
        ellipseObj.strokeWidth = lineWidth;
        ellipseObj.strokeColor = defaultColor;
        ellipseObj.pathPoints[0].remove();
        ellipseObj.pathPoints[2].remove();
        ellipseObj.closed = false;
      } else if (k === 3) {
        var ellipseObj = activeDocument.pathItems.ellipse(
          y,
          x,
          w,
          h,
          false,
          true
        );
        ellipseObj.fillColor = noColor;
        ellipseObj.stroked = true;
        ellipseObj.strokeWidth = lineWidth;
        ellipseObj.strokeColor = defaultColor;
        ellipseObj.pathPoints[1].remove();
        ellipseObj.pathPoints[0].remove();
        ellipseObj.closed = false;
      } else {
        var ellipseObj = activeDocument.pathItems.ellipse(
          y,
          x,
          w,
          h,
          false,
          true
        );
        ellipseObj.fillColor = noColor;
        ellipseObj.stroked = true;
        ellipseObj.strokeWidth = lineWidth;
        ellipseObj.strokeColor = defaultColor;
        var p0X = ellipseObj.pathPoints[0].anchor[0];
        var p0y = ellipseObj.pathPoints[0].anchor[1];
        var p0leftX = ellipseObj.pathPoints[0].leftDirection[0];
        var p0leftY = ellipseObj.pathPoints[0].leftDirection[1];
        var p0rightX = ellipseObj.pathPoints[0].rightDirection[0];
        var p0rightY = ellipseObj.pathPoints[0].rightDirection[1];
        var p3X = ellipseObj.pathPoints[3].anchor[0];
        var p3y = ellipseObj.pathPoints[3].anchor[1];
        var p3leftX = ellipseObj.pathPoints[3].leftDirection[0];
        var p3leftY = ellipseObj.pathPoints[3].leftDirection[1];
        var p3rightX = ellipseObj.pathPoints[3].rightDirection[0];
        var p3rightY = ellipseObj.pathPoints[3].rightDirection[1];
        ellipseObj.remove();

        var bezierObj = activeDocument.pathItems.add();
        bezierObj.filled = false;
        bezierObj.stroked = true;
        bezierObj.strokeWidth = lineWidth;
        bezierObj.strokeColor = defaultColor;
        bezierObj.strokeDashes = [];

        var pathObj = bezierObj.pathPoints.add();
        pathObj.anchor = [p0X, p0y];
        pathObj.leftDirection = [p0rightX, p0rightY];
        pathObj.rightDirection = [p0leftX, p0leftY];
        pathObj.pointType = PointType.SMOOTH;

        var pathObj = bezierObj.pathPoints.add();
        pathObj.anchor = [p3X, p3y];
        pathObj.leftDirection = [p3rightX, p3rightY];
        pathObj.rightDirection = [p3leftX, p3leftY];
        pathObj.pointType = PointType.SMOOTH;
      }
    }

    var layObj = activeDocument.layers.add();
    layObj.name = "Squares";

    var SquareArray = [
      [yw, xw, w1, h1],
      [yw2, xw2, w2, h2],
      [yw3, xw3, w3, h3],
      [yw4, xw4, w4, h4],
      [yw5, xw5, w5, h5],
      [yw6, xw6, w6, h6],
      [yw7, xw7, w7, h7],
      [yw8, xw8, w8, h8],
    ];

    for (var i = 0; i < SquareArray.length; i++) {
      for (var j = 0; j < SquareArray[i].length; j++) {
        y = SquareArray[i][0];
        x = SquareArray[i][1];
        w = SquareArray[i][2];
        h = SquareArray[i][3];
      }

      var rectObj = activeDocument.pathItems.rectangle(y, x, w, h);
      rectObj.fillColor = noColor;
      rectObj.stroked = true;
      rectObj.strokeWidth = lineWidth;
      rectObj.strokeColor = defaultColor;
    }

    var layObj = activeDocument.layers.add();
    layObj.name = "Circles";

    var circleArray = [
      [yc, xc, w1, h1],
      [y2c, x2c, w2, h2],
      [y3c, x3c, w3, h3],
      [y4c, x4c, w4, h4],
      [y5c, x5c, w5, h5],
      [y6c, x6c, w6, h6],
      [y7c, x7c, w7, h7],
      [y8c, x8c, w8, h8],
    ];

    for (var i = 0; i < circleArray.length; i++) {
      for (var j = 0; j < circleArray[i].length; j++) {
        y = circleArray[i][0];
        x = circleArray[i][1];
        w = circleArray[i][2];
        h = circleArray[i][3];
      }

      var ellipseObj = activeDocument.pathItems.ellipse(
        y,
        x,
        w,
        h,
        false,
        true
      );
      ellipseObj.fillColor = noColor;
      ellipseObj.stroked = true;
      ellipseObj.strokeWidth = lineWidth;
      ellipseObj.strokeColor = defaultColor;
    }
  } else {
    // opened file

    var page = activeDocument.layers[0].pageItems.length;
    if (page === 0) {
      if (activeDocument.documentColorSpace === DocumentColorSpace.RGB) {
        var defaultColor = new RGBColor();
        defaultColor.red = rgbColorRed;
        defaultColor.green = rgbColorGreen;
        defaultColor.blue = rgbColorBlue;
      } else {
        var defaultColor = new CMYKColor();
        defaultColor.cyan = cmykColorCyan;
        defaultColor.magenta = cmykColorMagenta;
        defaultColor.yellow = cmykColorYellow;
        defaultColor.black = cmykColorBlack;
      }

      var layObj = activeDocument.layers.add();
      layObj.name = "Spirals";

      var spiralArray = [
        [ys, xs, ws, hs, 1],
        [y2s, x2s, w2s, h2s, 2],
        [y3s, x3s, w3s, h3s, 3],
        [y4s, x4s, w4s, h4s, 4],
        [y5s, x5s, w5s, h5s, 1],
        [y6s, x6s, w6s, h6s, 2],
        [y7s, x7s, w7s, h7s, 3],
        [y8s, x8s, w8s, h8s, 4],
      ];

      for (var i = 0; i < spiralArray.length; i++) {
        for (var j = 0; j < spiralArray[i].length; j++) {
          y = spiralArray[i][0];
          x = spiralArray[i][1];
          w = spiralArray[i][2];
          h = spiralArray[i][3];
          k = spiralArray[i][4];
        }

        if (k === 1) {
          var ellipseObj = activeDocument.pathItems.ellipse(
            y,
            x,
            w,
            h,
            false,
            true
          );
          ellipseObj.fillColor = noColor;
          ellipseObj.stroked = true;
          ellipseObj.strokeWidth = lineWidth;
          ellipseObj.strokeColor = defaultColor;
          ellipseObj.pathPoints[3].remove();
          ellipseObj.pathPoints[2].remove();
          ellipseObj.closed = false;
        } else if (k === 2) {
          var ellipseObj = activeDocument.pathItems.ellipse(
            y,
            x,
            w,
            h,
            false,
            true
          );
          ellipseObj.fillColor = noColor;
          ellipseObj.stroked = true;
          ellipseObj.strokeWidth = lineWidth;
          ellipseObj.strokeColor = defaultColor;
          ellipseObj.pathPoints[0].remove();
          ellipseObj.pathPoints[2].remove();
          ellipseObj.closed = false;
        } else if (k === 3) {
          var ellipseObj = activeDocument.pathItems.ellipse(
            y,
            x,
            w,
            h,
            false,
            true
          );
          ellipseObj.fillColor = noColor;
          ellipseObj.stroked = true;
          ellipseObj.strokeWidth = lineWidth;
          ellipseObj.strokeColor = defaultColor;
          ellipseObj.pathPoints[1].remove();
          ellipseObj.pathPoints[0].remove();
          ellipseObj.closed = false;
        } else {
          var ellipseObj = activeDocument.pathItems.ellipse(
            y,
            x,
            w,
            h,
            false,
            true
          );
          ellipseObj.fillColor = noColor;
          ellipseObj.stroked = true;
          ellipseObj.strokeWidth = lineWidth;
          ellipseObj.strokeColor = defaultColor;
          var p0X = ellipseObj.pathPoints[0].anchor[0];
          var p0y = ellipseObj.pathPoints[0].anchor[1];
          var p0leftX = ellipseObj.pathPoints[0].leftDirection[0];
          var p0leftY = ellipseObj.pathPoints[0].leftDirection[1];
          var p0rightX = ellipseObj.pathPoints[0].rightDirection[0];
          var p0rightY = ellipseObj.pathPoints[0].rightDirection[1];
          var p3X = ellipseObj.pathPoints[3].anchor[0];
          var p3y = ellipseObj.pathPoints[3].anchor[1];
          var p3leftX = ellipseObj.pathPoints[3].leftDirection[0];
          var p3leftY = ellipseObj.pathPoints[3].leftDirection[1];
          var p3rightX = ellipseObj.pathPoints[3].rightDirection[0];
          var p3rightY = ellipseObj.pathPoints[3].rightDirection[1];
          ellipseObj.remove();

          var bezierObj = activeDocument.pathItems.add();
          bezierObj.filled = false;
          bezierObj.stroked = true;
          bezierObj.strokeWidth = lineWidth;
          bezierObj.strokeColor = defaultColor;
          bezierObj.strokeDashes = [];

          var pathObj = bezierObj.pathPoints.add();
          pathObj.anchor = [p0X, p0y];
          pathObj.leftDirection = [p0rightX, p0rightY];
          pathObj.rightDirection = [p0leftX, p0leftY];
          pathObj.pointType = PointType.SMOOTH;

          var pathObj = bezierObj.pathPoints.add();
          pathObj.anchor = [p3X, p3y];
          pathObj.leftDirection = [p3rightX, p3rightY];
          pathObj.rightDirection = [p3leftX, p3leftY];
          pathObj.pointType = PointType.SMOOTH;
        }
      }

      var layObj = activeDocument.layers.add();
      layObj.name = "Squares";

      var SquareArray = [
        [yw, xw, w1, h1],
        [yw2, xw2, w2, h2],
        [yw3, xw3, w3, h3],
        [yw4, xw4, w4, h4],
        [yw5, xw5, w5, h5],
        [yw6, xw6, w6, h6],
        [yw7, xw7, w7, h7],
        [yw8, xw8, w8, h8],
      ];

      for (var i = 0; i < SquareArray.length; i++) {
        for (var j = 0; j < SquareArray[i].length; j++) {
          y = SquareArray[i][0];
          x = SquareArray[i][1];
          w = SquareArray[i][2];
          h = SquareArray[i][3];
        }

        var rectObj = activeDocument.pathItems.rectangle(y, x, w, h);
        rectObj.fillColor = noColor;
        rectObj.stroked = true;
        rectObj.strokeWidth = lineWidth;
        rectObj.strokeColor = defaultColor;
      }

      var layObj = activeDocument.layers.add();
      layObj.name = "Circles";

      var circleArray = [
        [yc, xc, w1, h1],
        [y2c, x2c, w2, h2],
        [y3c, x3c, w3, h3],
        [y4c, x4c, w4, h4],
        [y5c, x5c, w5, h5],
        [y6c, x6c, w6, h6],
        [y7c, x7c, w7, h7],
        [y8c, x8c, w8, h8],
      ];

      for (var i = 0; i < circleArray.length; i++) {
        for (var j = 0; j < circleArray[i].length; j++) {
          y = circleArray[i][0];
          x = circleArray[i][1];
          w = circleArray[i][2];
          h = circleArray[i][3];
        }

        var ellipseObj = activeDocument.pathItems.ellipse(
          y,
          x,
          w,
          h,
          false,
          true
        );
        ellipseObj.fillColor = noColor;
        ellipseObj.stroked = true;
        ellipseObj.strokeWidth = lineWidth;
        ellipseObj.strokeColor = defaultColor;
      }
    } else {
      alert("Create new layer on top. Please try again.");
    }
  }
})();
