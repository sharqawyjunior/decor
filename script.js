$('.open-overlay').click(function() {
    $('.open-overlay').css('pointer-events', 'none');
    var overlay_navigation = $('.overlay-navigation'),
      top_bar = $('.bar-top'),
      middle_bar = $('.bar-middle'),
      bottom_bar = $('.bar-bottom');

    overlay_navigation.toggleClass('overlay-active');
    if (overlay_navigation.hasClass('overlay-active')) {

      top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
      middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
      bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
      overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
      overlay_navigation.velocity('transition.slideLeftIn', {
        duration: 300,
        delay: 0,
        begin: function() {
          $('nav ul li').velocity('transition.perspectiveLeftIn', {
            stagger: 150,
            delay: 0,
            complete: function() {
              $('nav ul li a').velocity({
                opacity: [1, 0],
              }, {
                delay: 10,
                duration: 140
              });
              $('.open-overlay').css('pointer-events', 'auto');
            }
          })
        }
      })

    } else {
      $('.open-overlay').css('pointer-events', 'none');
      top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
      middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
      bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
      overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
      $('nav ul li').velocity('transition.perspectiveRightOut', {
        stagger: 150,
        delay: 0,
        complete: function() {
          overlay_navigation.velocity('transition.fadeOut', {
            delay: 0,
            duration: 300,
            complete: function() {
              $('nav ul li a').velocity({
                opacity: [0, 1],
              }, {
                delay: 0,
                duration: 50
              });
              $('.open-overlay').css('pointer-events', 'auto');
            }
          });
        }
      })
    }
  })
     (function() {
      //
      // Setup
      //
      var width = document.documentElement.clientWidth,
          height = document.documentElement.clientHeight;
      
      var pink = 'rgba(252, 113, 123, 1)',
          green = 'rgba(53, 212, 164, 1)',
          blue = 'rgba(90, 232, 255, 1)',
          silver = 'rgba(154, 194, 197, 1)';
      
      var config = {
          colors        : [pink, green, blue],
          maxSize       : 2,
          velocity      : 0.5,
          density       : 1000
      };
      
      //
      // Dot Class
      //
      class Dot {
          constructor(options) {
              this.canvas = options.canvas;
              this.ctx = options.ctx;
              
              this.color = options.color;
              this.size = options.size;
              
              this.x = options.x;
              this.y = options.y;
              this.velocity = {
                  x: (Math.random() * options.velocity) - options.velocity / 2,
                  y: (Math.random() * options.velocity) - options.velocity / 2
              };
          }
          
          draw() {
              this.ctx.fillStyle = this.color;
              this.ctx.beginPath();
              this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
              this.ctx.fill();
              this.ctx.closePath();
          }
          
          update() {
              // Change direction if outside the bounds of the canvas
              if (this.x > this.canvas.width + this.size || this.x < -this.size) {
                  this.velocity.x = -this.velocity.x;
              }
              
              if (this.y > this.canvas.height + this.size || this.y < - this.size) {
                  this.velocity.y = - this.velocity.y;
              }
              
              // Update the position of the dot
              this.x += this.velocity.x;
              this.y += this.velocity.y;
          }
      }
    })
    /*    */
    (function() {
      //
      // Setup
      //
      var width = document.documentElement.clientWidth,
          height = document.documentElement.clientHeight;
      
      var pink = 'rgba(252, 113, 123, 1)',
          green = 'rgba(53, 212, 164, 1)',
          blue = 'rgba(90, 232, 255, 1)',
          silver = 'rgba(154, 194, 197, 1)';
      
      var config = {
          colors        : [pink, green, blue],
          maxSize       : 2,
          velocity      : 0.5,
          density       : 1000
      };
      
      //
      // Dot Class
      //
      class Dot {
          constructor(options) {
              this.canvas = options.canvas;
              this.ctx = options.ctx;
              
              this.color = options.color;
              this.size = options.size;
              
              this.x = options.x;
              this.y = options.y;
              this.velocity = {
                  x: (Math.random() * options.velocity) - options.velocity / 2,
                  y: (Math.random() * options.velocity) - options.velocity / 2
              };
          }
          
          draw() {
              this.ctx.fillStyle = this.color;
              this.ctx.beginPath();
              this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
              this.ctx.fill();
              this.ctx.closePath();
          }
          
          update() {
              // Change direction if outside the bounds of the canvas
              if (this.x > this.canvas.width + this.size || this.x < -this.size) {
                  this.velocity.x = -this.velocity.x;
              }
              
              if (this.y > this.canvas.height + this.size || this.y < - this.size) {
                  this.velocity.y = - this.velocity.y;
              }
              
              // Update the position of the dot
              this.x += this.velocity.x;
              this.y += this.velocity.y;
          }
      }
  
      //
      // Canvas class
      //
      class ParticleCanvas {
          constructor(element, config) {
              this.canvas   = element;
              this.context  = element.getContext('2d');
              
              this.dots     = [];
              this.maxSize  = config.maxSize;
              this.colors   = config.colors;
              
              this.velocity = config.velocity;
              this.density  = config.density;
              
              // Redraw the canvas when the user resizes the screen
              window.addEventListener('resize', _.debounce(this.init, 300).bind(this));
  
              this.init();
          }
  
          init() {
              this.clear();
              this.resize();
  
              this.createDots();
              this.drawDots();
              
              // Animate the dots
              requestAnimationFrame(this.update.bind(this));
          }
  
          resize() {
              this.canvas.width  = window.innerWidth;
              this.canvas.height = window.innerHeight;
          }
  
          clear() {
              this.dots = [];
              this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          }
          
          update() {
              this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
              
              var i = this.dots.length;
              
              while(i--) {
                  this.dots[i].update();
                  this.dots[i].draw();
              }
              
              this.animationFrame = window.requestAnimationFrame(() => this.update());
          }
          
          createDots() {
              for (var i = 0; i < this.canvas.width * this.canvas.height / this.density; i++) {
                  var pos     = this.getRandomPosition(),
                      color   = this.getRandomColor(),
                      size    = this.getRandomSize(),
                      opacity = this.getOpacity(),
                      rgba    = this.setOpacity(color, opacity);
  
                  var dot = new Dot({
                      canvas  : this.canvas,
                      ctx     : this.context,
                      color   : rgba,
                      size    : size,
                      x       : pos.x,
                      y       : pos.y,
                      velocity: this.velocity
                  });
  
                  this.dots.push(dot);
              }
          }
  
          drawDots() {
              var i = this.dots.length;
  
              while (i--) {
                  this.dots[i].draw();
              }
          }
        
          getRandomPosition() {
              return {
                  x: Math.floor(Math.random() * (this.canvas.width + 1)),
                  y: Math.floor(Math.random() * (this.canvas.height + 1))
              };
          }
  
          getRandomColor() {
              return this.colors[Math.floor(Math.random() * (this.colors.length))];
          }
  
          getRandomSize() {
              return Math.floor(Math.random() * (this.maxSize + 1));
          }
  
          getOpacity() {
              return (Math.random().toFixed(2)).toString();
          }
  
          // Replace the opacity value in the rgba colour
          setOpacity(color, opacity) {
              var index = color.lastIndexOf('1');
              return color.substr(0, index) + opacity + color.substr(index + 1, color.length);
          }
      }
  
      var canvas = new ParticleCanvas(document.getElementById('canvas'), config);
      
      //
      // High-density screens
      //
      if (window.devicePixelRatio > 1) {
          var canvasWidth = canvas.width;
          var canvasHeight = canvas.height;
  
          canvas.width = canvasWidth * window.devicePixelRatio;
          canvas.height = canvasHeight * window.devicePixelRatio;
          canvas.style.width = canvasWidth;
          canvas.style.height = canvasHeight;
  
          canvas.context.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
  })();
  /*    */
  $.fn.jQuerySimpleCounter = function( options ) {
    var settings = $.extend({
        start:  0,
        end:    100,
        easing: 'swing',
        duration: 400,
        complete: ''
    }, options );

    var thisElement = $(this);

    $({count: settings.start}).animate({count: settings.end}, {
    duration: settings.duration,
    easing: settings.easing,
    step: function() {
      var mathCount = Math.ceil(this.count);
      thisElement.text(mathCount);
    },
    complete: settings.complete
  });
};


$('#number1').jQuerySimpleCounter({end: 12,duration: 3000});
$('#number2').jQuerySimpleCounter({end: 55,duration: 3000});
$('#number3').jQuerySimpleCounter({end: 359,duration: 2000});
$('#number4').jQuerySimpleCounter({end: 246,duration: 2500});

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function resize() {
    var box = c.getBoundingClientRect();
    c.width = box.width;
    c.height = box.height;
}

var light = {
    x: 160,
    y: 200
}

var colors = ["#f5c156", "#e6616b", "#5cd3ad"];

function drawLight() {
    ctx.beginPath();
    ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
    var gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 1000);
    gradient.addColorStop(0, "#3b4654");
    gradient.addColorStop(1, "#2c343f");
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(light.x, light.y, 20, 0, 2 * Math.PI);
    gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 5);
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "#3b4654");
    ctx.fillStyle = gradient;
    ctx.fill();
}

