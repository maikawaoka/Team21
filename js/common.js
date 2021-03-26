$(function() {
  setTimeout(() => {
    const spinner = document.getElementById('loading');
    // Add .loaded to .loading
    spinner.classList.add('loaded');
  }, 1000);

  resizeAddClass();

  /******************************************************************************
    絞り込み
  *******************************************************************************/
  var rule = {
    birthplace: [],
    bunri: "",
    programing: ""
  };

  $('.tags > button').on('click', function() {
    if(!$(this).hasClass('border-primary') && $(this).parent().attr('id') !== 'birthplace') {
      tagReset($(this).parent().attr('id'));
    }
    $(this).toggleClass('border-primary');
    $(this).hasClass('border-primary') ? tagSelect($(this)) : tagUnSelect($(this));
  });

  function tagReset(id) {
    $(`#${id} > button`).removeClass('border-primary');
  }

  function tagSelect(element) {
    switch(element.parent().attr('id')) {
      case 'birthplace':
        rule.birthplace.push(element.attr('id'));
        break;
      case 'bunri':
        rule.bunri = element.attr('id');
        break;
      case 'programing':
        rule.programing = element.attr('id');
        break;
    }
  }

  function tagUnSelect(element) {
    switch(element.parent().attr('id')) {
      case 'birthplace':
        rule.birthplace = rule.birthplace.filter(id => id != element.attr('id'));
        break;
      case 'bunri':
        rule.bunri = "";
        break;
      case 'programing':
        rule.programing = "";
        break;
    }
  }

  $('.clear').on('click', function() {
    $('.tags > button').removeClass('border-primary');
    rule = {
      birthplace: [],
      bunri: "",
      programing: ""
    };
  });

  $('.sort').on('click', function() {
    // 該当メンバー表示
    $('.filter-result > div').each(function(index, el){
      $(el).removeClass('d-none');
      const filterRule = [];
      Object.keys(rule).forEach(key => {
        if(rule[key] != 0) {
          if(key === 'birthplace') {
            filterRule.push(rule.birthplace.some(value => $(el).hasClass(value)));
          } else {
            filterRule.push($(el).hasClass(rule[key]));
          }
        }
      });
      if(filterRule.every(val => val)) {
        $(el).addClass('d-flex-center');
      } else {
        $(el).addClass('d-none');
      }
    });
  });

  /******************************************************************************
    slider
  *******************************************************************************/
  var memberSlider = $(".member.center").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });

  $('#nav-member-tab').click(function () {
    memberSlider.css('opacity',0);
    memberSlider.animate({'z-index':1},300,function(){
      memberSlider.slick('setPosition');
      memberSlider.animate({'opacity':1});
    });
  });

  var teamSlider = $(".team.center").slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $('#nav-team-tab').click(function () {
    teamSlider.css('opacity',0);
    teamSlider.animate({'z-index':1},300,function(){
      teamSlider.slick('setPosition');
      teamSlider.animate({'opacity':1});
    });
  });

  /******************************************************************************
    tab
  *******************************************************************************/
  $('#detail-tabs > li').on('click', function() {
    // 選択されたタブのハッシュ
    var hash = location.hash.slice(1);
    // タブのリスト
    var tabNames = ['member', 'team', 'data'];
    // 選択されなかったタブのリスト
    var notSelectedTabNames = tabNames.filter(tab => tab !== hash);
    // 選択されなかったタブのactiveクラスとshowクラスを取り除く
    notSelectedTabNames.forEach(tab => {
      $(`#nav-${tab}-tab`).removeClass('active');
      $(`#nav-${tab}`).removeClass('show active');
    });
    // 選択されたタブにactiveクラスとshowクラスを付与する
    $(`#nav-${hash}-tab`).addClass('active');
    $(`#nav-${hash}`).addClass('show active');
  });

  $("#entry").click(function() {
    window.location.href = 'https://www.seattleconsulting.co.jp/freshers/contact_input.php';
  });

  /******************************************************************************
    scroll
  *******************************************************************************/
  $(window).on('scroll', function() {
    //スクロール位置を取得
    if ( $(this).scrollTop() < 50 ) {
      $('.arrow-up').removeClass('active');
    } else {
      $('.arrow-up').addClass('active');
    }
  });
});

$(window).resize(function(){
  resizeAddClass();
});

function resizeAddClass() {
  //windowの幅をxに代入
  var x = $(window).width();
  //windowの分岐幅をyに代入
  var y = 768;
  if (x <= y) {
    $('#member-list').addClass('row-cols-3 w-95').removeClass('row-cols-4 w-75');
    $('#member-list > .member').css('height', '40vw');
    $('#team-detail').addClass('w-95').removeClass('w-60');
    $('.slider').css('width', '80%');
    $('#birthplace').addClass('row-cols-4').removeClass('row-cols-8');
  } else {
    $('#member-list').addClass('row-cols-4 w-75').removeClass('row-cols-3 w-95');
    $('#member-list > .member').css('height', '25vw');
    $('#team-detail').addClass('w-60').removeClass('w-95');
    $('.slider').css('width', '60%');
    $('#birthplace').addClass('row-cols-8').removeClass('row-cols-4');
  }
}