$(function () {

    // jQueryコード

    // 時間系フィールドにはbootstrap-datepickerよbootstrap-datetimepickerの利用を推奨します。
    // 参考 https://pypi.org/project/django-tempus-dominus/

    // Bootstrap Datepicker
    $('.dateinput').datepicker({
        todayBtn: 'linked',
        format: 'yyyy-mm-dd',
        language: 'ja',
        autoclose: true,
        todayHighlight: true,
    });
    $('.dateinput').attr('placeholder','YYYY-MM-DD');

    $('.datetimeinput').attr('placeholder','YYYY-MM-DD HH:MM:SS');


    // 入力フォームでリターンキー押下時の送信を無効化
    // ※フィールド１個の時は無効
    $('#myform').on('sumbit', function (e) {
        e.preventDefault();
    })

    // 送信ボタンの２度押しを防止
    $('.save').on('click', function (e) {
        $('.save').addClass('disabled');
        $('#myform').submit();
    })

    // 削除ボタンの２度押しを防止
    $('.delete').on('click', function (e) {
        $('.delete').addClass('disabled');
    })

    // [検索を解除] の表示制御
    //
    // 検索フォーム内の項目が一つでも入力されていたら、検索中と見なし
    // [検索を解除]のボタンを有効化する。
    //
    let conditions = $('#filter').serializeArray();
    $.each(conditions, function () {

        // boolフィールドの検索欄は、デフォルトが「1:不明」なので特別扱い
        if ($('[name=' + this.name + ']').hasClass('nullbooleanselect') && this.value == 1) {
            return;
        }

        // その他の項目はnull,'',0,Falseをもって未入力とみなす。
        if (this.value) {
            $('.filtered').css('visibility', 'visible');
        }
    })

    // ページネーションのレスポンシブ対応
    // jQuery Plugin rPageを利用
    // https://auxiliary.github.io/rpage/
    $(".pagination").rPage();
});



$(function(){
  
  
  
  /*////////////////////////////////////////////////////////////////////////////////
  demo-3 ヘッダー
  ////////////////////////////////////////////////////////////////////////////////*/
    
    (function(){
      
      'use strict';
      
      var ua = window.navigator.userAgent.toLowerCase();
      
      if(ua.indexOf('edge') != -1){
        
        $('#demoHeaderNavi').addClass('ms-edge');
        
      }else if(ua.indexOf('firefox') != -1){
        
        $('#demoHeaderNavi').addClass('firefox');
        
      }else if(ua.indexOf('trident') != -1){
        
        $('#demoHeaderNavi .demoHeaderNaviBox span').css({
          
          'left': 0,
          'position': 'absolute',
          'right': 0,
          'z-index': 1
        });
      }
    }());
  });