function Box() {
    this.half_size = Math.floor((Math.random() * 50) + 1);
    this.x = Math.floor((Math.random() * c.width) + 1);
    this.y = Math.floor((Math.random() * c.height) + 1);
    this.r = Math.random() * Math.PI;
    this.shadow_length = 2000;
    this.color = colors[Math.floor((Math.random() * colors.length))];
  
    this.getDots = function() {

        var full = (Math.PI * 2) / 4;


        var p1 = {
            x: this.x + this.half_size * Math.sin(this.r),
            y: this.y + this.half_size * Math.cos(this.r)
        };
        var p2 = {
            x: this.x + this.half_size * Math.sin(this.r + full),
            y: this.y + this.half_size * Math.cos(this.r + full)
        };
        var p3 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 2),
            y: this.y + this.half_size * Math.cos(this.r + full * 2)
        };
        var p4 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 3),
            y: this.y + this.half_size * Math.cos(this.r + full * 3)
        };

        return {
            p1: p1,
            p2: p2,
            p3: p3,
            p4: p4
        };
    }
    this.rotate = function() {
        var speed = (60 - this.half_size) / 20;
        this.r += speed * 0.002;
        this.x += speed;
        this.y += speed;
    }
    this.draw = function() {
        var dots = this.getDots();
        ctx.beginPath();
        ctx.moveTo(dots.p1.x, dots.p1.y);
        ctx.lineTo(dots.p2.x, dots.p2.y);
        ctx.lineTo(dots.p3.x, dots.p3.y);
        ctx.lineTo(dots.p4.x, dots.p4.y);
        ctx.fillStyle = this.color;
        ctx.fill();


        if (this.y - this.half_size > c.height) {
            this.y -= c.height + 100;
        }
        if (this.x - this.half_size > c.width) {
            this.x -= c.width + 100;
        }
    }
    this.drawShadow = function() {
        var dots = this.getDots();
        var angles = [];
        var points = [];

        for (dot in dots) {
            var angle = Math.atan2(light.y - dots[dot].y, light.x - dots[dot].x);
            var endX = dots[dot].x + this.shadow_length * Math.sin(-angle - Math.PI / 2);
            var endY = dots[dot].y + this.shadow_length * Math.cos(-angle - Math.PI / 2);
            angles.push(angle);
            points.push({
                endX: endX,
                endY: endY,
                startX: dots[dot].x,
                startY: dots[dot].y
            });
        };

        for (var i = points.length - 1; i >= 0; i--) {
            var n = i == 3 ? 0 : i + 1;
            ctx.beginPath();
            ctx.moveTo(points[i].startX, points[i].startY);
            ctx.lineTo(points[n].startX, points[n].startY);
            ctx.lineTo(points[n].endX, points[n].endY);
            ctx.lineTo(points[i].endX, points[i].endY);
            ctx.fillStyle = "#2c343f";
            ctx.fill();
        };
    }
}

