jQuery(function ($) {
  /**
   * トップページ mv
   */
  if ($(".js-mv__swiper").length) {
    const swiper = new Swiper(".js-mv__swiper", {
      loop: true,
      effect: "fade",
      speed: 3000,
      autoplay: {
        delay: 5000,
      },
    });
  }

  /**
   * ハンバーガーメニュー クリック時
   */
  $(".js-hamburger").click(function () {
    $("body").toggleClass("fixed");

    if ($(this).attr("aria-expanded") == "false") {
      $(this).attr("aria-expanded", true);
      $(".js-drawer").attr("aria-hidden", false);
      $(".js-drawer").attr("data-click", true);
      $(".js-header").removeClass("is-black");
    } else {
      $(this).attr("aria-expanded", false);
      $(".js-drawer").attr("aria-hidden", true);
      $(".js-drawer").attr("data-click", false);
      headerAnime();
    }
  });

  /**
   * ドロワーメニュークリック時
   */
  $(".js-drawer").click(function () {
    $("body").toggleClass("fixed");

    // opne時
    if ($(".js-hamburger").attr("aria-expanded") == "false") {
      $(".js-hamburger").attr("aria-expanded", true);
      $(".js-drawer").attr("aria-hidden", false);
      $(".js-drawer").attr("data-click", true);
    } else {
      $(".js-hamburger").attr("aria-expanded", false);
      $(".js-drawer").attr("aria-hidden", true);
      $(".js-drawer").attr("data-click", false);
    }
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

  $(document).on("click", 'a[href*="#"]', function () {
    let time = 400;
    let header = $("header").innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $("html,body").animate({ scrollTop: targetY }, time, "swing");
    return false;
  });

  //スクロール途中からヘッダーを出現
  function headerAnime() {
    var elemTop = $("#header-scroll").offset().top;
    var scroll = $(window).scrollTop();
    if (scroll <= 30) {
      $(".js-header").removeClass("is-black");
      $(".js-header").removeClass("UpMove");
    } else if (scroll >= elemTop) {
      $(".js-header").removeClass("UpMove");
      $(".js-header").addClass("DownMove");
      $(".js-header").addClass("is-black");
    } else {
      if ($(".js-header").hasClass("DownMove")) {
        $(".js-header").removeClass("DownMove");
        $(".js-header").addClass("UpMove");
      }
    }
  }

  /**
   * プログレスバー
   */

  //テキストのカウントアップ+バーの設定
  var bar = new ProgressBar.Line(splash__text, {
    //id名を指定
    easing: "easeInOut", //アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
    duration: 1000, //時間指定(1000＝1秒)
    strokeWidth: 0.2, //進捗ゲージの太さ
    color: "#fff", //進捗ゲージのカラー
    trailWidth: 0.2, //ゲージベースの線の太さ
    trailColor: "#bbb", //ゲージベースの線のカラー
    text: {
      //テキストの形状を直接指定
      style: {
        //天地中央に配置
        position: "absolute",
        left: "50%",
        top: "50%",
        padding: "0",
        margin: "-30px 0 0 0", //バーより上に配置
        transform: "translate(-50%,-50%)",
        "font-size": "1rem",
        color: "#fff",
      },
      autoStyleContainer: false, //自動付与のスタイルを切る
    },
    step: function (state, bar) {
      bar.setText(Math.round(bar.value() * 100) + " %"); //テキストの数値
    },
  });

  //アニメーションスタート
  bar.animate(1.0, function () {
    //バーを描画する割合を指定します 1.0 なら100%まで描画します
    $("#splash").delay(500).fadeOut(800); //アニメーションが終わったら#splashエリアをフェードアウト
  });

  $(window).scroll(function () {
    headerAnime();
  });

  $(window).on("load", function () {
    headerAnime();
  });

  AOS.init({
    offset: 100,
    delay: 200,
    duration: 500,
    anchorPlacement: "bottom-top",
    once: false,
  });
});