;(function($){
  
  
  
    /*////////////////////////////////////////////////////////////////////////////////
    demo-2 スライダー
    ////////////////////////////////////////////////////////////////////////////////*/
      
      'use strict';
      
      (function(){//_addSlider()
        
        var ua = window.navigator.userAgent.toLowerCase();
        var s = {};
        var c = {};
            
        s.s = '.tdSlider';
        s.sv = '.sliderViewport';
        s.sm = '.sliderMain';
        s.smc = '.sliderCell';
        s.sn = '.sliderNavi';
        s.snp = '.prev';
        s.snn = '.next';
        s.h = '.hover';
        s.ntd = '.notd';
        s.p = '.pause';
        s.sw = '.swipe';
        s.t = '.transform';
        
        $.each(s, function(k, v){
          
          if(v.match(/^\./)) c[k] = v.substr(1);
        });
        
        var _tdSlider = function(t, o){
          
          var $t = $(t);
          var img = [];
          var html = '';
          
          var d = $.extend({
            
            $target: $t,
            autoPlay: true,
            direction : 'initial',
            duration : 800,
            easing : 'linear',
            interval: 5000,
            next: '<span>NEXT</span>',
            pauseOnHover: false,
            perspective: '800px',
            prev: '<span>PREV</span>',
            transform: 'rotateX'
            
          }, o);
                
          $t.find('li').children().each(function(){
            
            img.push($(this)[0]);
          });
          
          $.extend(d, {
            
            browser: ua.indexOf('edge') != -1 || ua.indexOf('firefox') != -1 ? 1: ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1 ? 2 : 0,
            img: img,
            imgIndex: 0,
          });
          
          html += '<div class="' + c.sv + '">';
          html += '<div class="' + c.sm + '">';
          html += '</div>';
          html += '</div>';
          html += '<div class="' + c.sn + '">';
          html += '<div class="' + c.snp + '">' + d.prev + '</div>';
          html += '<div class="' + c.snn + '">' + d.next + '</div>';
          html += '</div>';
          
          if(d.browser == 2) $t.addClass(c.ntd);
          
          $t.addClass(c.s).children().remove();
          $t.append(html);
          
          var $sm = $t.find(s.sm);
          
          $.each(d.img, function(i){
            
            $sm.append('<div class="' + c.smc + '">' + $(this)[0].outerHTML + '</div>');
            
            $sm.children().not(':first').css({
              
              'left': 0,
              'position': 'absolute',
              'top': 0
            });
          });
          
          if('ontouchstart' in window) $t.addClass('touchsupport');
          
          $sm.imagesLoaded(function(e){
            
            $sm.children().not(':first').remove();
            
            $t.css({
              
              'opacity': 1,
              'transition': 'opacity .8s'
            });
            
            _addEvents($t, d);
            _swipe.init($t, d, s, c);
            _autoPlay($t, d);
          });
        };//_tdSlider()
        
        function _autoPlay($t, d){
          
          if(!d.autoPlay) return;
          
          var ist = 'ontouchstart' in window;
          var tid = false;
          var iid = false;
          
          $t.find([s.snp, s.snn].join(',')).on('click', function(e){
            
            _stop();
            _start(d.duration);
          });
          
          $t.find(s.sv).on('mouseenter mouseleave', function(e){
            
            if(!ist){
              
              if(e.type == 'mouseenter'){
                
                if(d.pauseOnHover) $t.addClass(c.p);
                  
                _stop();
              }
              
              if(e.type == 'mouseleave'){
                
                if(d.pauseOnHover) $t.removeClass(c.p);
               
                _start();
              }
            }
          });
          
          $t.find(s.sm).on('touchstart touchend', function(e){
            
            if(e.type == 'touchstart') _stop();
            if(e.type == 'touchend') _start();
          });
          
          function _start(du){
            
            tid = setTimeout(function(){
              
              if(!$t.hasClass(c.sw) && !$t.hasClass(c.t) && !$t.hasClass(c.p)) _animation($t, d);
              
              _start(d.duration);
              
            }, du ? du + d.interval : d.interval);
          };//_start()
          
          function _stop(){
            
            clearTimeout(tid);
          };//_stop()
          
          _start();
        };//_autoPlay()    
            
        function _addEvents($t, d){
          
          $t.find([s.snp, s.snn].join(',')).on('click', function(e){
            
            if($(this).parents(s.s).hasClass('transform')) return;
            
            _animation($t, d, e);
          });
          
          $t.find([s.sv, s.snp, s.snn].join(',')).on('ontouchstart' in window ? 'touchstart touchend' : 'mouseenter mouseleave', function(e){
            
            if(e.type == 'mouseenter' || e.type == 'touchstart') $t.addClass(c.h);
            if(e.type == 'mouseleave' || e.type == 'touchend') $t.removeClass(c.h);
          });
        };//_addEvents()
        
        function _animation($t, d, e){
          
          var $sm = $t.find(s.sm);
          var html = '';
                
          html += '<div class="' + c.smc + '">' + d.img[_getImgIndex(0, d)].outerHTML + '</div>';
          html += '<div class="' + c.smc + '">' + d.img[_getImgIndex(1, d)].outerHTML + '</div>';
          
          if(d.browser != 2){
            
            html += '<div class="' + c.smc + '"></div>';
            html += '<div class="' + c.smc + '"></div>';
            html += '<div class="' + c.smc + '"></div>';
          }
          
          $sm.append(html);
          
          var $smc = $sm.find(s.smc);
          var dr = e ? $(e.currentTarget).hasClass(c.snp) ? 0 : 1 : 1;
          var css, tp, tn;
          
          d.imgIndex = _paging(dr, d);
          
          $t.addClass([c.t, d.transform, dr ? c.snn : c.snp].join(' '));
          _transformStart($t, d);
          _setTimeout(d.duration).then(function(){_transformEnd($t, d)});
        };//_animation()
        
        function _transformStart($t, d){
          
          var $sv = $t.find(s.sv);
          var $sm = $t.find(s.sm);
          var $smc = $sm.find(s.smc);
          var dr = $t.hasClass(c.snp) ? 0 : 1;
          
          if(d.browser == 2){
            
            _ie();
            
          }else{
            
            if(d.transform == 'rotateX') _rotateX();
            if(d.transform == 'rotateY') _rotateY();
          }
          
          function _rotateX(){
            
            $sv.css({'cssText': 'perspective: ' + d.perspective});
            $sm.css({'transform-style': 'preserve-3d'});
            
            $smc.not(':eq(0)').css({
              
              'left': 0,
              'position': 'absolute',
              'top': 0
            });
            
            if(d.direction == 'btt'){
              
              $smc.eq(0).css({
                
                'height': $sm.outerHeight(),
                'width': $sm.outerWidth()
              });
              
              $smc.eq(1).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateX(90deg) translate3d(0, ' + -$sm.outerHeight() + 'px, 0px)',
                'transform-origin': 'top',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(2).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateX(-90deg) translate3d(0, 0, ' + $sm.outerHeight() + 'px)',
                'transform-origin': 'top',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(3).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(180deg) translate3d(0, 0, ' + $sm.outerHeight() + 'px)',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(4).css({
              
                'height': $sm.outerHeight(),
                'transform': 'rotateY(-90deg) translate3d(' + -$sm.outerHeight() + 'px, 0, 0)',
                'transform-origin': 'left',
                'width': $sm.outerHeight()
              });
              
              $smc.eq(5).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(90deg) translate3d(0, 0, ' + $sm.outerWidth() + 'px)',
                'transform-origin': 'left',
                'width': $sm.outerHeight()
              });
                        
              $sm.css(
                
                dr ? {//next
                  
                  'transform': 'rotateX(90deg) translate3d(0, ' + -$sm.outerHeight() / 2 + 'px, ' + $sm.outerHeight() / 2 + 'px)',
                  'transition': 'all ' + d.duration + 'ms ' + d.easing
                  
                } : {//prev
                  
                  'transform': 'rotateX(-90deg) translate3d(0, ' + $sm.outerHeight() / 2 + 'px, ' + $sm.outerHeight() / 2 + 'px)',
                  'transition': 'all ' + d.duration + 'ms ' + d.easing
                }
              );
              
            }else{
              
              $smc.eq(0).css({
                
                'height': $sm.outerHeight(),
                'width': $sm.outerWidth()
              });
              
              $smc.eq(1).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateX(-90deg) translate3d(0, 0, ' + $sm.outerHeight() + 'px)',
                'transform-origin': 'top',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(2).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateX(90deg) translate3d(0, ' + -$sm.outerHeight() + 'px, 0px)',
                'transform-origin': 'top',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(3).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(180deg) translate3d(0, 0, ' + $sm.outerHeight() + 'px)',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(4).css({
              
                'height': $sm.outerHeight(),
                'transform': 'rotateY(-90deg) translate3d(' + -$sm.outerHeight() + 'px, 0, 0)',
                'transform-origin': 'left',
                'width': $sm.outerHeight()
              });
              
              $smc.eq(5).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(90deg) translate3d(0, 0, ' + $sm.outerWidth() + 'px)',
                'transform-origin': 'left',
                'width': $sm.outerHeight()
              });
              
              $sm.css(
                
                dr ? {//next
                  
                  'transform': 'rotateX(-90deg) translate3d(0, ' + $sm.outerHeight() / 2 + 'px, ' + $sm.outerHeight() / 2 + 'px)',
                  'transition': 'all ' + d.duration + 'ms ' + d.easing,
                  
                } : {//prev
                  
                  'transform': 'rotateX(90deg) translate3d(0, ' + -$sm.outerHeight() / 2 + 'px, ' + $sm.outerHeight() / 2 + 'px)',
                  'transition': 'all ' + d.duration + 'ms ' + d.easing,
                }
              );
            }
          };//_rotateX()
          
          function _rotateY(){
            
            $sv.css({'cssText': 'perspective: ' + d.perspective});
            $sm.css({'transform-style': 'preserve-3d'});
            
            $smc.not(':eq(0)').css({
              
              'left': 0,
              'position': 'absolute',
              'top': 0
            });
            
            if(d.direction == 'ltr'){
              
              $smc.eq(0).css({
                
                'height': $sm.outerHeight(),
                'width': $sm.outerWidth()
              });
              
              $smc.eq(1).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(90deg) translate3d(0, 0, ' + $sm.outerWidth() + 'px)',
                'transform-origin': 'left',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(2).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(-90deg) translate3d(' + -$sm.outerWidth() + 'px, 0, 0)',
                'transform-origin': 'left',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(3).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(180deg) translate3d(0, 0, ' + $sm.outerWidth() + 'px)',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(4).css({
                
                'height': $sm.outerWidth(),
                'transform': 'rotateX(90deg) translate3d(0, ' + -$sm.outerWidth() + 'px, 0)',
                'transform-origin': 'top',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(5).css({
                
                'height': $sm.outerWidth(),
                'transform': 'rotateX(-90deg) translate3d(0, 0, ' + $sm.outerHeight() + 'px)',
                'transform-origin': 'top',
                'width': $sm.outerWidth()
              });
              
              $sm.css(dr ? {//next
                
                'transform': 'rotateY(90deg) translate3d(' + $sm.outerWidth() / 2 + 'px, 0, ' + $sm.outerWidth() / 2 + 'px)',
                'transition': 'all ' + d.duration + 'ms ' + d.easing,
                
              } : {//prev
                
                'transform': 'rotateY(-90deg)  translate3d(' + -$sm.outerWidth() / 2 + 'px, 0, ' + $sm.outerWidth() / 2 + 'px)',
                'transition': 'all ' + d.duration + 'ms ' + d.easing,
              });
                                  
            }else{
              
              $smc.eq(0).css({
                
                'height': $sm.outerHeight(),
                'width': $sm.outerWidth()
              });
              
              $smc.eq(1).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(-90deg) translate3d(' + -$sm.outerWidth() + 'px, 0, 0)',
                'transform-origin': 'left',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(2).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(90deg) translate3d(0, 0, ' + $sm.outerWidth() + 'px)',
                'transform-origin': 'left',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(3).css({
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(180deg) translate3d(0, 0, ' + $sm.outerWidth() + 'px)',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(4).css({
                
                'height': $sm.outerWidth(),
                'transform': 'rotateX(90deg) translate3d(0, ' + -$sm.outerWidth() + 'px, 0)',
                'transform-origin': 'top',
                'width': $sm.outerWidth()
              });
              
              $smc.eq(5).css({
                
                'height': $sm.outerWidth(),
                'transform': 'rotateX(-90deg) translate3d(0, 0, ' + $sm.outerHeight() + 'px)',
                'transform-origin': 'top',
                'width': $sm.outerWidth()
              });
              
              $sm.css(dr ? {//next
                
                'height': $sm.outerHeight(),
                'transform': 'rotateY(-90deg)  translate3d(' + -$sm.outerWidth() / 2 + 'px, 0, ' + $sm.outerWidth() / 2 + 'px)',
                'transition': 'all ' + d.duration + 'ms ' + d.easing,
                'width': $sm.outerWidth()
                
              } : {//prev
                
                'transform': 'rotateY(90deg)  translate3d(' + $sm.outerWidth() / 2 + 'px, 0, ' + $sm.outerWidth() / 2 + 'px)',
                'transition': 'all ' + d.duration + 'ms ' + d.easing,
              });
            }
          };//_rotateY()
          
          function _ie(){
            
            $sv.css({'overflow': 'hidden'});
            $sm.css({'transform-style': 'flat'});
            $smc.eq(0).css({'position': 'relative'});
            
            $smc.eq(1).css({
              
              'left': '-100%',
              'position': 'absolute',
              'top': 0
            });
            
            $smc.eq(2).css({
              
              'left': '100%',
              'position': 'absolute',
              'top': 0
            });
            
            $sm.css(dr ? {//next
              
              'height': $sm.outerHeight(),
              'transform': 'translateX(' + -$sm.outerWidth() + 'px)',
              'transition': 'all ' + d.duration + 'ms ' + d.easing,
              'width': $sm.outerWidth()
              
            } : {//prev
              
              'height': $sm.outerHeight(),
              'transform': 'translateX(' + $sm.outerWidth() + 'px)',
              'transition': 'all ' + d.duration + 'ms ' + d.easing,
              'width': $sm.outerWidth()
            });
          };//_ie()
        };//_transformStart()
        
        function _transformEnd($t, d){
          
          var $sv = $t.find(s.sv);
          var $sm = $t.find(s.sm);
          var $smc = $sm.find(s.smc);
          var dr = $t.hasClass(c.snp) ? 0 : 1;
          
          if(d.browser == 2){
            
            _ie();
            
          }else{
            
            _rotate();
          }
          
          function _rotate(){
            
            $sv.css({'perspective': ''});
            $sm.css({'transform-style': ''});
            $smc.not($smc.eq(dr ? 2 : 1)).remove();
            
            $sm.css({
              
              'transform': '',
              'transform-origin': '',
              'transition': ''
            });
            
            $smc.css({
              
              'height': '',
              'left': '',
              'position': '',
              'top': '',
              'transform': '',
              'transform-origin': '',
              'transition': '',
              'width': ''
            });
            
            $t.removeClass([c.t, d.transform, c.snp, c.snn].join(' '));
          };//_rotate()
          
          function _ie(){
            
            $sv.css({'overflow': ''});
            
            $sm.css({
              
              'height': '',
              'transform': '',
              'transform-style': '',
              'transition': '',
              'width': ''
            });
            
            $smc.not($smc.eq(dr ? 2 : 1)).remove();
            
            $smc.css({
              
              'left': '',
              'position': '',
              'top': ''
            });
            
            $t.removeClass([c.t, d.transform, c.snp, c.snn].join(' '));
          };//_ie();
        }//_transformEnd()
        
        function _getImgIndex(dr, d){
          
          return dr ? d.imgIndex + 1 > d.img.length - 1 ? 0 : d.imgIndex + 1 : d.imgIndex - 1 < 0 ? d.img.length - 1 : d.imgIndex - 1;
        };//_getImgIndex()
        
        function _paging(dr, d){
          
          return dr ? ++d.imgIndex > d.img.length -1 ? 0 : d.imgIndex : --d.imgIndex < 0 ? d.img.length - 1 : d.imgIndex;
        };//_paging()
        
        function _setTimeout(s){
          
          var df = new $.Deferred();
          
          setTimeout(function(){
            
            df.resolve();
            
          }, s);
          
          return df.promise();
        };//_setTimeout()
        
        $.fn._tdSlider = function(o){
          
          $.each(this, function(){
            
            new _tdSlider(this, o);
          });
        };//_tdSlider()
        
        var _swipe = (function(){
          
          var s = {};
          var c = {};
          var xs, xc;
          
          $.each(s, function(k, v){
            
            if(v.match(/^\./)) c[k] = v.substr(1);
          });
          
          var d = {
            
            isd: false,
            dr: false,
            du: 200,
            es: 'linear',
            pm: 0,
            sp: {x: 0, y: 0},
            te: (window.navigator.msPointerEnabled) ? 'MSPointerUp' : 'touchend',
            tm: (window.navigator.msPointerEnabled) ? 'MSPointerMove' : 'touchmove',
            ts: (window.navigator.msPointerEnabled) ? 'MSPointerDown' : 'touchstart',
          };
          
          function _init($t, xd, _xs, _xc){
            
            xs = _xs;
            xc = _xc;
            
            var $v = $t.find(xs.sv);
            var $m = $t.find(xs.sm);
            
            $m.on([d.ts, d.tm, d.te].join(' '), function(e){
              
              if($t.hasClass('transform')) return;
              
              //touch start
              if(e.type == d.ts){
                
                d.isd = true;
                d.pm = 0;
                d.sp.x = (e.pageX !== undefined) ? e.pageX : e.originalEvent.touches[0].pageX;
                d.sp.y = (e.pageY !== undefined) ? e.pageY : e.originalEvent.touches[0].pageY;
                
                $t.addClass(xc.sw);
                $v.css({'overflow': 'hidden'});
                $m.css({'position': 'relative'}).append(_getHTML($t, xd));
                
                var $c = $t.find(xs.smc);
                
                $c.eq(0).css({'position': 'static'});
                
                $c.eq(1).css({
                  
                  'left': '-100%',
                  'position': 'absolute',
                  'top': 0,
                  'z-index': 1
                });
                
                $c.eq(2).css({
                  
                  'left': '100%',
                  'position': 'absolute',
                  'top': 0,
                  'z-index': 1
                });
              }//touch start
              
              //touch move
              if(e.type == d.tm){
                
                e.preventDefault();
                
                var x = (e.pageX !== undefined) ? e.pageX : e.originalEvent.touches[0].pageX;
                
                d.pm = (d.sp.x - x) / $t.find(xs.sv).outerWidth() * 100;
                
                if(d.isd){
                  
                  if(d.pm > 35){
                   
                   if(!$t.hasClass(xc.t)){
                    
                    d.isd = false;
                    xd.imgIndex = _paging(1, xd);
                    
                     _next($t, d);
                   }
                    
                  }else if(d.pm < -35){
                    
                    if(!$t.hasClass(xc.t)){
                      
                      d.isd = false;
                      xd.imgIndex = _paging(0, xd)
                      
                      _prev($t, d);
                    }
                    
                  }else{
                    
                    if(!$t.hasClass(xc.t)) _manual($t, d);
                  }
                }
              }//touch move
              
              //touch end
              if(e.type == d.te){
                
                d.isd = false;
                
                if(!$t.hasClass(xc.t)) _reset($t, d);
              }//touch end
            });
          };//_init();
          
          function _manual($t, d){ 
            
            $t.find(xs.sm).css({'transform': 'translateX(' + -d.pm + '%' + ')'});
          };//_manual()
          
          function _reset($t, c){
            
            var $v = $t.find(xs.sv);
            var $m = $t.find(xs.sm);
            
            $m.css({
              
              'transform': 'translateX(0)',
              'transition': 'transform ' + d.du + 'ms ' + d.es
            });
            
            _setTimeout(d.du).then(function(){
              
              var $c = $t.find(xs.smc);
              
              $m.css({
                
                'position': '',
                'transform': '',
                'transition': '',
                'width': '',
              });
              
              $c.css({
                
                'left': '',
                'position': '',
                'top': '',
                'transform': '',
                'transition': '',
                'width': '',
                'z-index': ''
                
              }).not(':eq(0)').remove();
              
              $v.css({'overflow': ''});
              $t.removeClass([xc.t, xc.sw].join(' '));
            });
          };//_reset()
          
          function _prev($t, d){
            
            var $v = $t.find(xs.sv);
            var $m = $t.find(xs.sm);
            
            $t.addClass(xc.t);
            
            $m.css({
              
              'transform': 'translateX(100%)',
              'transition': 'transform ' + d.du + 'ms ' + d.es
            });
            
            _setTimeout(d.du).then(function(){
              
              var $c = $t.find(xs.smc);
              
              $m.css({
                
                'position': '',
                'transform': '',
                'transition': '',
                'width': '',
              });
              
              $c.css({
                
                'left': '',
                'position': '',
                'top': '',
                'transform': '',
                'transition': '',
                'width': '',
                'z-index': ''
                
              }).not(':eq(1)').remove();
              
              $v.css({'overflow': ''});
              $t.removeClass([xc.t, xc.sw].join(' '));
            });
          };//_prev()
          
          function _next($t, d){
            
            var $v = $t.find(xs.sv);
            var $m = $t.find(xs.sm);
            
            $t.addClass(xc.t);
            
            $m.css({
              
              'transform': 'translateX(-100%)',
              'transition': 'transform ' + d.du + 'ms ' + d.es
            });
            
            _setTimeout(d.du).then(function(){
              
              var $c = $t.find(xs.smc);
              
              $m.css({
                
                'position': '',
                'transform': '',
                'transition': '',
                'width': '',
              });
              
              $c.css({
                
                'left': '',
                'position': '',
                'top': '',
                'transform': '',
                'transition': '',
                'width': '',
                'z-index': ''
                
              }).not(':eq(2)').remove();
              
              $v.css({'overflow': ''});
              $t.removeClass([xc.t, xc.sw].join(' '));
            });
          };//_next()
          
          function _getHTML($t, d){
            
            var $m = $t.find(xs.sm);
            var html = '';
            
            html += '<div class="' + xc.smc + '">' + d.img[_getImgIndex(0, d)].outerHTML + '</div>';
            html += '<div class="' + xc.smc + '">' + d.img[_getImgIndex(1, d)].outerHTML + '</div>';
            
            return html;
          };//_getHTML()
                
          return {init: _init};
        }());//_swipe()
      }());//_addSlider()
    }(jQuery));
     
    $(function(){
      
      $('#demo-2 #slider-1')._tdSlider({
        
        autoPlay: true,
        interval: 5000,
        duration: 1000,
        easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
        next: '<img src="http://web-pixy.com/images/site/icon-arrow-right-1.svg" alt="next">',
        pauseOnHover: true,
        perspective: '2000px',
        prev: '<img src="http://web-pixy.com/images/site/icon-arrow-left-1.svg" alt="previous">',
        transform: 'rotateX',
      });
    });