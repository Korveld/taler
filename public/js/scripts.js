$(window).scroll(function() {

  const mq = window.matchMedia( "(min-width: 767.98px)" );
  const mqMob = window.matchMedia( "(max-width: 768px)" );

  if (mq.matches) {
    var elementTarget = $('.js-sticky')[0];
    if (elementTarget.getBoundingClientRect().y < 0) {
      $('.header').addClass('is-fixed');
    } else {
      $('.header').removeClass('is-fixed');
    }
  }

  if (mqMob.matches) {
    var elementTarget = $('.js-sticky')[0];
    if (elementTarget.getBoundingClientRect().y < 0) {
      $('.header__mob').addClass('is-fixed');
    } else {
      $('.header__mob').removeClass('is-fixed');
    }
  }
  
});

jQuery(function ($) {
  var count = 10;
  $('.js-countdown').text(count);

  var countdownInterval = setInterval(function() {
    count--;
    $('.js-countdown').text(count);

    if (count <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
});

jQuery(function ($) {
})

jQuery(function ($) {
  
  if ($('.search-bar__input').length && $('.search-bar__input').val()) {
    $(this).find('.search-bar__delete').addClass('is-active');
  }
  
  $('.search-bar__input').on('keyup', function (e) {
    var val = e.target.value;
    if (val) {
      $(this).parents('.search-bar__field').find('.search-bar__delete').addClass('is-active');
      return;
    }
    $(this).parents('.search-bar__field').find('.search-bar__delete').removeClass('is-active');
  });
  
  $('.search-bar__delete').on('click', function (e) {
    e.preventDefault();
    
    var that = $(this);
    
    $(this).parents('.search-bar__field').find('.search-bar__input').val('');
    setTimeout(function () {
      that.removeClass('is-active');
    }, 300);
  })

  /*if ($('.js-button-anim').length) {
    $('.js-button-anim').each(function () {
      let layout = new rive.Layout({
        fit: rive.Fit.Cover,
      });
      const r = new rive.Rive({
        src: "./public/riv_animations/button_upd.riv",
        // OR the path to a discoverable and public Rive asset
        // src: '/public/example.riv',
        canvas: $(this)[0],
        layout: layout,
        autoplay: true,
        /!*onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
        },*!/
      });
    });
  }*/
  
});

jQuery(function ($) {
  
  $('.table__load-more a').on('click', function (e) {
    e.preventDefault();
    
    var tableRows = $(this).parents('.table').find('.table__body .table__tr');
    var hiddenRows = [];
    
    var addRowsHandler = function (row) {
      row.each(function (index, el) {
        if ($(el).is(':hidden')) {
          hiddenRows.push(index);
        }
      });
    };
    
    addRowsHandler(tableRows);
    
    var slicedArray = hiddenRows.slice(0, 10);
    slicedArray.forEach(function (index) {
      $(tableRows[index]).show();
    });
    hiddenRows = [];
    addRowsHandler(tableRows);
    if (!hiddenRows.length) {
      $(this).parent().hide();
    }
  });
  
  $('.table__load-more').each(function () {
    var rowsLength = $(this).siblings('.table__body').find('.table__tr').length;
    if (rowsLength <= 1) {
      $(this).remove();
    }
  });
});

(function($) {

  var uiTooltipTmp = {
    options: {
      hoverTimeout: 200,
      tooltipHover: false // to have a regular behaviour by default. Use true to keep the tooltip while hovering it
    },
    // This function will check every "hoverTimeout" if the original object or it's tooltip is hovered. If not, it will continue the standard tooltip closure procedure.
    timeoutHover: function (event,target,tooltipData,obj){
      var TO;
      var hov=false, hov2=false;
      if(target !== undefined) {
        if(target.is(":hover")){
          hov=true;}
      }
      if(tooltipData !== undefined) {
        if($(tooltipData.tooltip).is(":hover")){
          hov=true;}
      }
      if(target !== undefined || tooltipData !== undefined) {hov2=true;}
      if(hov) {
        TO = setTimeout(obj.timeoutHover,obj.options.hoverTimeout,event,target,tooltipData,obj);
      }else{
        target.data('hoverFinished',1);
        clearTimeout(TO);
        if(hov2){
          obj.closing = false;
          obj.close(event,true);}
      }
    },
    // Changed standard procedure
    close: function(event) {
      var tooltip,
        that = this,
        target = $( event ? event.currentTarget : this.element ),
        tooltipData = this._find( target );
      if(that.options.tooltipHover && (target.data('hoverFinished')===undefined || target.data('hoverFinished') === 0)){
        target.data('hoverFinished',0);
        setTimeout(that.timeoutHover, that.options.hoverTimeout,event, target, tooltipData, that);
      }
      else
      {
        if(that.options.tooltipHover){
          target.data('hoverFinished',0);}

        // The rest part of standard code is unchanged

        if ( !tooltipData ) {
          target.removeData( "ui-tooltip-open" );
          return;
        }

        tooltip = tooltipData.tooltip;
        if ( tooltipData.closing ) {
          return;
        }

        clearInterval( this.delayedShow );

        if ( target.data( "ui-tooltip-title" ) && !target.attr( "title" ) ) {
          target.attr( "title", target.data( "ui-tooltip-title" ) );
        }

        this._removeDescribedBy( target );

        tooltipData.hiding = true;
        tooltip.stop( true );
        this._hide( tooltip, this.options.hide, function() {
          that._removeTooltip( $( this ) );
        } );

        target.removeData( "ui-tooltip-open" );
        this._off( target, "mouseleave focusout keyup" );

        if ( target[ 0 ] !== this.element[ 0 ] ) {
          this._off( target, "remove" );
        }
        this._off( this.document, "mousemove" );

        if ( event && event.type === "mouseleave" ) {
          $.each( this.parents, function( id, parent ) {
            $( parent.element ).attr( "title", parent.title );
            delete that.parents[ id ];
          } );
        }

        tooltipData.closing = true;
        this._trigger( "close", event, { tooltip: tooltip } );
        if ( !tooltipData.hiding ) {
          tooltipData.closing = false;
        }
      }
    }
  };

  // Extending ui.tooltip. Changing "close" function and adding two new parameters.
  $.widget( "ui.tooltip", $.ui.tooltip, uiTooltipTmp);

})(jQuery);

$(function() {
  $(document).tooltip({
    content: function () {
      return $(this).prop('title')
    },
    hoverTimeout: 250,
    tooltipHover: true,
    position: {
      my: "center bottom-15",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });
  
  // Debug tooltip
  /*$('.table__icon').on('click', function (e) {
    e.preventDefault();
    $('.js-tooltip').tooltip({
      position: {
        my: "center top-30",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      }
    }).tooltip( "open" );
  })*/
});