var boxes = [];

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawLight();

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].rotate();
        boxes[i].drawShadow();
    };
    for (var i = 0; i < boxes.length; i++) {
        collisionDetection(i)
        boxes[i].draw();
    };
    requestAnimationFrame(draw);
}

resize();
draw();

while (boxes.length < 14) {
    boxes.push(new Box());
}

window.onresize = resize;
c.onmousemove = function(e) {
    light.x = e.offsetX == undefined ? e.layerX : e.offsetX;
    light.y = e.offsetY == undefined ? e.layerY : e.offsetY;
}


function collisionDetection(b){
	for (var i = boxes.length - 1; i >= 0; i--) {
		if(i != b){	
			var dx = (boxes[b].x + boxes[b].half_size) - (boxes[i].x + boxes[i].half_size);
			var dy = (boxes[b].y + boxes[b].half_size) - (boxes[i].y + boxes[i].half_size);
			var d = Math.sqrt(dx * dx + dy * dy);
			if (d < boxes[b].half_size + boxes[i].half_size) {
			    boxes[b].half_size = boxes[b].half_size > 1 ? boxes[b].half_size-=1 : 1;
			    boxes[i].half_size = boxes[i].half_size > 1 ? boxes[i].half_size-=1 : 1;
			}
		}
	}
}
// vim: et:sts=2:sw=2

var angular = window.angular
  , console = window.console;

