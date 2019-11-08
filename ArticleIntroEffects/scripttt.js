$(document).ready(function() {
  var imgWidth = $(".slideshow__image").width(),
    $slider = $(".slideshow__container"),
    $nextButton = $(".slideshow__next"),
    $prevButton = $(".slideshow__prev"),
    closeBlock = $(".slideshow__block"),
    slideInBlock = (".slideshow__slidein"),
    slideNext = $('.slideshow__forward').find('.slideshow__slidein'),
    slideBack = $('.slideshow__back').find('.slideshow__slidein'),
    clickCount = 0,
    clickCountImg = 1;

  $nextButton.click(function() {
    var circle = $(this).find('.circle'),
      line = $(this).find('.line'),
      block = $(this).parent().find('.slideshow__block'),
      slideIn = $(this).parent().find('.slideshow__slidein'),
      tl = new TimelineMax({
        onComplete: tlComplete
      }),
      tl2 = new TimelineMax();

    tl.set(circle, {
        x: 15,
        y: 15,
        scale: 0
      })
      .set(slideIn, {
        right: -350,
        opacity: 1
      }, 0)
      .set(block, {
        right: 270,
        opacity: 0
      }, 0)
      .set($nextButton, {
        zIndex: 1
      }, 0)
      .to(circle, 0.5, {
        scale: 1,
        transformOrigin: "50%, 50%",
        opacity: 1
      }, 0)
      .to(circle, 0.3, {
        opacity: 0
      })
      .to(line, 0.3, {
        scale: 0,
        transformOrigin: "50%, 50%"
      }, 0)
      .set(circle, {
        scale: 0,
        opacity: 0
      });

    function tlComplete() {
      tl2.to(slideIn, 0.5, {
          right: 0
        })
        .to(block, 0.5, {
          right: 350,
          opacity: 1
        }, 0)
    };

    function getLineback() {
      TweenMax.to(line, 0.3, {
        scale: 1,
        opacity: 1,
        delay: 0.5
      });
    };

    closeBlock.click(function() {
      tl2.reverse();
    });

    closeBlock.click(getLineback);

    $prevButton.click(function() {
      tl2.reverse();
    });

    $prevButton.click(getLineback);

  });

  $prevButton.click(function() {
    var circle = $(this).find('.circle'),
      line = $(this).find('.line'),
      block = $(this).parent().find('.slideshow__block'),
      slideIn = $(this).parent().find('.slideshow__slidein'),
      tl = new TimelineMax({
        onComplete: tlComplete
      }),
      tl2 = new TimelineMax();

    tl.set(circle, {
        x: 15,
        y: 15,
        scale: 0
      })
      .set(slideIn, {
        left: -350,
        opacity: 1
      }, 0)
      .set(block, {
        left: 270,
        opacity: 0
      }, 0)
      .set($prevButton, {
        zIndex: 1
      }, 0)
      .to(circle, 0.5, {
        scale: 1,
        transformOrigin: "50%, 50%",
        opacity: 1
      }, 0)
      .to(circle, 0.3, {
        opacity: 0
      })
      .to(line, 0.3, {
        scale: 0,
        transformOrigin: "50%, 50%"
      }, 0)
      .set(circle, {
        scale: 0,
        opacity: 0
      });

    function tlComplete() {
      tl2.to(slideIn, 0.3, {
          left: 0
        })
        .to(block, 0.3, {
          left: 350,
          opacity: 1
        }, 0);
    };

    function getLineback() {
      TweenMax.to(line, 0.3, {
        scale: 1,
        opacity: 1,
        delay: 0.5
      });
    };

    closeBlock.click(function() {
      tl2.reverse();
    })

    closeBlock.click(getLineback);

    $nextButton.click(function() {
      tl2.reverse();
    });

    $nextButton.click(getLineback);

  });

  slideNext.click(function() {
    clickCount++;
    clickCountImg++;

    var clickCountImgPrev = clickCountImg - 2;
    var firstImage = $('.slideshow__container li img:eq(0)'),
      imagePrev = $('.slideshow__container li img:eq(' + clickCountImgPrev + ')'),
      image = $('.slideshow__container li img:eq(' + clickCountImg + ')');

    if (clickCount > 3) {
      clickCount = 0;
    }
    if (clickCountImg > 3) {
      clickCountImg = 0;
      firstImage.clone().appendTo(slideNext);
    }

    TweenMax.to($slider, 0.5, {
      x: -clickCount * imgWidth
    })

    slideNext.children("img").remove();
    slideBack.children("img").remove();
    image.clone().appendTo(slideNext);
    imagePrev.clone().appendTo(slideBack);
    console.log(image);

    if (clickCountImg == 0) {
      firstImage.clone().appendTo(slideNext);
    }

  });

  slideBack.click(function() {
    clickCount--;
    clickCountImg--;

    var clickCountImgPrev = clickCountImg - 2,
      firstImage = $('.slideshow__container li img:eq(0)'),
      imagePrev = $('.slideshow__container li img:eq(' + clickCountImgPrev + ')'),
      image = $('.slideshow__container li img:eq(' + clickCountImg + ')');

    if (clickCount < 0) {
      clickCount = 3;
    }

    if (clickCountImg < 0) {
      clickCountImg = 3;
    }

    TweenMax.to($slider, 0.5, {
      x: -clickCount * imgWidth
    });

    slideNext.children("img").remove();
    slideBack.children("img").remove();

    imagePrev.clone().appendTo(slideBack);
    image.clone().appendTo(slideNext);

  });
});