window.chartCtrl = ['$scope', function($scope) {
  $scope.data = new Array(9);
  
  $scope.sample = function() {
    if (!$scope.paused) {
      for (var i=0, l=$scope.data.length; i < l; i++) {
        $scope.data[i] = Math.random() * 95 + 5;
      }
    }
  };
  
  $scope.paused = false;
  
  $scope.sample();
  $scope.sampler = setInterval(function() {
    if (!$scope.paused) {
      $scope.$apply($scope.sample);
    }
  }, 2000);
}];

angular.module('myApp', []).

directive('peakChart', ['$window', function($win) {
  var PI   = Math.PI
    , sin  = Math.sin
    , cos  = Math.cos
    , tan  = Math.tan
    , atan = Math.atan
    , acos = Math.acos
    , sqrt = Math.sqrt
    , pow  = Math.pow
    , abs  = Math.abs
    , rSkRo = /^(?:sk|ro)/;
  
  return {
    link: function(scope, elm, attrs) {
      var faces  = elm[0].querySelectorAll('[face]')
        , labels = elm[0].getElementsByTagName('label')
        , r      = elm[0].offsetWidth / 2
        , charth = 1.5 * r; // max height of peaks: revisit

      scope.$watch(attrs.data, function(data) {
        var sum = 0;
        angular.forEach(data, function(d) { sum += d; });
        
        // iterate slices
        for (var i=0, face; (face = faces[2*i]); i++) {
          var bkFace   = faces[2*i + 1]
           //
           // split the peaks evenly around the graph
           //
            , slice    = 2 * PI / (faces.length/2)
            , npos     = i * slice - PI
           //
           // give the slice height based on data - assume data values are percentages
           // also, tone down the peaks in front (HACK)
           //
            , val      = (i >= 4 ? data[i] * 0.6 : data[i])
            , h        = val * charth / 100
           //
           // face angle - each face covers half the slice
           //
            , fang     = slice/2
           // 
           // we want the faces to meet at a point "h" pixels above the
           // midpoint of the slice's arc
           //
            , chord    = 2 * r * sin(fang/2)
           //
           // chord's angle with radius
           //  
            , chang    = (PI - fang) / 2
           //
           // altitude from radius to arc midpoint
           //
            , alt2mp   = chord * sin(chang)

            , slope    = atan(h / alt2mp)
            , slopeLen = sqrt(pow(h,2) + pow(alt2mp,2))
           //
           // the radial triangles are half squares so h = r
           //
            , scaleY   = slopeLen / r
            , skew     = atan(chord * cos(chang) / slopeLen)
            ;
          
          setTransform(face,
            'translateZ', 2,
            'rotateZ',    npos,
            'rotateX',    slope - Math.PI,
            'skewX',      skew,
            'scaleY',     scaleY
          );
          
          setTransform(bkFace,
            'translateZ', 2,
            'rotateZ',    npos + slice,
            'rotateX',    -slope,
            'skewX',      skew,
            'scaleY',     scaleY
          );

          var lbl = labels[i];
          lbl.textContent = Math.round(val);

          var rlbl   = r
            , nlbl   = -npos - slice/2
            , lblx   = rlbl * cos(nlbl)
            , lbly   = rlbl * sin(nlbl)
            , lblxat = lblx > 0 ? 'left'   : 'right'
            , lblyat = lbly > 0 ? 'bottom' : 'top';

          lbl.style[lblxat] = r + abs(lblx) + 'px';
          lbl.style[lblyat] = r + abs(lbly) + 15 + 'px';
          lbl.setAttribute('point', lblyat + lblxat); // e.g., [point=topleft]

          if (i < 5) {
            setTransform(lbl,
              'rotateX',    deg(-45)
            , 'translateY', -(h / sqrt(2))
            , 'translateZ', h / sqrt(2)
            );
          }
        }
        
      }, /* deep */ true);
    }
  };
  
  function rad(x) {
    return (Math.round(x * 1000) / 1000) + 'rad';
  }
  
  
  function setTransform(node) {
    var ns = node.style, trans = '';
    for (var i=1, l=arguments.length; i < l; i += 2) {
      var nm = arguments[i], val = arguments[i+1];
      trans += nm + '(' + (
          rSkRo.test(nm) ? rad(val)
        : nm.slice(0, 2) === 'tr' ? val + 'px'
        : val) + ') ';
    }
    ns.webkitTransform =
      ns.mozTransform =
      ns.msTransform =
      ns.transform = trans;
  }

  function deg(x) {
      return { valueOf: function() { return x * PI / 180; } };
  }
  
}]);